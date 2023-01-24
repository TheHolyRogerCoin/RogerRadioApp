package com.theholyroger.CordovaAndroidAutoPlugin;

import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.AudioAttributes;
import android.media.AudioFocusRequest;
import android.media.AudioManager;
import android.media.MediaMetadata;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.support.v4.media.MediaBrowserCompat;
import android.support.v4.media.MediaDescriptionCompat;
import android.support.v4.media.MediaMetadataCompat;
import android.support.v4.media.session.MediaControllerCompat;
import android.support.v4.media.session.MediaSessionCompat;
import android.support.v4.media.session.PlaybackStateCompat;
import android.util.Base64;
import android.util.Log;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.media.MediaBrowserServiceCompat;

import dev.gustavoavila.websocketclient.WebSocketClient;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Iterator;

import org.json.JSONArray;
import org.json.JSONObject;

import static android.os.Build.VERSION.SDK_INT;
import static android.os.Build.VERSION_CODES.O;


public class CordovaAndroidAutoPlugin extends MediaBrowserServiceCompat {
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

    private AudioManager mAudioManager;
    private MediaSessionCompat mSession;
    private CordovaAndroidAutoPlugin.AudioFocusHelper mAudioFocusHelper;
    private AudioFocusRequest audioFocusRequest;
    private AudioAttributes playbackAttributes;
    private Handler handler;
    private Resources resources;
    private MediaPlayer mediaPlayer;
    private String lastWsDataNowplayingArtist;
    private String lastWsDataNowplayingTitle;
    private List<MediaBrowserCompat.MediaItem> loadedMediaItems = new ArrayList<>();
    private static final String MY_MEDIA_ROOT_ID = "cordovaAndroidAutoRoot";

