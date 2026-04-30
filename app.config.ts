import { ExpoConfig, ConfigContext } from 'expo/config';

const defineConfig = (_ctx: ConfigContext): ExpoConfig => ({
  name: 'Nearly',
  slug: 'nearly',
  version: '1.0.0',
  orientation: 'portrait',
  scheme: 'nearly',
  userInterfaceStyle: 'light',
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
    name: 'Nearly — Your Neighbourhood App',
    shortName: 'Nearly',
    description: 'Discover activities, events, businesses, and connect with people in your neighbourhood.',
    lang: 'en',
    themeColor: '#f97316',
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
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  },
});

export default defineConfig;
