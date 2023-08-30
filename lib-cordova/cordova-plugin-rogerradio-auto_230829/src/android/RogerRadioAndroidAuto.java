package com.theholyroger.RogerRadioAndroidAuto;

import static android.os.Build.VERSION.SDK_INT;
import static android.os.Build.VERSION_CODES.O;

import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.AudioAttributes;
import android.media.AudioFocusRequest;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.support.v4.media.MediaBrowserCompat;
import android.support.v4.media.MediaDescriptionCompat;
import android.support.v4.media.MediaMetadataCompat;
import android.support.v4.media.session.MediaSessionCompat;
import android.support.v4.media.session.PlaybackStateCompat;
import android.util.Base64;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.media.MediaBrowserServiceCompat;

import com.theholyroger.RogerRadioConfig.RogerRadioConfig;
import com.theholyroger.WSClient.WSClient;
import com.theholyroger.WSProcessor.WSProcessor;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


public class RogerRadioAndroidAuto
        extends MediaBrowserServiceCompat
{
    public static final String CONTENT_STYLE_SUPPORTED = "android.media.browse.CONTENT_STYLE_SUPPORTED";
    public static final String CONTENT_STYLE_PLAYABLE_HINT = "android.media.browse.CONTENT_STYLE_PLAYABLE_HINT";
    public static final String CONTENT_STYLE_BROWSABLE_HINT = "android.media.browse.CONTENT_STYLE_BROWSABLE_HINT";
    public static final int CONTENT_STYLE_LIST_ITEM_HINT_VALUE = 1;
    public static final int CONTENT_STYLE_GRID_ITEM_HINT_VALUE = 2;

    private static final int PLAY = 1;
    private static final int PAUSE = 2;
    private static final int BUFFERING = 3;
    private static final int CONNECTING = 4;
    private static final int STOPPED = 5;

    private static final float VOLUME_DUCK = (float) 0.3;
    private static final float VOLUME_NORMAL = (float) 1.0;
    private static final String APP_BROWSER_ROOT_ID = "rogerRadioAARoot";
    private final int maxReconnects = 10;

    private final RogerRadioConfig radioConfig = new RogerRadioConfig();
    private int reconnectTries = 0;
    private String urlStatWs;
    private int currentPlaybackState;
    private AudioManager mAudioManager;
    private MediaSessionCompat mSession;
    private RogerRadioAndroidAuto.AudioFocusHelper mAudioFocusHelper;
    private AudioFocusRequest audioFocusRequest;
    private AudioAttributes playbackAttributes;
    private Handler handler;
    private Resources resources;
    private MediaPlayer mediaPlayer;
    private String lastWsDataNowplayingArtist;
    private String lastWsDataNowplayingTitle;
    private List<MediaBrowserCompat.MediaItem> loadedMediaItems = new ArrayList<>();
    private WSClient webSocketClient;

    public void setMediaItems(JSONArray mediaItems) {
        loadedMediaItems = new ArrayList<>();

        for (int i = 0; i < mediaItems.length(); i++) {
            MediaBrowserCompat.MediaItem mItem = createPlayableMediaItem(
                    mediaItems.optJSONObject(i).optString("id"),
                    mediaItems.optJSONObject(i).optString("title"),
                    Uri.parse(mediaItems.optJSONObject(i).optString("artworkUrl"))
            );
            loadedMediaItems.add(mItem);
        }
        notifyChildrenChanged(APP_BROWSER_ROOT_ID);
    }

    @Override
    public void onCreate() {
        super.onCreate();

        resources = this.getResources();

        mAudioManager = (AudioManager) this.getSystemService(Context.AUDIO_SERVICE);
        mAudioFocusHelper = new RogerRadioAndroidAuto.AudioFocusHelper();

        mSession = new MediaSessionCompat(this, "RogerRadioAA");
        setSessionToken(mSession.getSessionToken());
        mSession.setCallback(new MediaSessionCallback());
        mSession.setFlags(MediaSessionCompat.FLAG_HANDLES_MEDIA_BUTTONS |
                          MediaSessionCompat.FLAG_HANDLES_TRANSPORT_CONTROLS);
        mSession.setActive(true);

        handler = new Handler();
        createWebSocketClient();
    }

    @Override
    public void onDestroy() {
        mSession.release();
        stopWithService();
        super.onDestroy();
    }

    @Nullable
    @Override
    public BrowserRoot onGetRoot(
            @NonNull String clientPackageName,
            int clientUid,
            Bundle rootHints
    ) {
        return new BrowserRoot(APP_BROWSER_ROOT_ID, null);
    }

    @Override
    public void onLoadChildren(
            @NonNull final String parentMediaId,
            @NonNull final Result<List<MediaBrowserCompat.MediaItem>> result
    ) {

        Log.d("RogerRadioAA", "Loading children for " + parentMediaId);

        radioConfig.clearCachedStreamUrl();

        List<MediaBrowserCompat.MediaItem> resultMediaItems = new ArrayList<>();

        for (int i = 0; i < loadedMediaItems.size(); i++) {
            resultMediaItems.add(loadedMediaItems.get(i));
        }

        if (resultMediaItems.size() <= 0) {
            // Check if this is the root menu:
            if (APP_BROWSER_ROOT_ID.equals(parentMediaId)) {
                resultMediaItems.add(createBrowsableMediaItem("browse", "Roger Radio", null, false));
            } else {
                resultMediaItems.add(createBrowsableMediaItem("listen", "Listen Live", null, true));
            }
        }

        result.sendResult(resultMediaItems);
    }

    private MediaBrowserCompat.MediaItem createBrowsableMediaItem(
            String mediaId,
            String folderName,
            Uri iconUri,
            boolean asPlayable
    ) {
        MediaDescriptionCompat.Builder mediaDescriptionBuilder = new MediaDescriptionCompat.Builder();
        mediaDescriptionBuilder.setMediaId(mediaId);
        mediaDescriptionBuilder.setTitle(folderName);
        if (iconUri == null) {
            int drawableResourceId = this.getResources().getIdentifier(
                    "main_logo_transparent",
                    "drawable",
                    this.getPackageName());
            Uri lcoalIconUri = new Uri.Builder()
                    .scheme(ContentResolver.SCHEME_ANDROID_RESOURCE)
                    .authority(resources.getResourcePackageName(drawableResourceId))
                    .appendPath(resources.getResourceTypeName(drawableResourceId))
                    .appendPath(resources.getResourceEntryName(drawableResourceId))
                    .build();
            mediaDescriptionBuilder.setIconUri(lcoalIconUri);
        } else {
            mediaDescriptionBuilder.setIconUri(iconUri);
        }
        Bundle extras = new Bundle();
        extras.putInt(CONTENT_STYLE_BROWSABLE_HINT, CONTENT_STYLE_LIST_ITEM_HINT_VALUE);
        extras.putInt(CONTENT_STYLE_PLAYABLE_HINT, CONTENT_STYLE_GRID_ITEM_HINT_VALUE);
        mediaDescriptionBuilder.setExtras(extras);
        int mediaFlag;
        if (asPlayable) {
            mediaFlag = MediaBrowserCompat.MediaItem.FLAG_PLAYABLE;
        } else {
            mediaFlag = MediaBrowserCompat.MediaItem.FLAG_BROWSABLE;
        }
        return new MediaBrowserCompat.MediaItem(mediaDescriptionBuilder.build(), mediaFlag);
    }

    private MediaBrowserCompat.MediaItem createPlayableMediaItem(
            String mediaId,
            String folderName,
            Uri iconUri
    ) {
        MediaDescriptionCompat.Builder mediaDescriptionBuilder = new MediaDescriptionCompat.Builder();
        mediaDescriptionBuilder.setMediaId(mediaId);
        mediaDescriptionBuilder.setTitle(folderName);
        mediaDescriptionBuilder.setIconUri(iconUri);
        Bundle extras = new Bundle();
        extras.putInt(CONTENT_STYLE_BROWSABLE_HINT, CONTENT_STYLE_LIST_ITEM_HINT_VALUE);
        extras.putInt(CONTENT_STYLE_PLAYABLE_HINT, CONTENT_STYLE_GRID_ITEM_HINT_VALUE);
        mediaDescriptionBuilder.setExtras(extras);
        return new MediaBrowserCompat.MediaItem(mediaDescriptionBuilder.build(), MediaBrowserCompat.MediaItem.FLAG_PLAYABLE);
    }

    private void setMediaPlaybackState(int state) {
        PlaybackStateCompat playbackState = null;
        switch (state) {
            case PLAY:
                reconnectTries = 0;
                playbackState = new PlaybackStateCompat.Builder()
                        .setActions(PlaybackStateCompat.ACTION_STOP)
                        .setState(PlaybackStateCompat.STATE_PLAYING, 0, 1)
                        .build();
                break;

            case PAUSE:
                playbackState = new PlaybackStateCompat.Builder()
                        .setActions(PlaybackStateCompat.ACTION_PLAY_PAUSE)
                        .setState(PlaybackStateCompat.STATE_PAUSED, 0, 1)
                        .build();
                break;

            case BUFFERING:
                playbackState = new PlaybackStateCompat.Builder()
                        .setActions(PlaybackStateCompat.ACTION_STOP)
                        .setState(PlaybackStateCompat.STATE_BUFFERING, 0, 1)
                        .build();
                break;

            case CONNECTING:
                playbackState = new PlaybackStateCompat.Builder()
                        .setActions(PlaybackStateCompat.ACTION_STOP)
                        .setState(PlaybackStateCompat.STATE_CONNECTING, 0, 1)
                        .build();
                break;

            case STOPPED:
                playbackState = new PlaybackStateCompat.Builder()
                        .setActions(PlaybackStateCompat.ACTION_PLAY | PlaybackStateCompat.ACTION_PLAY_FROM_MEDIA_ID |
                                    PlaybackStateCompat.ACTION_PLAY_FROM_SEARCH)
                        .setState(PlaybackStateCompat.STATE_STOPPED, 0, 1)
                        .build();
                break;
        }
        mSession.setPlaybackState(playbackState);
        currentPlaybackState = state;
    }

    private void playMedia() {
        Log.d("RogerRadioAA", "Starting stream playback.");
        setMediaPlaybackState(BUFFERING);
        mSession.setMetadata(new MediaMetadataCompat.Builder()
                                     .putText(MediaMetadataCompat.METADATA_KEY_TITLE, "Roger Radio")
                                     .putText(MediaMetadataCompat.METADATA_KEY_ARTIST, "Roger Radio")
                                     .putText(MediaMetadataCompat.METADATA_KEY_GENRE, "Radio")
                                     .build()
        );
        if (mediaPlayer != null) {
            try {
                mediaPlayer.reset();
            } catch (Exception e) {
                mediaPlayer = new MediaPlayer();
            }
        } else {mediaPlayer = new MediaPlayer();}
        try {
            try {
                playbackAttributes = buildAudioAttributes();
                mediaPlayer.setAudioAttributes(playbackAttributes);
            } catch (Exception e) {
                Log.w("RogerRadioAA", "Falling back to legacy audio stream type");
                mediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
            }
            mediaPlayer.setDataSource(radioConfig.getUrlStream(this));
            mediaPlayer.prepareAsync();
        } catch (Exception e) {
            Log.e("RogerRadioAA", "Error during playback.");
            e.printStackTrace();
        }
        mediaPlayer.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
            @Override
            public void onPrepared(MediaPlayer mediaPlayer) {
                Log.d("RogerRadioAA", "Media loaded.");
                mediaPlayer.start();
                setMediaPlaybackState(PLAY);
                connectWebSocketClient();
            }
        });

        mediaPlayer.setOnInfoListener(new MediaPlayer.OnInfoListener() {
            @Override
            public boolean onInfo(
                    MediaPlayer mediaPlayer,
                    int state,
                    int extra
            ) {
                switch (state) {
                    case MediaPlayer.MEDIA_INFO_BUFFERING_START: {
                        Log.d("RogerRadioAA", "Buffering...");
                        setMediaPlaybackState(BUFFERING);
                        break;
                    }

                    case MediaPlayer.MEDIA_INFO_BUFFERING_END: {
                        Log.d("RogerRadioAA", "Finished buffering.");
                        setMediaPlaybackState(PLAY);
                    }
                }
                return true;
            }
        });

        mediaPlayer.setOnErrorListener(new MediaPlayer.OnErrorListener() {
            @Override
            public boolean onError(
                    MediaPlayer mediaPlayer,
                    int state,
                    int extra
            ) {
                Log.e("RogerRadioAA", "Playback error. State=" + state + ", extra=" + extra);
                final Runnable onErrorRunnable = new Runnable() {
                    public void run() { reloadPlayerOnError(); }
                };
                handler.postDelayed(onErrorRunnable, 100);
                return false;
            }
        });
    }

    private void playWithService() {
        playMedia();
    }

    private void reloadPlayerOnError() {
        playerStop();

        if (reconnectTries >= maxReconnects) {
            stopWithService();
            return;
        }
        int adjustedTime = ((reconnectTries * 2) * 1000) + 3000;
        Log.d("RogerRadioAA", "Player reload delaying for " + adjustedTime);
        reconnectTries++;

        final Runnable playRunnable = new Runnable() {
            public void run() { playMedia(); }
        };

        handler.postDelayed(playRunnable, adjustedTime);
    }

    private boolean playerIsPlaying() {
        return (mediaPlayer != null && mediaPlayer.isPlaying());
    }

    private void playerPause() {
        setMediaPlaybackState(PAUSE);
        if (mediaPlayer != null) {
            mediaPlayer.pause();
        }
    }

    private void playerDuck() {
        Log.d("RogerRadioAA", "Ducking player.");
        if (playerIsPlaying()) {
            mediaPlayer.setVolume(VOLUME_DUCK, VOLUME_DUCK);
        }
    }

    private void playerUnduck() {
        Log.d("RogerRadioAA", "Unducking player.");
        if (playerIsPlaying()) {
            mediaPlayer.setVolume(VOLUME_NORMAL, VOLUME_NORMAL);
        }
    }

    private void playerStop() {
        Log.d("RogerRadioAA", "Stopping playback.");
        setMediaPlaybackState(STOPPED);
        if (mediaPlayer != null) {
            try {
                mediaPlayer.pause();
            } catch (Exception e) {
                e.printStackTrace();
            }
            try {
                mediaPlayer.release();
            } catch (Exception e) {
                e.printStackTrace();
            }
            closeWebSocketClient();
        }
        clearCachedWsData();
        mAudioFocusHelper.abandonAudioFocus();
    }

    private void stopWithService() {
        playerStop();
        stopSelf();
    }

    private AudioAttributes buildAudioAttributes() {
        playbackAttributes = new AudioAttributes.Builder()
                .setUsage(AudioAttributes.USAGE_MEDIA)
                .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                .build();
        return playbackAttributes;
    }

    private void clearCachedWsData() {
        lastWsDataNowplayingArtist = null;
        lastWsDataNowplayingTitle = null;
    }

    private void onWsMsg(JSONObject jsonMsg) {
        JSONObject payload = jsonMsg.optJSONObject("payload");
        if (payload == null) return;
        if (mediaPlayer == null) return;
        if (currentPlaybackState != PLAY) return;

        Iterator<String> iter = payload.keys();
        while (iter.hasNext()) {
            String routingKey = iter.next();
            switch (routingKey) {
                case "now_playing":
                    JSONObject data = payload.optJSONObject("now_playing");
                    if (data == null) continue;

                    String mArtist = data.optString("Artist");
                    String mTitle = data.optString("Title");
                    if (!mArtist.equals(lastWsDataNowplayingArtist) && !mTitle.equals(lastWsDataNowplayingTitle)) {
                        lastWsDataNowplayingArtist = mArtist;
                        lastWsDataNowplayingTitle = mTitle;
                        MediaMetadataCompat.Builder mBuilder = new MediaMetadataCompat.Builder()
                                .putText(MediaMetadataCompat.METADATA_KEY_TITLE, mTitle)
                                .putText(MediaMetadataCompat.METADATA_KEY_ARTIST, mArtist)
                                .putText(MediaMetadataCompat.METADATA_KEY_GENRE, "Radio");
                        String imgString = data.optString("Artwork");
                        if (imgString != null && imgString.length() > 0) {
                            try {
                                byte[] imageBytes = Base64.decode(imgString, Base64.DEFAULT);
                                Bitmap decodedImage = BitmapFactory.decodeByteArray(imageBytes, 0, imageBytes.length);
                                mBuilder.putBitmap(MediaMetadataCompat.METADATA_KEY_ALBUM_ART, decodedImage);
                            } catch (Exception e) {
                            }
                        }

                        mSession.setMetadata(mBuilder.build());
                    }
                default:
            }
        }

    }

    private void createWebSocketClient() {
        if (urlStatWs == null) {
            urlStatWs = radioConfig.getUrlStatWs(this);
        }
        webSocketClient = new WSClient(
                urlStatWs,
                new WSProcessor() {
                    @Override
                    public void processWsMsg(JSONObject jsonMsg) {
                        try {
                            onWsMsg(jsonMsg);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }
        );
    }

    private void connectWebSocketClient() {
        webSocketClient.connect();
    }

    private void closeWebSocketClient() {
        webSocketClient.close();
    }

    private final class MediaSessionCallback
            extends MediaSessionCompat.Callback
    {
        @Override
        public boolean onMediaButtonEvent(Intent mediaButtonEvent) {
            Log.d("RogerRadioAA", "MSession: onMediaButtonEvent");
            return super.onMediaButtonEvent(mediaButtonEvent);
        }

        @Override
        public void onPlay() {
            Log.d("RogerRadioAA", "MSession: onPlay");
            if (mAudioFocusHelper.requestAudioFocus()) {
                playWithService();
            }
            super.onPlay();
        }

        @Override
        public void onSkipToQueueItem(long queueId) {
            Log.d("RogerRadioAA", "MSession: onSkipToQueueItem");
        }

        @Override
        public void onSeekTo(long position) {
            Log.d("RogerRadioAA", "MSession: onSeekTo");
        }

        @Override
        public void onPlayFromMediaId(
                String mediaId,
                Bundle extras
        ) {
            Log.d("RogerRadioAA", "MSession onPlayFromMediaId");
            super.onPlayFromMediaId(mediaId, extras);
            if (mAudioFocusHelper.requestAudioFocus()) {
                playWithService();
            }
        }

        @Override
        public void onPause() {
            Log.d("RogerRadioAA", "MSession: onPause");
            super.onPause();
            playerPause();
        }

        @Override
        public void onStop() {
            Log.d("RogerRadioAA", "MSession: onStop");
            super.onStop();
            stopWithService();
        }

        @Override
        public void onSkipToNext() {
            Log.d("RogerRadioAA", "MSession: onSkipToNext");
        }

        @Override
        public void onSkipToPrevious() {
            Log.d("RogerRadioAA", "MSession: onSkipToPrevious");
        }

        @Override
        public void onCustomAction(
                String action,
                Bundle extras
        ) {
            Log.d("RogerRadioAA", "MSession: onCustomAction");
        }

        @Override
        public void onPlayFromSearch(
                final String query,
                final Bundle extras
        ) {
            Log.d("RogerRadioAA", "MSession: onPlayFromSearch");
            if (currentPlaybackState != PLAY && mAudioFocusHelper.requestAudioFocus()) {
                playWithService();
            }
        }
    }

    private final class AudioFocusHelper
            implements AudioManager.OnAudioFocusChangeListener
    {

        private boolean mPlayOnAudioFocus = false;

        private boolean requestAudioFocus() {
            Log.d("RogerRadioAA", "Requesting audio focus.");
            playbackAttributes = buildAudioAttributes();

            if (SDK_INT >= O) {
                audioFocusRequest = new AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN)
                        .setAudioAttributes(playbackAttributes)
                        .setAcceptsDelayedFocusGain(false)
                        .setOnAudioFocusChangeListener(mAudioFocusHelper, handler)
                        .build();
                int res = mAudioManager.requestAudioFocus(audioFocusRequest);
                if (res == AudioManager.AUDIOFOCUS_REQUEST_FAILED) {
                    Log.d("RogerRadioAA", "Audio focus request failed.");
                    return false;
                } else if (res == AudioManager.AUDIOFOCUS_REQUEST_GRANTED) {
                    Log.d("RogerRadioAA", "Audio focus request granted.");
                    return true;
                } else if (res == AudioManager.AUDIOFOCUS_REQUEST_DELAYED) {
                    Log.d("RogerRadioAA", "Audio focus request delayed.");
                    return false;
                }
                return false;
            } else {

                final int result = mAudioManager.requestAudioFocus(
                        this,
                        AudioManager.STREAM_MUSIC,
                        AudioManager.AUDIOFOCUS_GAIN);
                if (result == AudioManager.AUDIOFOCUS_REQUEST_GRANTED) {
                    Log.d("RogerRadioAA", "Audio focus request granted.");
                    return true;
                } else {
                    Log.d("RogerRadioAA", "Audio focus request failed.");
                    return false;
                }
            }
        }

        private void abandonAudioFocus() {
            Log.d("RogerRadioAA", "Abandoning audio focus.");
            try {
                mAudioManager.abandonAudioFocus(this);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        @Override
        public void onAudioFocusChange(int focusChange) {
            switch (focusChange) {
                case AudioManager.AUDIOFOCUS_GAIN:

                    Log.d("RogerRadioAA", "Audio focus change: Gain.");
                    if (mPlayOnAudioFocus && !playerIsPlaying()) {
                        playMedia();
                    } else if (mPlayOnAudioFocus && playerIsPlaying()) {
                        playerUnduck();
                    }
                    mPlayOnAudioFocus = false;
                    break;

                case AudioManager.AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK:
                    Log.d("RogerRadioAA", "Audio focus change: Duck.");
                    if (playerIsPlaying()) {
                        mPlayOnAudioFocus = true;
                        playerDuck();
                    }
                    break;

                case AudioManager.AUDIOFOCUS_LOSS_TRANSIENT:
                    Log.d("RogerRadioAA", "Audio focus change: Temporary loss.");
                    if (playerIsPlaying()) {
                        mPlayOnAudioFocus = true;
                        playerPause();
                    }
                    break;
                case AudioManager.AUDIOFOCUS_LOSS:
                    Log.d("RogerRadioAA", "Audio focus change: Permanent loss.");
                    mPlayOnAudioFocus = false;
                    playerStop();
                    break;
                default:
                    Log.d("RogerRadioAA", "Audio focus change: Unhandled: " + focusChange);
            }
        }
    }
}
