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
    let par_dir = target.substring(0, target.lastIndexOf("/") + 1);
    if (!fs.existsSync(par_dir)){
      fs.mkdirSync(par_dir, { recursive: true });
    }
    fs.copyFile(source, target, err => {
      if (err) throw err;
      console.log(`${source} >> ${target}`);
    });
  }
}


function getBuildString(key, value) {
  return '\n            type.buildConfigField "String", "' + key + '", "\\"' + value + '\\""'
}


function editGradle() {
  let gradleFile = 'android/app/build.gradle';
  const envFile = 'public/env.js';
  const verFile = 'VERSION';
  fs.readFile(gradleFile, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    fs.readFile(verFile, 'utf8', function (err,verData) {
      if (err) {
        return console.log(err);
      }
      fs.readFile(envFile, 'utf8', function (err,eD) {
        var aK = '';
        var wU = '';
        var sUMax = '';
        var sUMed = '';
        var sUTrash = '';
        if (err) {
          return console.log(err);
        }

        for (const line of eD.split("\n")) {
          if (line.startsWith("    radioApiKey:")) {
            const sL = line.split("'")
            aK = sL[1];
          }
          if (line.startsWith("    websocketsUrl:")) {
            const sL = line.split("'")
            wU = sL[1];
          }
          if (line.startsWith("    streamUrlMp3Max:")) {
            const sL = line.split("'")
            sUMax = sL[1];
          }
          if (line.startsWith("    streamUrlMp3Med:")) {
            const sL = line.split("'")
            sUMed = sL[1];
          }
          if (line.startsWith("    streamUrlMp3Trash:")) {
            const sL = line.split("'")
            sUTrash = sL[1];
          }
        }
        const prefixData = "proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'\n        }";
        const suffixData = "\n    }\n}";
        const replaceData = prefixData + suffixData;
        const buildOpen = "\n        android.buildTypes.each { type ->";
        const buildClose = "\n        }";
        const newData = (
          prefixData +
          buildOpen +
          getBuildString("PUB_API_KEY", aK) +
          getBuildString("URL_WS", wU) +
          getBuildString("URL_STREAM_MP3_MAX", sUMax) +
          getBuildString("URL_STREAM_MP3_MED", sUMed) +
          getBuildString("URL_STREAM_MP3_TRASH", sUTrash) +
          buildClose +
          suffixData
        );

        const versionReplaceData = 'versionCode 1\n        versionName "1.0"';
        const newVersionData = `versionCode ${parseInt(verData.replace(new RegExp(/[^\d]*/, 'g'), ''))}\n        versionName "${verData}"`

        var result = data.replace(replaceData, newData).replace(versionReplaceData, newVersionData);

        fs.writeFile(gradleFile, result, 'utf8', function (err) {
           if (err) return console.log(err);
           console.log("Edited build.gradle");
        });
      });
    });
  });
}

copyImages(SOURCE_ANDROID_ICON, TARGET_ANDROID_ICON, ANDROID_ICONS);
copyImages(SOURCE_ANDROID_SPLASH, TARGET_ANDROID_SPLASH, ANDROID_SPLASHES);
copyImages(SOURCE_ANDROID_RESOURCES, TARGET_ANDROID_RESOURCES, ANDROID_RESOURCES);
deleteFiles(TARGET_ANDROID_ICON, ANDROID_DELETIONS);
editGradle();
