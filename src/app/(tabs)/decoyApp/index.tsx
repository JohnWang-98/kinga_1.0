import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DecoyAppScreen from './decoyApp';
import ControlsScreen from './controls'; // Adjust these paths
import ControlOptionsScreen from './controlOptions'; // Adjust these paths
import MusicAppScreen from './musicApp';

const Stack = createNativeStackNavigator();
export default function DecoyAppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="DecoyApp"
      screenOptions={{ headerShown: false }}>
      {/* Define the screens in the stack */}
      <Stack.Screen name="DecoyApp" component={DecoyAppScreen} />
      <Stack.Screen name="MusicApp" component={MusicAppScreen} />
      <Stack.Screen name="Controls" component={ControlsScreen} />
      <Stack.Screen name="ControlOptions" component={ControlOptionsScreen} />
    </Stack.Navigator>
  );
}
