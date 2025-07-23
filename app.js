import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ClerkProvider } from '@clerk/clerk-expo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useColorScheme } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Slot } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const CLERK_PUBLISHABLE_KEY = 'YOUR_CLERK_PUBLISHABLE_KEY';

export default function App() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceGroteskBold: require('./assets/fonts/SpaceGrotesk-Bold.ttf'),
    TimesNewRoman: require('./assets/fonts/TimesNewRoman.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={SecureStore}
    >
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <Slot />
        </SafeAreaProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}