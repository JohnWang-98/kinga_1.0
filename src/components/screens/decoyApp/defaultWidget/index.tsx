import React, { useEffect, useState, useCallback } from 'react';
import {
  PermissionsAndroid,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Vibration,
  DeviceEventEmitter,
  TouchableWithoutFeedback,
} from 'react-native';
import RNCallKeep from 'react-native-callkeep';
import Sound from 'react-native-sound';
import BackgroundTimer from 'react-native-background-timer';

import IDefaultWidget from './defaultWidget.interface';
import DefaultWidgetLogic from './defaultWidget.logic';
import { Frame } from '@/components/atoms/frame';
import TabsHeader from '@/components/molecules/header/tabs';
import CustomText from '@/components/atoms/customText';
import PhonePulse from '@/assets/icons/phone-pulse';
import Separator from '@/components/atoms/separator';
import Ring from './ring';
import Toast from 'react-native-toast-message';
import { getLocalData } from '@/lib/helpers/localStorage';
import CallManager from '@/lib/helpers/callManager';
import { useFocusEffect } from '@react-navigation/native';
import { CALL_INCOMING_DELAY } from '@env';

const COLOR = '#F02626';
const SIZE = 300;
// Set up bottom tab navigator

export default function DefaultWidget(props: IDefaultWidget) {
  const {} = props;
  const {} = DefaultWidgetLogic();
  const { scheduleIncomingCall, checkRecordFileExists, call911 } =
    CallManager();

  const [contact, setContact] = useState(null);
  // Use useFocusEffect to refresh the UI when the screen is focused
  useFocusEffect(
    useCallback(() => {
      // Logic to refresh UI or fetch new data
      const getContact = async () => {
        const contactSaved = await getLocalData('callerContact');
        setContact(contactSaved);
      };

      getContact();
      // Optionally, return a cleanup function
      return () => {
        console.log('Screen is unfocused');
      };
    }, []),
  );

  const handleLongPress = async () => {
    if (contact === null) {
      Toast.show({
        type: 'error',
        text1: 'No contact selected',
        text2: 'Please select a contact to call',
      });
      return;
    }

    const recordedFileExists = await checkRecordFileExists();
    if (recordedFileExists === false) {
      Toast.show({
        type: 'error',
        text1: 'No recorded file found',
        text2: 'Please record a file before calling',
      });
      return;
    }

    // Vibrate the device for 500ms
    Vibration.vibrate(500);

    scheduleIncomingCall(
      contact.name,
      contact.phone,
      parseInt(CALL_INCOMING_DELAY),
    );
  };

  return (
    <Frame className="px-0">
      <TabsHeader
        avatar
        className="px-frame-padding"
        avatarImage={contact?.profile}
      />
      <Separator />
      <View className="items-center mt-16">
        <CustomText className="font-600 text-6xl">Need a call?</CustomText>
        <TouchableWithoutFeedback onLongPress={handleLongPress}>
          <View
            style={[styles.dot]}
            className="items-center justify-center mt-24">
            {[...Array(4).keys()].map((_, index) => (
              <Ring key={index} index={index} />
            ))}
            <PhonePulse />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Frame>
  );
}

const styles = StyleSheet.create({
  dot: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: COLOR,
  },
});
