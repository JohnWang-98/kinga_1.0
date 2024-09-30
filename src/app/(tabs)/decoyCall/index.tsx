import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AdvancedScreen from './advanced';
import CallerIdScreen from './callerId';
import ChooseFromContactsScreen from './chooseFromContacts';
import ConversationsScreen from './conversations';
import DisplaySettingsScreen from './displaySettings';
import RingSettingsScreen from './ringSettings';
import DecoyCallScreen from './decoyCall';
import RecordVoiceScreen from './recordVoice';

const Stack = createNativeStackNavigator();

export default function DecoyCallNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Define the screens in the stack */}
      <Stack.Screen name="DecoyCall" component={DecoyCallScreen} />
      <Stack.Screen
        name="ChooseFromContacts"
        component={ChooseFromContactsScreen}
      />
      <Stack.Screen name="RecordVoice" component={RecordVoiceScreen} />
    </Stack.Navigator>
  );
}
