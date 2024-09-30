import LocationBroadcastScreen from './locationBroadcast';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddTextScreen from './addText';
import CustomizeTextScreen from './customizeText';
import SelectContactsScreen from './selectContacts';
import ReceivedTextScreen from './receivedText';
import LocationMessageViewScreen from './locationMessageView';

const Stack = createNativeStackNavigator();

export default function LocationBroadcastNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Define the screens in the stack */}
      <Stack.Screen
        name="LocationBroadcast"
        component={LocationBroadcastScreen}
      />
      <Stack.Screen name="AddText" component={AddTextScreen} />
      <Stack.Screen name="CustomizeText" component={CustomizeTextScreen} />
      <Stack.Screen name="SelectContacts" component={SelectContactsScreen} />
      <Stack.Screen name="ReceivedText" component={ReceivedTextScreen} />
      <Stack.Screen
        name="LocationMessage"
        component={LocationMessageViewScreen}
      />
    </Stack.Navigator>
  );
}
