import { useEffect, useRef, useState } from 'react';
import { Animated, BackHandler, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useToggleSwitchStore from '@/lib/store/toggleSwitch';
import { DecoyCallIcon, DecoyCallIconFocus } from '@/assets/icons/decoy-call';
import { DecoyAppIcon, DecoyAppIconFocus } from '@/assets/icons/decoyApp';
import { HomeIcon, HomeIconFocus } from '@/assets/icons/home';
import {
  LocationBroadcastFocus,
  LocationBroadcastIcon,
} from '@/assets/icons/location-broadcast';
import { SettingsIcon, SettingsIconFocus } from '@/assets/icons/settings';

// Import your screen components (assuming you have these defined)
import LocationBroadcastNavigator from './locationBroadcast';
import DecoyAppNavigator from './decoyApp';
import DecoyCallNavigator from './decoyCall';
import SettingsNavigator from './settings';
import HomeScreen from './home';

import { Colors } from '@/lib/colors';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation
import { getLocalData } from '@/lib/helpers/localStorage';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

// Set up bottom tab navigator
const Tab = createBottomTabNavigator();

export default function TabsScreen() {
  const navigation = useNavigation(); // Initialize the navigation hook
  const isMusicAppVisible = useToggleSwitchStore(state => state.isSwitchOn);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [pushnotify, setPushNotify] = useState(false);
  const [newMessageCount, setNewMessageCount] = useState(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isMusicAppVisible ? 0 : 1,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }, [isMusicAppVisible]);

  useEffect(() => {
    const onBackPress = () => {
      BackHandler.exitApp();
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerShown: false,
        tabBarShowLabel: false,

        tabBarBadgeStyle: {
          backgroundColor: 'red', // Customize the badge color
          color: 'white', // Customize the badge text color
        },

        tabBarStyle: {
          paddingBottom: 10,
          height: 45,
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
          borderTopColor: Colors.primary,
          backgroundColor: 'transparent',
          marginTop: 0,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarBackground: () => (
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: fadeAnim,
            }}
          />
        ),
      }}>
      <Tab.Screen
        name="LocationBroadcastNavigator"
        component={LocationBroadcastNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View style={{ opacity: fadeAnim }}>
              {focused ? <LocationBroadcastFocus /> : <LocationBroadcastIcon />}
            </Animated.View>
          ),
          tabBarBadge: newMessageCount > 0 ? newMessageCount : null,
        }}
      />
      <Tab.Screen
        name="DecoyAppNavigator"
        component={DecoyAppNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View style={{ opacity: fadeAnim }}>
              {focused ? <DecoyAppIconFocus /> : <DecoyAppIcon />}
            </Animated.View>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View style={{ opacity: fadeAnim }}>
              {focused ? <HomeIconFocus /> : <HomeIcon />}
            </Animated.View>
          ),
        }}
      />
      <Tab.Screen
        name="DecoyCallNavigator"
        component={DecoyCallNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View style={{ opacity: fadeAnim }}>
              {focused ? <DecoyCallIconFocus /> : <DecoyCallIcon />}
            </Animated.View>
          ),
        }}
      />
      <Tab.Screen
        name="SettingsNavigator"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View style={{ opacity: fadeAnim }}>
              {focused ? <SettingsIconFocus /> : <SettingsIcon />}
            </Animated.View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
