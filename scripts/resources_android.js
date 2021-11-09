const fs = require('fs');

const SOURCE_ANDROID_ICON = 'resources/android/icon/';
const SOURCE_ANDROID_RESOURCES = 'resources/android/';
const SOURCE_ANDROID_SPLASH = 'resources/android/splash/';

const TARGET_ANDROID_ICON = 'android/app/src/main/res/';
const TARGET_ANDROID_RESOURCES = 'android/app/src/main/';
const TARGET_ANDROID_SPLASH = 'android/app/src/main/res/';

const ANDROID_ICONS = [
  { source: 'drawable-ldpi-icon.png', target: 'drawable-hdpi-icon.png' },
  { source: 'xxhdpi-foreground.png', target: 'drawable/ic_launcher_foreground.png' },
  { source: 'xxhdpi-background.png', target: 'drawable/ic_launcher_background.png' },
  { source: 'mdpi-foreground.png', target: 'mipmap-mdpi/ic_launcher_foreground.png' },
  { source: 'hdpi-foreground.png', target: 'mipmap-hdpi/ic_launcher_foreground.png' },
  { source: 'xhdpi-foreground.png', target: 'mipmap-xhdpi/ic_launcher_foreground.png' },
  { source: 'xxhdpi-foreground.png', target: 'mipmap-xxhdpi/ic_launcher_foreground.png' },
  { source: 'xxhdpi-foreground.png', target: 'mipmap-xxxhdpi/ic_launcher_foreground.png' },
  { source: 'mdpi-background.png', target: 'mipmap-mdpi/ic_launcher_background.png' },
  { source: 'hdpi-background.png', target: 'mipmap-hdpi/ic_launcher_background.png' },
  { source: 'xhdpi-background.png', target: 'mipmap-xhdpi/ic_launcher_background.png' },
  { source: 'xxhdpi-background.png', target: 'mipmap-xxhdpi/ic_launcher_background.png' },
  { source: 'xxhdpi-background.png', target: 'mipmap-xxxhdpi/ic_launcher_background.png' }
];
const ANDROID_SPLASHES = [
  { source: 'drawable-land-mdpi-screen.png', target: 'drawable/splash.png' }, 
  { source: 'drawable-land-mdpi-screen.png', target: 'drawable-land-mdpi/splash.png' },
  { source: 'drawable-land-hdpi-screen.png', target: 'drawable-land-hdpi/splash.png' },
  { source: 'drawable-land-xhdpi-screen.png', target: 'drawable-land-xhdpi/splash.png' },
  { source: 'drawable-land-xxhdpi-screen.png', target: 'drawable-land-xxhdpi/splash.png' },
  { source: 'drawable-land-xxxhdpi-screen.png', target: 'drawable-land-xxxhdpi/splash.png' },
  { source: 'drawable-port-mdpi-screen.png', target: 'drawable-port-mdpi/splash.png' },
  { source: 'drawable-port-hdpi-screen.png', target: 'drawable-port-hdpi/splash.png' },
  { source: 'drawable-port-xhdpi-screen.png', target: 'drawable-port-xhdpi/splash.png' },
  { source: 'drawable-port-xxhdpi-screen.png', target: 'drawable-port-xxhdpi/splash.png' },
  { source: 'drawable-port-xxxhdpi-screen.png', target: 'drawable-port-xxxhdpi/splash.png' }
];
const ANDROID_RESOURCES = [
  { source: 'icon-transparent.png', target: 'res/drawable/main_logo_transparent.png' },
  { source: 'icon-notification.png', target: 'res/drawable/notification_logo.png' },
  { source: 'AndroidManifest.xml', target: 'AndroidManifest.xml' },
  { source: 'values/ic_launcher.xml', target: 'res/mipmap-anydpi-v26/ic_launcher.xml' },
  { source: 'values/ic_launcher.xml', target: 'res/mipmap-anydpi-v26/ic_launcher_round.xml' },
];
const ANDROID_DELETIONS = [
  'drawable/ic_launcher_background.xml',
  'drawable-v24',
  'values/ic_launcher_background.xml',
];

function deleteFiles(targetPath, files) {
  for (const file of files) {
    let target = targetPath + file;
    fs.rm(target, {recursive: true}, err => {
      if (err) {
        console.log(`Skipped: ${target}`);
      } else {
        console.log(`Deleted: ${target}`);
      }
    });
  }
}


function copyImages(sourcePath, targetPath, images) {
  for (const icon of images) {
    let source = sourcePath + icon.source;
    let target = targetPath + icon.target;
    fs.copyFile(source, target, err => {
      if (err) throw err;
      console.log(`${source} >> ${target}`);
    });
  }
}

copyImages(SOURCE_ANDROID_ICON, TARGET_ANDROID_ICON, ANDROID_ICONS);
copyImages(SOURCE_ANDROID_SPLASH, TARGET_ANDROID_SPLASH, ANDROID_SPLASHES);
copyImages(SOURCE_ANDROID_RESOURCES, TARGET_ANDROID_RESOURCES, ANDROID_RESOURCES);
deleteFiles(TARGET_ANDROID_ICON, ANDROID_DELETIONS);
