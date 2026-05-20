
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { store } from '../store'
import { Provider } from 'react-redux'

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEffect, useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import auth from '../services/firebase-auth';


SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  // const [loading, setLoading] = useState<boolean>(true);
  // const [user, setUser] = useState<any | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);


  const [loaded, error] = useFonts({
    'CinzelDecorative-Bold': require('../assets/fonts/Cinzel_Decorative/CinzelDecorative-Bold.ttf'),
    'CinzelDecorative-Regular': require('../assets/fonts/Cinzel_Decorative/CinzelDecorative-Regular.ttf'),
    'CinzelDecorative-Black': require('../assets/fonts/Cinzel_Decorative/CinzelDecorative-Black.ttf'),
    'Creepster': require('../assets/fonts/Creepster/Creepster-Regular.ttf'),
    'Oswald-Regular': require('../assets/fonts/Oswald/Oswald-Regular.ttf'),
    'Oswald-Bold': require('../assets/fonts/Oswald/Oswald-Bold.ttf'),
    'Oswald-SemiBold': require('../assets/fonts/Oswald/Oswald-SemiBold.ttf'),
    'Oswald-Light': require('../assets/fonts/Oswald/Oswald-Light.ttf'),
    'Oswald-Medium': require('../assets/fonts/Oswald/Oswald-Medium.ttf'),
    'Oswald-ExtraLight': require('../assets/fonts/Oswald/Oswald-ExtraLight.ttf'),
    'Rajdhani': require('../assets/fonts/Rajdhani/Rajdhani-Regular.ttf'),
    'Rajdhani-Bold': require('../assets/fonts/Rajdhani/Rajdhani-Bold.ttf'),
    'Rajdhani-SemiBold': require('../assets/fonts/Rajdhani/Rajdhani-SemiBold.ttf'),
    'Rajdhani-Medium': require('../assets/fonts/Rajdhani/Rajdhani-Medium.ttf'),
    'Rajdhani-Light': require('../assets/fonts/Rajdhani/Rajdhani-Light.ttf'),
    'Rajdhani-Regular': require('../assets/fonts/Rajdhani/Rajdhani-Regular.ttf'),
    'SpecialElite': require('../assets/fonts/Special_Elite/SpecialElite-Regular.ttf')
  });

  const colorScheme = useColorScheme();
  const router = useRouter();


  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user_ => {
      // console.log("./app/_layout.tsx - useEffect - onAuthStateChanged", user_);

      if (user_ && user_.uid) {
        setIsLoggedIn(true);
        router.navigate({
          pathname: '/(tabs)/[uid]',
          params: { uid: user_.uid }
        });
      } else {
        setIsLoggedIn(false);
      }
    });
    return unsub;
  }, []);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{
            title: 'Connexion',
            headerStyle: {
              backgroundColor: Colors.dark.background,
              borderBottomColor: '#bd811e',
            },
            headerTintColor: '#bd811e',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShadowVisible: false,
            presentation: 'transparentModal',
            animation: "slide_from_left"
          }} />
        </Stack.Protected>
        <Stack.Screen name="modal" options={{ title: 'Modal' }} />
        <Stack.Screen name="map-modal" options={{ title: 'Modal2' }} />

      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </Provider>
    
  );
}
