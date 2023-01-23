
/** @class */
function CordovaPluginRogerradioAuto() {
  return this;
}

CordovaPluginRogerradioAuto.prototype.setMediaItems = function(mediaItems) {
  var options = JSON.stringify(mediaItems);
  cordova.exec(function(){}, function(){}, 'CordovaAndroidAutoPlugin', 'setMediaItems', [options]);
}


// Installation constructor that binds the plugin to window
CordovaPluginRogerradioAuto.install = function() {
  if (!window.plugins) {
    window.plugins = {};
  }
  window.plugins.rogerradioAuto = new CordovaPluginRogerradioAuto();
  return window.plugins.rogerradioAuto;
};
cordova.addConstructor(CordovaPluginRogerradioAuto.install);

