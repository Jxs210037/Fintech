import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserInactivityProvider } from '@/context/UserInactivity';

const queryClient = new QueryClient();

export { ErrorBoundary } from 'expo-router';

// Prevent splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

export default function LayoutWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserInactivityProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <InitialLayout />
        </GestureHandlerRootView>
      </UserInactivityProvider>
    </QueryClientProvider>
  );
}

function InitialLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Simulate a check (can replace with Firebase auth check later)
    const load = async () => {
      await SplashScreen.hideAsync();
      setAppReady(true);
    };
    load();
  }, []);

  useEffect(() => {
    if (!appReady) return;

    // Example redirect logic (update when Firebase is integrated)
    const inAuthGroup = segments[0] === '(authenticated)';
    const fakeSignedIn = false;

    if (fakeSignedIn && !inAuthGroup) {
      router.replace('/(authenticated)/(tabs)/myAccount');
    } else if (!fakeSignedIn) {
      router.replace('/');
    }
  }, [appReady]);

  if (!appReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />

        <Stack.Screen
          name="signup"
          options={{
            title: '',
            headerBackTitle: '',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: Colors.background },
            headerLeft: () => (
              <TouchableOpacity onPress={router.back}>
                <Ionicons name="arrow-back" size={34} color={Colors.dark} />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="login"
          options={{
            title: '',
            headerBackTitle: '',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: Colors.background },
            headerLeft: () => (
              <TouchableOpacity onPress={router.back}>
                <Ionicons name="arrow-back" size={34} color={Colors.dark} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <Link href="/help" asChild>
                <TouchableOpacity>
                  <Ionicons name="help-circle-outline" size={34} color={Colors.dark} />
                </TouchableOpacity>
              </Link>
            ),
          }}
        />

        <Stack.Screen name="help" options={{ title: 'Help', presentation: 'modal' }} />

        <Stack.Screen
          name="verify/[phone]"
          options={{
            title: '',
            headerBackTitle: '',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: Colors.background },
            headerLeft: () => (
              <TouchableOpacity onPress={router.back}>
                <Ionicons name="arrow-back" size={34} color={Colors.dark} />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen name="(authenticated)/(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name="(authenticated)/HomeScreen/[id]"
          options={{
            title: '',
            headerLeft: () => (
              <TouchableOpacity onPress={router.back}>
                <Ionicons name="arrow-back" size={34} color={Colors.dark} />
              </TouchableOpacity>
            ),
            headerLargeTitle: true,
            headerTransparent: true,
            headerRight: () => (
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity>
                  <Ionicons name="notifications-outline" color={Colors.dark} size={30} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="star-outline" color={Colors.dark} size={30} />
                </TouchableOpacity>
              </View>
            ),
          }}
        />

        <Stack.Screen
          name="(authenticated)/(modals)/lock"
          options={{ headerShown: false, animation: 'none' }}
        />

        <Stack.Screen
          name="(authenticated)/(modals)/account"
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
            title: '',
            headerTransparent: true,
            headerLeft: () => (
              <TouchableOpacity onPress={router.back}>
                <Ionicons name="close-outline" size={34} color="#fff" />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
