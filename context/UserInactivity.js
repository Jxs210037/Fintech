import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({
  id: 'inactivity-storage',
});

export const UserInactivityProvider = ({ children }) => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();

  // TEMP: Assume user is signed in (replace with real check later)
  const isSignedIn = true;

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, []);

  const handleAppStateChange = (nextAppState) => {
    console.log('🚀 App state changed to:', nextAppState);

    if (nextAppState === 'background') {
      storage.set('startTime', Date.now());
    } else if (
      nextAppState === 'active' &&
      appState.current &&
      appState.current.match(/background/)
    ) {
      const startTime = storage.getNumber('startTime') || 0;
      const elapsed = Date.now() - startTime;

      console.log('⏱ Time elapsed while inactive:', elapsed);

      if (elapsed > 3000 && isSignedIn) {
        router.replace('/(authenticated)/(modals)/lock');
      }
    }

    appState.current = nextAppState;
  };

  return children;
};