    private WebSocketClient webSocketClient;

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
        notifyChildrenChanged(MY_MEDIA_ROOT_ID);
    }

    @Override
    public void onCreate() {
        super.onCreate();

        resources = this.getResources();

        mAudioManager = (AudioManager) this.getSystemService(Context.AUDIO_SERVICE);
        mAudioFocusHelper = new CordovaAndroidAutoPlugin.AudioFocusHelper();

        mSession = new MediaSessionCompat(this, "CordovaAndroidAutoPlugin");
        setSessionToken(mSession.getSessionToken());
        mSession.setCallback(new MediaSessionCallback());
        mSession.setFlags(MediaSessionCompat.FLAG_HANDLES_MEDIA_BUTTONS |
                MediaSessionCompat.FLAG_HANDLES_TRANSPORT_CONTROLS);
        mSession.setActive(true);

        handler = new Handler();
    }

    @Override
    public void onDestroy() {
        mSession.release();
        if( mediaPlayer != null ) {
            pauseMedia();
            mediaPlayer.release();
        }
        mAudioFocusHelper.abandonAudioFocus();
        super.onDestroy();
    }

    @Nullable
    @Override
    public BrowserRoot onGetRoot(@NonNull String clientPackageName,
                                 int clientUid,
                                 Bundle rootHints) {
        return new BrowserRoot(MY_MEDIA_ROOT_ID, null);
    }

    @Override
    public void onLoadChildren(@NonNull final String parentMediaId,
                               @NonNull final Result<List<MediaBrowserCompat.MediaItem>> result) {

        Log.d("MediaPlayer","Load Children for " + parentMediaId);

        List<MediaBrowserCompat.MediaItem> resultMediaItems = new ArrayList<>();

        for (int i = 0; i < loadedMediaItems.size(); i++) {
            resultMediaItems.add(loadedMediaItems.get(i));
        }

        if (resultMediaItems.size() <= 0) {
            // Check if this is the root menu:
            if (MY_MEDIA_ROOT_ID.equals(parentMediaId)) {
                resultMediaItems.add(createBrowsableMediaItem("browse", "Roger Radio", null, false));
            } else {
                resultMediaItems.add(createBrowsableMediaItem("listen", "Listen Live", null, true));
            }
        }

        result.sendResult(resultMediaItems);
    }

    private MediaBrowserCompat.MediaItem createBrowsableMediaItem(String mediaId, String folderName, Uri iconUri, boolean asPlayable) {
        MediaDescriptionCompat.Builder mediaDescriptionBuilder = new MediaDescriptionCompat.Builder();
        mediaDescriptionBuilder.setMediaId(mediaId);
        mediaDescriptionBuilder.setTitle(folderName);
        if (iconUri == null) {
            int drawableResourceId = this.getResources().getIdentifier("main_logo_transparent", "drawable", this.getPackageName());
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

    private MediaBrowserCompat.MediaItem createPlayableMediaItem(String mediaId, String folderName, Uri iconUri) {
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

    private void setMediaPlaybackState( int state ) {
        PlaybackStateCompat playbackState = null;
        switch (state) {
            case PLAY:
                playbackState = new PlaybackStateCompat.Builder()
                        .setActions( PlaybackStateCompat.ACTION_PLAY_PAUSE | PlaybackStateCompat.ACTION_SKIP_TO_NEXT | PlaybackStateCompat.ACTION_SKIP_TO_PREVIOUS )
                        .setState( PlaybackStateCompat.STATE_PLAYING, 0, 1 )
                        .build();
                break;

            case PAUSE:
                playbackState = new PlaybackStateCompat.Builder()
                        .setActions( PlaybackStateCompat.ACTION_PLAY_PAUSE )
                        .setState(PlaybackStateCompat.STATE_PAUSED, 0, 1)
                        .build();
                break;

            case BUFFERING:
                playbackState = new PlaybackStateCompat.Builder()
                        .setActions( PlaybackStateCompat.ACTION_STOP )
                        .setState(PlaybackStateCompat.STATE_BUFFERING, 0, 1)
                        .build();
                break;

            case CONNECTING:
                playbackState = new PlaybackStateCompat.Builder()
                        .setActions( PlaybackStateCompat.ACTION_STOP )
                        .setState(PlaybackStateCompat.STATE_CONNECTING, 0, 1)
                        .build();
                break;

            case STOPPED:
                playbackState = new PlaybackStateCompat.Builder()
                        .setActions( PlaybackStateCompat.ACTION_PLAY_FROM_MEDIA_ID )
                        .setState(PlaybackStateCompat.STATE_STOPPED, 0, 1)
                        .build();
                break;
        }
        mSession.setPlaybackState( playbackState );
    }

    private void playMedia() {
        setMediaPlaybackState(BUFFERING);
        mSession.setMetadata(new MediaMetadataCompat.Builder()
                .putText(MediaMetadataCompat.METADATA_KEY_TITLE, "Roger Radio")
                .putText(MediaMetadataCompat.METADATA_KEY_ARTIST, "Roger Radio")
                .putText(MediaMetadataCompat.METADATA_KEY_GENRE, "Radio")
                .build()
        );
        if( mediaPlayer != null )
            try {
                mediaPlayer.reset();
            }
            catch (Exception e){
                mediaPlayer = new MediaPlayer();
                e.printStackTrace();
            }
        else
            mediaPlayer = new MediaPlayer();
        try {
            mediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
            mediaPlayer.setDataSource("https://rogerradio.theholyroger.com/live");
            mediaPlayer.prepareAsync();
        }
        catch (Exception e){
            e.printStackTrace();
        }
        mediaPlayer.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
            @Override
            public void onPrepared(MediaPlayer mediaPlayer) {
                mediaPlayer.start();
                setMediaPlaybackState(PLAY);
            }
        });

        mediaPlayer.setOnInfoListener(new MediaPlayer.OnInfoListener() {
            @Override
            public boolean onInfo(MediaPlayer mediaPlayer, int state, int extra) {
                switch (state){
                    case MediaPlayer.MEDIA_INFO_BUFFERING_START:{
                        Log.d("MediaPlayer","StartBuffer");
                        setMediaPlaybackState(BUFFERING);
                        break;
                    }

                    case MediaPlayer.MEDIA_INFO_BUFFERING_END:{
                        Log.d("MediaPlayer","EndBuffer");
                        setMediaPlaybackState(PLAY);
                    }
                }
                return true;
            }
        });

        mediaPlayer.setOnErrorListener(new MediaPlayer.OnErrorListener() {
            @Override
            public boolean onError(MediaPlayer mediaPlayer, int state, int extra) {
                Log.e("MediaPlayer Error", String.valueOf(state));
                reloadPlayerOnError();
                return false;
            }
        });
        createWebSocketClient();
    }

    private final Runnable playRunnable = new Runnable() {
        public void run() {
            playMedia();
        }
    };

    private void reloadPlayerOnError() {
        setMediaPlaybackState(STOPPED);
        if( mediaPlayer != null ) {
            pauseMedia();
            mediaPlayer.release();
        }
        mAudioFocusHelper.abandonAudioFocus();

        handler.postDelayed(playRunnable, 1000);
    }

    private void pauseMedia() {
        if( mediaPlayer != null ) {
            mediaPlayer.pause();
            webSocketClient.close(2, 1000, null);
            webSocketClient = null;
        }
    }

    private final class MediaSessionCallback extends MediaSessionCompat.Callback {
        @Override
        public void onPlay() {
            if(mAudioFocusHelper.requestAudioFocus()) {
                playMedia();
            }
            super.onPlay();
        }

        @Override
        public void onSkipToQueueItem(long queueId) {
        }

        @Override
        public void onSeekTo(long position) {
        }

        @Override
        public void onPlayFromMediaId(String mediaId, Bundle extras) {
            super.onPlayFromMediaId(mediaId, extras);
            if(mAudioFocusHelper.requestAudioFocus()) {
                playMedia();
            }
        }

        @Override
        public void onPause() {
            super.onPause();
            setMediaPlaybackState(PAUSE);
            pauseMedia();
        }

        @Override
        public void onStop() {
            super.onStop();
            setMediaPlaybackState(STOPPED);
            if( mediaPlayer != null ) {
                pauseMedia();
                mediaPlayer.release();
            }
            mAudioFocusHelper.abandonAudioFocus();
        }

        @Override
        public void onSkipToNext() {
        }

        @Override
        public void onSkipToPrevious() {
        }

        @Override
        public void onCustomAction(String action, Bundle extras) {
        }

        @Override
        public void onPlayFromSearch(final String query, final Bundle extras) {
        }
    }

    private final class AudioFocusHelper implements AudioManager.OnAudioFocusChangeListener {

        private boolean mPlayOnAudioFocus = false;
        private boolean requestAudioFocus() {
            Log.d("CordovaAndroidAutoPlugin", "requestAudioFocus()...");
            playbackAttributes = new AudioAttributes.Builder()
                    .setUsage(AudioAttributes.USAGE_MEDIA)
                    .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                    .build();

            if (SDK_INT >= O) {
                audioFocusRequest = new AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN)
                        .setAudioAttributes(playbackAttributes)
                        .setAcceptsDelayedFocusGain(false)
                        .setOnAudioFocusChangeListener(mAudioFocusHelper, handler)
                        .build();
                int res = mAudioManager.requestAudioFocus(audioFocusRequest);
                if (res == AudioManager.AUDIOFOCUS_REQUEST_FAILED) {
                    Log.d("CordovaAndroidAutoPlugin", "audio focus failed...");
                    return false;
                } else if (res == AudioManager.AUDIOFOCUS_REQUEST_GRANTED) {
                    Log.d("CordovaAndroidAutoPlugin", "audio focus granted...");
                    return true;
                } else if (res == AudioManager.AUDIOFOCUS_REQUEST_DELAYED) {
                    Log.d("CordovaAndroidAutoPlugin", "audio focus DELAYED...");
                    return false;
                }
            }else{
                final int result = mAudioManager.requestAudioFocus(this,
                        AudioManager.STREAM_MUSIC,
                        AudioManager.AUDIOFOCUS_GAIN);
                return result == AudioManager.AUDIOFOCUS_REQUEST_GRANTED;
            }
            Log.d("CordovaAndroidAutoPlugin", "audio focus returning default!?");
            return false;
        }

        private void abandonAudioFocus() {
            Log.d("CordovaAndroidAutoPlugin", "abandonAudioFocus()");
            mAudioManager.abandonAudioFocus(this);
        }

        @Override
        public void onAudioFocusChange(int focusChange) {
            Log.d("CordovaAndroidAutoPlugin", "Audio focus changed...");
            switch (focusChange) {
                case AudioManager.AUDIOFOCUS_GAIN:

                    Log.d("CordovaAndroidAutoPlugin", "AUDIOFOCUS_GAIN");
                    if (mPlayOnAudioFocus && !mediaPlayer.isPlaying()) {
                        playMedia();
                    }
                    mPlayOnAudioFocus = false;
                    break;

                case AudioManager.AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK:
                    Log.d("CordovaAndroidAutoPlugin", "AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK");
                    break;

                case AudioManager.AUDIOFOCUS_LOSS_TRANSIENT:
                    Log.d("CordovaAndroidAutoPlugin", "AUDIOFOCUS_LOSS_TRANSIENT");
                    if (mediaPlayer.isPlaying()) {
                        mPlayOnAudioFocus = true;
                        pauseMedia();
                    }
                    break;
                case AudioManager.AUDIOFOCUS_LOSS:
                    Log.d("CordovaAndroidAutoPlugin", "AUDIOFOCUS_LOSS");
                    mAudioManager.abandonAudioFocus(this);
                    if (mediaPlayer.isPlaying()) {
                        pauseMedia();
                        mPlayOnAudioFocus = false;
                    }
                    break;
                default:
                    Log.d("CordovaAndroidAutoPlugin", "AUDIOFOCUS_???");
            }
        }
    }

    private void processWsMsg(JSONObject jsonMsg) {
        JSONObject payload = jsonMsg.optJSONObject("payload");
        if (payload == null) return;

        Iterator<String> iter = payload.keys();
        while(iter.hasNext()){
            String routingKey = iter.next();
            switch (routingKey) {
                case "now_playing":
                    JSONObject data = payload.optJSONObject("now_playing");
                    if (data == null) continue;

                    String mArtist = data.optString("Artist");
                    String mTitle = data.optString("Title");
                    if (mArtist != lastWsDataNowplayingArtist && mTitle != lastWsDataNowplayingTitle) {
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
                            } catch (Exception e) {}
                        }

                        mSession.setMetadata(mBuilder.build());
                    }
                default:
            }
        }

    }

    private void createWebSocketClient() {
        if (webSocketClient != null) return;

        URI uri;
        try {
            uri = new URI("wss://rogerradio.theholyroger.com/wss/ws_stats_public/all_public_stats?pub-api-key=hello-from-roger-radio-app");
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }

        webSocketClient = new WebSocketClient(uri) {
            @Override
            public void onTextReceived(String message) {
                try {
                    JSONObject jsonMsg = new JSONObject(message);
                    processWsMsg(jsonMsg);
                }
                catch (Exception e){
                    e.printStackTrace();
                    System.out.print("onTextReceived err processing: ");
                    System.out.println(message);
                }
            }

            @Override
            public void onOpen() {}

            @Override
            public void onBinaryReceived(byte[] data) {}

            @Override
            public void onPingReceived(byte[] data) {}

            @Override
            public void onPongReceived(byte[] data) {}

            @Override
            public void onException(Exception e) {
                System.out.println(e.getMessage());
            }

            @Override
            public void onCloseReceived(int reason, String description) {}
        };

        webSocketClient.setConnectTimeout(10000);
        webSocketClient.setReadTimeout(60000);
        webSocketClient.addHeader("Origin", "https://rogerradio.app.local");
        webSocketClient.enableAutomaticReconnection(5000);
        webSocketClient.connect();
    }
}
