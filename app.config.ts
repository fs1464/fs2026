import { ExpoConfig, ConfigContext } from 'expo/config';

const defineConfig = (_ctx: ConfigContext): ExpoConfig => ({
  name: 'Nearly',
  slug: 'nearly',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  scheme: 'nearly',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#1A1A2E',
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.nearly.app',
    infoPlist: {
      NSLocationWhenInUseUsageDescription:
        'Nearly needs your location to show your neighbourhood content.',
      NSCameraUsageDescription:
        'Nearly needs camera access to take photos for posts and listings.',
      NSPhotoLibraryUsageDescription:
        'Nearly needs photo library access to share images in posts and listings.',
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundColor: '#1A1A2E',
    },
    package: 'com.nearly.app',
    permissions: [
      'ACCESS_FINE_LOCATION',
      'ACCESS_COARSE_LOCATION',
      'CAMERA',
      'READ_EXTERNAL_STORAGE',
      'WRITE_EXTERNAL_STORAGE',
      'RECEIVE_BOOT_COMPLETED',
      'VIBRATE',
    ],
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/favicon.png',
    name: 'Nearly — Your Neighbourhood App',
    shortName: 'Nearly',
    description: 'Discover activities, events, businesses, and connect with people in your neighbourhood. Available in Hindi and English.',
    lang: 'hi',
    themeColor: '#FF6B35',
    backgroundColor: '#FFFFFF',
  },
  plugins: [
    'expo-router',
    'expo-font',
    'expo-secure-store',
    'expo-image',
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission:
          'Nearly needs your location to show local content.',
        isAndroidBackgroundLocationEnabled: false,
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission:
          'Nearly needs photo access to share images in posts.',
        cameraPermission:
          'Nearly needs camera access to take photos.',
      },
    ],
    [
      'expo-notifications',
      {
        icon: './assets/icon.png', // Fallback to icon
        color: '#1A1A2E',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: 'YOUR_EAS_PROJECT_ID',
    },
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  },
});

export default defineConfig;
