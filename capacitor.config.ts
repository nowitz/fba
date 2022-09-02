import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tommylabs.portalzcu',
  appName: 'Student ZČU',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchAutoHide: false
    },
  },
  ios: {
    limitsNavigationsToAppBoundDomains: true
  }
};

export default config;
