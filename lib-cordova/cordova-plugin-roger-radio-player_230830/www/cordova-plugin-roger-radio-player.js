var exec    = require('cordova/exec'),
    channel = require('cordova/channel');

/**
 * @private
 *
 * Flag indicates if the mode is active.
 */
var rrPlayer = {
    callbackStopped: function() {},
    callbackTasksEnable: function() {},
    callbackTasksDisable: function() {},
    wrapCallbackStopped: function() {
        rrPlayer.callbackStopped();
        exec(rrPlayer.wrapCallbackStopped, null, 'RogerRadioPlayer', 'setCallbackStopped', []);
    },
    wrapCallbackTasksEnable: function() {
        rrPlayer.callbackTasksEnable();
        exec(rrPlayer.wrapCallbackTasksEnable, null, 'RogerRadioPlayer', 'setCallbackTasksEnable', []);
    },
    wrapCallbackTasksDisable: function() {
        rrPlayer.callbackTasksDisable();
        exec(rrPlayer.wrapCallbackTasksDisable, null, 'RogerRadioPlayer', 'setCallbackTasksDisable', []);
    }
};

exports.setCallbackStopped = function(callback)
{
    rrPlayer.callbackStopped = callback;
    exec(rrPlayer.wrapCallbackStopped, null, 'RogerRadioPlayer', 'setCallbackStopped', []);
};

exports.setCallbackTasksEnable = function(callback)
{
    rrPlayer.callbackTasksEnable = callback;
    exec(rrPlayer.wrapCallbackTasksEnable, null, 'RogerRadioPlayer', 'setCallbackTasksEnable', []);
};

exports.setCallbackTasksDisable = function(callback)
{
    rrPlayer.callbackTasksDisable = callback;
    exec(rrPlayer.wrapCallbackTasksDisable, null, 'RogerRadioPlayer', 'setCallbackTasksDisable', []);
};

exports.clearCachedStreamUrl = function()
{
    exec(null, null, 'RogerRadioPlayer', 'clearCachedStreamUrl', []);
};

exports.playerLoad = function(url)
{
    exec(null, null, 'RogerRadioPlayer', 'playerLoad', [url]);
};

exports.playerReload = function()
{
    exec(null, null, 'RogerRadioPlayer', 'playerReload', []);
};

exports.playerPlay = function()
{
    exec(null, null, 'RogerRadioPlayer', 'playerPlay', []);
};

exports.playerStop = function()
{
    exec(null, null, 'RogerRadioPlayer', 'playerStop', []);
};

exports.playerSetVolume = function(vol)
{
    exec(null, null, 'RogerRadioPlayer', 'playerSetVolume', [vol]);
};

exports.playerUnmute = function()
{
    exec(null, null, 'RogerRadioPlayer', 'playerUnmute', []);
};

exports.playerMute = function()
{
    exec(null, null, 'RogerRadioPlayer', 'playerMute', []);
};

exports.playerExit = function()
{
    exec(null, null, 'RogerRadioPlayer', 'playerExit', []);
};

exports.updateMetadata = function(artist, title)
{
    exec(null, null, 'RogerRadioPlayer', 'updateMetadata', [artist, title]);
};

exports.controlsDestroy = function()
{
    exec(null, null, 'RogerRadioPlayer', 'controlsDestroy', []);
};

exports.controlsSubscribe = function()
{
    exec(null, null, 'RogerRadioPlayer', 'controlsSubscribe', []);
};

exports.controlsCreate = function()
{
    exec(null, null, 'RogerRadioPlayer', 'controlsCreate', []);
};


/**
 * @private
 *
 * Initialize the plugin.
 *
 * Method should be called after the 'deviceready' event
 * but before the event listeners will be called.
 *
 * @return [ Void ]
 */
exports._pluginInitialize = function()
{
    this._isAndroid = device.platform.match(/^android/i) !== null;

};

// Called before 'deviceready' listener will be called
channel.onCordovaReady.subscribe(function()
{
    channel.onCordovaInfoReady.subscribe(function() {
        exports._pluginInitialize();
    });
});

// Called after 'deviceready' event
channel.deviceready.subscribe(function()
{
    exec(null, null, 'RogerRadioPlayer', 'onDeviceReady', []);
});

