package com.theholyroger.RogerRadioPlayer;

import android.os.Handler;
import android.util.Log;

import com.homerours.musiccontrols.MusicControls;
import com.theholyroger.RogerRadioConfig.RogerRadioConfig;
import com.theholyroger.WSClient.WSClient;
import com.theholyroger.WSProcessor.WSProcessor;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.apache.cordova.media.AudioHandler;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;
import java.util.UUID;

import de.appplant.cordova.plugin.background.BackgroundMode;
import de.appplant.cordova.plugin.background.BackgroundModeExt;

public class RogerRadioPlayer
        extends CordovaPlugin
{
    private final int maxReconnects = 10;
    private BackgroundMode pluginBgMode;
    private BackgroundModeExt pluginBgModeExt;
    private AudioHandler pluginMedia;
    private MusicControls pluginMusicControls;
    private boolean mediaControlsActive = false;
    private boolean shouldReEnterBackground = false;
    private boolean lockReloading = false;
    private boolean lockMusicControlsStop = false;
    private boolean stateIsPlaying = false;
    private boolean playVolumeIsSet = false;
    private String playerURL;
    private String playerUUID;
    private float playerVolume = 1.0f;
    private String playMetaTitle;
    private String playMetaArtist;
    private CallbackContext callbackStop;
    private CallbackContext callbackTasksEnable;
    private CallbackContext callbackTasksDisable;
    private int reconnectTries = 0;
    private String lastWsDataNowplayingArtist;
    private String lastWsDataNowplayingTitle;

    private final RogerRadioConfig radioConfig = new RogerRadioConfig();

    private Handler handler;
    private String urlStatWs;
    private WSClient webSocketClient;

    @Override
    protected void pluginInitialize() {
        handler = new Handler();

        pluginBgMode = (BackgroundMode) this.webView.getPluginManager().getPlugin("BackgroundMode");
        pluginBgModeExt = (BackgroundModeExt) this.webView.getPluginManager().getPlugin("BackgroundModeExt");
        pluginMedia = (AudioHandler) this.webView.getPluginManager().getPlugin("Media");
        pluginMusicControls = (MusicControls) this.webView.getPluginManager().getPlugin("MusicControls");

        try {
            pluginMedia.execute("messageChannel", (JSONArray) null, new CallbackContext(null, null) {
                @Override
                public void sendPluginResult(PluginResult pluginResult) {
                    Log.d("RRP", "messageChannel onMessageFromMedia sendPluginResult");
                    onMessageFromMedia(pluginResult);
                }
            });
        } catch (JSONException e) {e.printStackTrace();}

        createWebSocketClient();
    }

    /**
     * Executes the request.
     *
     * @param action   The action to execute.
     * @param args     The exec() arguments.
     * @param callback The callback context used when
     *                 calling back into JavaScript.
     * @return Returning false results in a "MethodNotFound" error.
     */
    @Override
    public boolean execute(
            String action,
            JSONArray args,
            CallbackContext callback
    )
            throws JSONException {
        boolean validAction = true;

        switch (action) {
            case "setCallbackStopped":
                callbackStop = callback;
                break;
            case "setCallbackTasksEnable":
                callbackTasksEnable = callback;
                break;
            case "setCallbackTasksDisable":
                callbackTasksDisable = callback;
                break;
            case "onDeviceReady":
                onDeviceReady();
                break;
            case "clearCachedStreamUrl":
                clearCachedStreamUrl();
                break;
            case "playerLoad":
                playerLoad(args.getString(0));
                break;
            case "playerReload":
                playerReload();
                break;
            case "playerPlay":
                playerPlay();
                break;
            case "playerStop":
                playerStop(true);
                break;
            case "playerSetVolume":
                playerSetVolume(Float.parseFloat(args.getString(0)));
                break;
            case "playerUnmute":
                playerUnmute();
                break;
            case "playerMute":
                playerMute();
                break;
            case "playerExit":
                playerExit();
                break;
            case "updateMetadata":
                updateMetadata(args.getString(0), args.getString(1));
                break;
            case "controlsDestroy":
                controlsDestroy();
                break;
            case "controlsSubscribe":
                controlsSubscribe();
                break;
            case "controlsCreate":
                controlsCreate();
                break;
            default:
                validAction = false;
                break;
        }

        return validAction;
    }

    public void onDeviceReady() {
        backgroundSetup();
    }

    public void clearCachedStreamUrl() {
        radioConfig.clearCachedStreamUrl();
    }

    public void playerLoad(String pURL) {
        Log.d("RRP", "playerLoad");
        playerURL = pURL;
        if (stateIsPlaying && !lockReloading) {
            playerReload();
            return;
        }
        setStateIsStopped();
        playerUUID = UUID.randomUUID().toString();
        JSONArray createArgs = new JSONArray();
        createArgs.put(playerUUID);
        createArgs.put(playerURL);
        try {
            pluginMedia.execute("create", createArgs, emptyCbMedia());
        } catch (JSONException e) {e.printStackTrace();}
    }

    public void playerReload() {
        final Runnable runnablePlayerReload = new Runnable() {
            public void run() {
                Log.d("RRP", "runnablePlayerReload");
                playerFullReload();
            }
        };
        handler.postDelayed(runnablePlayerReload, 500);
    }

    public void playerFullReload() {
        if (lockReloading) return;
        lockForReload();
        Log.d("RRP", "playerFullReload");
        pluginMedia.stopPlayingAudio(playerUUID);
        playerRelease();
        backgroundDisable();
        playerUUID = null;
        if (reconnectTries >= maxReconnects) {
            playerStop(false);
            if (shouldReEnterBackground) {
                shouldReEnterBackground = false;
                backgroundMoveBackground();
            }
            return;
        }
        int adjustedTime = ((reconnectTries * 2) * 1000) + 1500;
        Log.d("RRP", "Reload delaying for " + adjustedTime);
        reconnectTries++;
        final Runnable runnablePlayerLoad = new Runnable() {
            public void run() {
                Log.d("RRP", "runnablePlayerLoad");
                boolean shouldPlay = stateIsPlaying;
                playerLoad(playerURL);
                if (shouldPlay) playerPlay();
                unlockForReload();
            }
        };
        handler.postDelayed(runnablePlayerLoad, adjustedTime);
    }

    public void playerPlay() {
        Log.d("RRP", "playerPlay");
        setStateIsPlaying();
        controlsCreate();
        controlsSubscribe();
        pluginMedia.startPlayingAudioInBackground(playerUUID, playerURL);
        playVolumeIsSet = false;
        pluginMedia.setVolume(playerUUID, playerVolume);
        backgroundEnable();
        if (shouldReEnterBackground) {
            shouldReEnterBackground = false;
            backgroundMoveBackground();
        }
    }

    public void playerStop(boolean calledFromUi) {
        Log.d("RRP", "playerStop");
        pluginMedia.stopPlayingAudio(playerUUID);
        controlsStop();
        controlsDestroy();
        if (!calledFromUi) {
            callbackStop.success();
        }
        // backgroundDisable();
        // setStateIsStopped();
    }

    public void playerSetVolume(float vol) {
        playerVolume = Math.max(Math.min(vol, 1.0f), 0.0f);
        if (stateIsPlaying) {
            try {
                pluginMedia.setVolume(playerUUID, playerVolume);
            } catch (Exception e) {e.printStackTrace();}
        }
    }

    public void playerUnmute() {
        pluginMedia.setVolume(playerUUID, playerVolume);
    }

    public void playerMute() {
        Log.d("RRP", "playerMute");
        pluginMedia.setVolume(playerUUID, 0.0f);
    }

    public void playerExit() {
        Log.d("RRP", "playerExit");
        playerStop(false);
        controlsStop();
        controlsDestroy();
    }

    public void updateMetadata(
            String artist,
            String title
    ) {
        Log.d("RRP", "updateMetadata");
        playMetaTitle = title;
        playMetaArtist = artist;
        if (mediaControlsActive) {
            controlsCreate();
        }
    }

    public void controlsStop() {
        if (!mediaControlsActive) return;

        Log.d("RRP", "controlsStop");
        try {
            mediaControlsActive = false;
            JSONObject argsData = new JSONObject();
            argsData.put("isPlaying", false);
            JSONArray args = new JSONArray();
            args.put(argsData);
            pluginMusicControls.execute("updateIsPlaying", args, new CallbackContext(null, null) {
                @Override
                public void success(String message) {}
            });
        } catch (JSONException e) {e.printStackTrace();}
    }

    public void controlsDestroy() {
        Log.d("RRP", "controlsDestroy");
        try {
            mediaControlsActive = false;
            pluginMusicControls.execute("destroy", (JSONArray) null, new CallbackContext(null, null) {
                @Override
                public void success(String message) {}
            });
        } catch (JSONException e) {e.printStackTrace();}
    }

    public void controlsSubscribe() {
        Log.d("RRP", "controlsSubscribe");
        try {
            pluginMusicControls.execute("watch", (JSONArray) null, new CallbackContext(null, null) {
                @Override
                public void success(String message) {
                    controlsEventProcess(message);
                }
            });
        } catch (JSONException e) {e.printStackTrace();}
        lockMusicControlsStop = false;
    }

    public void controlsCreate() {
        Log.d("RRP", "controlsCreate");
        try {
            mediaControlsActive = true;
            JSONObject argsData = new JSONObject();
            argsData.put("track", playMetaTitle);
            argsData.put("artist", playMetaArtist);
            argsData.put("album", "");
            argsData.put("isPlaying", true);
            argsData.put("dismissable", false);
            argsData.put("hasNext", false);
            argsData.put("hasPrev", false);
            argsData.put("hasClose", false);
            argsData.put("hasSkipForward", false);
            argsData.put("hasSkipBackward", false);
            argsData.put("hasScrubbing", false);
            argsData.put("playIcon", "");
            argsData.put("pauseIcon", "");
            argsData.put("prevIcon", "");
            argsData.put("nextIcon", "");
            argsData.put("closeIcon", "");
            argsData.put("notificationIcon", "notification_logo");
            argsData.put("ticker", "RogerRadio :: " + playMetaArtist + " - " + playMetaTitle);
            argsData.put("cover", "https://theholyroger.com/resources/assets/rogerradiostatic.gif");
            JSONArray args = new JSONArray();
            args.put(argsData);
            try {
                pluginMusicControls.execute("create", args, new CallbackContext(null, null) {
                    @Override
                    public void success(String message) {}
                });
            } catch (JSONException e) {e.printStackTrace();}
        } catch (JSONException e) {e.printStackTrace();}
        lockMusicControlsStop = false;
    }

    private void controlsEventProcess(String message) {
        Log.d("RRP", "controlsEventProcess");
        try {
            JSONObject jsonMsg = new JSONObject(message);
            String msgType = jsonMsg.optString("message");
            Log.d("RRP", message);
            switch (msgType) {
                case "music-controls-pause":
                case "music-controls-destroy":
                case "music-controls-headset-unplugged":
                case "music-controls-media-button-pause":
                case "music-controls-media-button-stop":
                    if (!lockMusicControlsStop) {
                        mediaControlsActive = false;
                        lockMusicControlsStop = true;
                        backgroundUnlock();
                        backgroundMoveForeground();
                        final Runnable runnablePlayerStop = new Runnable() {
                            public void run() {
                                callbackStop.success();
                                playerStop(false);
                                controlsStop();
                                controlsDestroy();
                            }
                        };
                        handler.postDelayed(runnablePlayerStop, 1);
                    }
                    break;
                case "music-controls-stop-listening":
                    final Runnable runnableControlsDestroy = new Runnable() {
                        public void run() {
                            controlsDestroy();
                        }
                    };
                    handler.postDelayed(runnableControlsDestroy, 1);
                default:
                    break;
            }
        } catch (JSONException e) {e.printStackTrace();}
        if (mediaControlsActive) {
            controlsSubscribe();
        }
    }

    private void playerRelease() {
        Log.d("RRP", "playerRelease");
        JSONArray releaseArgs = new JSONArray();
        releaseArgs.put(playerUUID);
        try {
            pluginMedia.execute("release", releaseArgs, emptyCbMedia());
        } catch (JSONException e) {e.printStackTrace();}
    }

    private void setStateIsPlaying() {
        stateIsPlaying = true;
    }

    private void setStateIsStopped() {
        stateIsPlaying = false;
    }

    private void lockForReload() {
        lockReloading = true;
    }

    private void unlockForReload() {
        lockReloading = false;
    }

    private void onMediaError(int status) {
        if (status <= 0) return;
        Log.d("RRP", "onMediaError " + status);
        if (pluginBgMode.isBackgroundActive()) {
            shouldReEnterBackground = true;
        }
        backgroundUnlock();
        backgroundMoveForeground();
        backgroundDisable();
        playerFullReload();
    }

    private void onMediaStatus(int status) {
        if (status == 2) {
            reconnectTries = 0;
            setStateIsPlaying();
            if (!playVolumeIsSet) {
                playVolumeIsSet = true;
                pluginMedia.setVolume(playerUUID, playerVolume);
            }
        } else if (status == 4) {
            Log.d("RRP", "onMediaStatus stopped");
            backgroundMoveForeground();
            playerRelease();
            setStateIsStopped();
            backgroundDisable();
            callbackStop.success();
        }
    }

    private void onMessageFromMedia(PluginResult pluginResult) {
        if (lockReloading) return;
        String sMsg = pluginResult.getMessage();
        // Log.d("RRP","onMessageFromMedia: " + sMsg);
        try {
            JSONObject jsonMsg = new JSONObject(sMsg);
            JSONObject statusUpdate = jsonMsg.optJSONObject("status");
            int messageType = statusUpdate.optInt("msgType");
            switch (messageType) {
                case 9:
                    JSONObject errCodes = statusUpdate.optJSONObject("value");
                    int errorCode = (int) errCodes.optDouble("code");
                    onMediaError(errorCode);
                    break;
                case 1:
                    int statusCode = (int) statusUpdate.optDouble("value");
                    onMediaStatus(statusCode);
                    break;
                default:
                    break;
            }
        } catch (JSONException e) {e.printStackTrace();}

    }

    private void backgroundSetCallbackActivate() {
        pluginBgMode.execute("setCallbackActivate", (JSONArray) null, new CallbackContext(null, null) {
            @Override
            public void success() {
                try {
                    final Runnable onCallbackActivate = new Runnable() {
                        public void run() {
                            try {
                                callbackTasksDisable.success();
                                pluginBgMode.execute("webview", (JSONArray) null, emptyCbBackground());
                                connectWebSocketClient();
                            } catch (Exception e) {e.printStackTrace();}
                            backgroundSetCallbackActivate();
                        }
                    };
                    handler.postDelayed(onCallbackActivate, 2);
                } catch (Exception e) {e.printStackTrace();}
            }

            @Override
            public void error(String message) {}
        });
    }

    private void backgroundSetCallbackDeactivate() {
        pluginBgMode.execute("setCallbackDeactivate", (JSONArray) null, new CallbackContext(null, null) {
            @Override
            public void success() {
                try {
                    final Runnable onCallbackDeactivate = new Runnable() {
                        public void run() {
                            try {
                                callbackTasksEnable.success();
                                closeWebSocketClient();
                            } catch (Exception e) {e.printStackTrace();}
                            backgroundSetCallbackDeactivate();
                        }
                    };
                    handler.postDelayed(onCallbackDeactivate, 2);
                } catch (Exception e) {e.printStackTrace();}
            }

            @Override
            public void error(String message) {}
        });
    }

    private void backgroundSetCallbackBeforeExit() {
        pluginBgMode.execute("setCallbackBeforeExit", (JSONArray) null, new CallbackContext(null, null) {
            @Override
            public void success() {
                Log.d("RRP", "backgroundSetCallbackBeforeExit called");
                try {
                    final Runnable onCallbackBeforeExit = new Runnable() {
                        public void run() {
                            backgroundSetCallbackBeforeExit();
                        }
                    };
                    callbackTasksDisable.success();
                    handler.postDelayed(onCallbackBeforeExit, 2);
                } catch (Exception e) {e.printStackTrace();}
            }

            @Override
            public void error(String message) {}
        });
    }

    private void backgroundSetCallbackAfterResume() {
        pluginBgMode.execute("setCallbackAfterResume", (JSONArray) null, new CallbackContext(null, null) {
            @Override
            public void success() {
                Log.d("RRP", "backgroundSetCallbackAfterResume called");
                try {
                    final Runnable onCallbackAfterResume = new Runnable() {
                        public void run() {
                            try {
                                callbackTasksEnable.success();
                            } catch (Exception e) {e.printStackTrace();}
                            backgroundSetCallbackAfterResume();
                        }
                    };
                    handler.postDelayed(onCallbackAfterResume, 100);
                } catch (Exception e) {e.printStackTrace();}
            }

            @Override
            public void error(String message) {}
        });
    }

    private void backgroundSetup() {
        Log.d("RRP", "backgroundSetup");
        try {
            JSONObject bgSettings = new JSONObject();
            bgSettings.put("title", "RogerRadio running in background");
            bgSettings.put("text", "Streaming live");
            bgSettings.put("subText", "");
            bgSettings.put("bigText", false);
            bgSettings.put("resume", true);
            bgSettings.put("silent", true);
            bgSettings.put("hidden", true);
            bgSettings.put("color", null);
            bgSettings.put("icon", "icon");
            bgSettings.put("channelName", "cordova-plugin-background-mode-rr");
            bgSettings.put("channelDescription", "cordova-plugin-background-rr-moden notification");
            bgSettings.put("allowClose", false);
            bgSettings.put("closeIcon", "power");
            bgSettings.put("closeTitle", "Close");
            bgSettings.put("showWhen", true);
            bgSettings.put("visibility", null);
            JSONArray conf = new JSONArray();
            conf.put(bgSettings);
            conf.put(false);
            pluginBgMode.execute("configure", conf, emptyCbBackground());
            backgroundSetCallbackActivate();
            backgroundSetCallbackDeactivate();
            backgroundSetCallbackBeforeExit();
            backgroundSetCallbackAfterResume();
            pluginBgMode.execute("battery", (JSONArray) null, emptyCbBackground());
            pluginBgMode.execute("requestTopPermissions", (JSONArray) null, emptyCbBackground());
        } catch (JSONException e) {e.printStackTrace();}
    }

    private void backgroundEnable() {
        Log.d("RRP", "backgroundEnable");
        pluginBgMode.execute("enable", (JSONArray) null, emptyCbBackground());
    }

    private void backgroundDisable() {
        Log.d("RRP", "backgroundDisable");
        pluginBgMode.execute("disable", (JSONArray) null, emptyCbBackground());
    }

    private void backgroundUnlock() {
        Log.d("RRP", "backgroundUnlock");
        pluginBgModeExt.execute("unlock", (JSONArray) null, emptyCbBackground());
    }

    private void backgroundMoveBackground() {
        Log.d("RRP", "backgroundMoveBackground");
        pluginBgModeExt.execute("background", (JSONArray) null, emptyCbBackground());
    }

    private void backgroundMoveForeground() {
        Log.d("RRP", "backgroundMoveForeground");
        pluginBgModeExt.execute("foreground", (JSONArray) null, emptyCbBackground());
    }

    private CallbackContext emptyCbMedia() {
        return new CallbackContext(null, null) {
            @Override
            public void sendPluginResult(PluginResult pluginResult) {}
        };
    }

    private CallbackContext emptyCbBackground() {
        return new CallbackContext(null, null) {
            @Override
            public void success(String message) {}

            @Override
            public void success() {}

            @Override
            public void error(String message) {}
        };
    }

    private void onWsMsg(JSONObject jsonMsg) {
        JSONObject payload = jsonMsg.optJSONObject("payload");
        if (payload == null) return;

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
                        updateMetadata(mArtist, mTitle);
                    }
                default:
            }
        }

    }

    private void createWebSocketClient() {
        Log.d("RRP", "createWebSocketClient");
        if (urlStatWs == null) {
            urlStatWs = radioConfig.getUrlStatWs(this.cordova.getActivity().getApplicationContext());
        }
        webSocketClient = new WSClient(
                urlStatWs,
                new WSProcessor() {
                    @Override
                    public void processWsMsg(JSONObject jsonMsg) {
                        onWsMsg(jsonMsg);
                    }
                }
        );
    }

    private void connectWebSocketClient() {
        Log.d("RRP", "connectWebSocketClient");
        webSocketClient.connect();
    }

    private void closeWebSocketClient() {
        Log.d("RRP", "closeWebSocketClient");
        webSocketClient.close();
    }
}
