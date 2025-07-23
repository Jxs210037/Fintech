// app.config.js
import 'dotenv/config';

export default {
  name: 'fintech',
  slug: 'fintech',
  version: '1.0.0',
  scheme: 'fintech',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.com.anonymous.fintech',
  },
  android: {
    package: 'com.com.anonymous.fintech',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    bundler: 'metro',
    output: 'server',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    [
      'expo-router',
      {
        origin: 'https://your-fintech-app.com',
      },
    ],
    'expo-secure-store',
    [
      'expo-local-authentication',
      {
        faceIDPermission: 'Allow $(PRODUCT_NAME) to use Face ID.',
      },
    ],
    [
      'expo-dynamic-app-icon',
      {
        default: {
          image: './assets/images/icon.png',
          prerendered: true,
        },
        dark: {
          image: './assets/images/icon-dark.png',
          prerendered: true,
        },
        vivid: {
          image: './assets/images/icon-vivid.png',
          prerendered: true,
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    // 🔑 Add your API keys here
    coinApiKey: process.env.COIN_API_KEY || '',
    NEWS_API_KEY: process.env.NEWS_API_KEY || '', // 👈 Put your News API key in a `.env` file with: NEWS_API_KEY=your_key
  },
};
