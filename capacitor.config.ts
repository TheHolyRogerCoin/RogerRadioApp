import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.theholyroger.rogerradio',
  appName: 'RogerRadio',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    }
  },
  ios: {
    contentInset: "always"
  },
  server: {
    hostname: "rogerradio.app.local",
    androidScheme: "https"
  },
  cordova: {
    preferences: {
      Hostname: "rogerradio.app.local"
    }
  },
};

export default config;