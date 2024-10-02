import React, { useContext, useEffect, useState } from 'react';
import * as SplashScreen from 'react-native-bootsplash'; // Use Bootsplash instead of Expo SplashScreen
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

// Import your screens here
import OnboardingScreen from './(getting-started)/onboarding';
import AuthScreen from './(getting-started)/auth';
import TabsScreen from './(tabs)'; // The (tabs) section
import { clearLocalData, getLocalData } from '@/lib/helpers/localStorage';
import { AuthProvider, AuthContext } from '@/contexts/auth';
import {
  StatusBar,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import DefaultSafeAreaView from '@/components/atoms/defaultSaveAreaView/DefaultSafeAreaView';
import Toast from 'react-native-toast-message';
import setupCallKeep from '@/lib/helpers/callKeepSetup';
import CallManager from '@/lib/helpers/callManager';
import LocationManager from '@/lib/helpers/geoLocation';
import { notificationService } from '@/lib/services/fcm';
import requestNotificationPermission from '@/lib/helpers/notificationSetup';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const { state } = useContext(AuthContext);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const { registerCallKeepEventListeners, unregisterCallKeepEventListeners } =
    CallManager();
  const { requestLocationPermission } = LocationManager();

  useEffect(() => {
    // Check if it's the first time launching the app
    const checkFirstLaunch = async () => {
      try {
        // await clearLocalData('isFirstLaunch'); // Clear local data for testing
        const firstLaunch = await getLocalData('isFirstLaunch');
        if (firstLaunch === null) {
          setIsFirstLaunch(true); // First launch is true
        } else {
          setIsFirstLaunch(false); // Not the first launch
        }
      } catch (e) {
        console.error(e);
      }
    };

    // Initialize the notification service to handle notifications
    notificationService.configure();

    // Request notification permission (for iOS)
    messaging()
      .requestPermission()
      .then(authStatus => {
        console.log('Permission status:', authStatus);
      })
      .catch(error => {
        console.error('Permission request error:', error);
      });

    checkFirstLaunch();
  }, []);

  useEffect(() => {
    setupCallKeep();
    requestNotificationPermission();
    registerCallKeepEventListeners();
    requestLocationPermission();

    return () => {
      unregisterCallKeepEventListeners();
    };
  }, []);

  const handleOnboardingComplete = () => {
    setIsFirstLaunch(false);
  };

  if (isFirstLaunch === null || state.isLoading) {
    return (
      <ThemeProvider value={DefaultTheme}>
        <StatusBar barStyle={'default'} backgroundColor="#152e42" />
        <DefaultSafeAreaView
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={80} color="white" />
        </DefaultSafeAreaView>
      </ThemeProvider>
    );
  } else {
    SplashScreen.hide({ fade: true }); // Using react-native-bootsplash hide method
  }

  const initialRouteName = isFirstLaunch
    ? 'Onboarding'
    : true
    ? 'TabsHome'
    : 'Auth';

  return (
    <ThemeProvider value={DefaultTheme}>
      <StatusBar barStyle={'default'} backgroundColor="#152e42" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={initialRouteName}>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            initialParams={{ onComplete: handleOnboardingComplete }}
          />
          <Stack.Screen name="TabsHome" component={TabsScreen} />
          <Stack.Screen name="Auth" component={AuthScreen} />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
};

export default App;
