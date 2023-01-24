var exec    = require('cordova/exec'),
    channel = require('cordova/channel');

/**
 * @private
 *
 * Flag indicates if the mode is active.
 */
var rrPlayer = {
    callbackStopped: function() {},
    callbackAlertsEnable: function() {},
    callbackAlertsDisable: function() {},
    wrapCallbackStopped: function() {
        rrPlayer.callbackStopped();
        exec(rrPlayer.wrapCallbackStopped, null, 'RogerRadioPlayer', 'setCallbackStopped', []);
    },
    wrapCallbackAlertsEnable: function() {
        rrPlayer.callbackAlertsEnable();
        exec(rrPlayer.wrapCallbackAlertsEnable, null, 'RogerRadioPlayer', 'setCallbackAlertsEnable', []);
    },
    wrapCallbackAlertsDisable: function() {
        rrPlayer.callbackAlertsDisable();
        exec(rrPlayer.wrapCallbackAlertsDisable, null, 'RogerRadioPlayer', 'setCallbackAlertsDisable', []);
    }
};

exports.setCallbackStopped = function(callback)
{
    rrPlayer.callbackStopped = callback;
    exec(rrPlayer.wrapCallbackStopped, null, 'RogerRadioPlayer', 'setCallbackStopped', []);
};

exports.setCallbackAlertsEnable = function(callback)
{
    rrPlayer.callbackAlertsEnable = callback;
    exec(rrPlayer.wrapCallbackAlertsEnable, null, 'RogerRadioPlayer', 'setCallbackAlertsEnable', []);
};

exports.setCallbackAlertsDisable = function(callback)
{
    rrPlayer.callbackAlertsDisable = callback;
    exec(rrPlayer.wrapCallbackAlertsDisable, null, 'RogerRadioPlayer', 'setCallbackAlertsDisable', []);
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

