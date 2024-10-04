import { View, Image, StyleSheet, Platform, Text } from 'react-native';
import IDecoyCall from './decoyCall.interface';
import DecoyCallLogic from './decoyCall.logic';
import { Frame, ScrollFrame } from '@/components/atoms/frame';
import TabsHeader from '@/components/molecules/header/tabs';
import KingaCard from '@/components/molecules/card/kinga';
import Options from '@/components/molecules/options';
import { decoyCallOptions } from '@/lib/constants';
import Separator from '@/components/atoms/separator';
import { useEffect, useState, useCallback } from 'react';
import { getLocalData } from '@/lib/helpers/localStorage';
import { useFocusEffect } from '@react-navigation/native';
import DefaultSafeAreaView from '../../../atoms/defaultSaveAreaView/DefaultSafeAreaView';
import RNFS from 'react-native-fs'; // File system for reading files

export default function DecoyCall(props: IDecoyCall) {
  const {} = props;
  const { handleNavigate } = DecoyCallLogic();
  const [contactPhoto, setContactPhoto] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);

  // Set a default image in case contact is null
  const [selectedContact, setSelectedContact] = useState({
    profile: require('../../../../assets/images/caller_id.png'),
  });

  const getElapsedTime = async () => {
    const recordedTime = await getLocalData('elapsedTime');

    if (recordedTime !== undefined && recordedTime !== null)
      setElapsedTime(recordedTime);
  };

  const getContact = async () => {
    try {
      const contact = await getLocalData('callerContact');

      // If contact exists, update state; otherwise, keep the default image
      if (contact) {
        setSelectedContact(contact);
        console.log('selected contact profile', contact.profile);
        if (
          Platform.OS === 'android' &&
          contact?.profile?.uri?.startsWith('content://')
        ) {
          // Read content:// URI for Android
          RNFS.readFile(contact?.profile?.uri, 'base64')
            .then(data => {
              // Prepend base64 encoding type
              setContactPhoto(`data:image/jpeg;base64, ${data}`);
            })
            .catch(err => {
              console.error('Error reading file:', err);
            });
        } else {
          // iOS or regular file path
          setContactPhoto(
            contact?.profile?.uri ||
              require('../../../../assets/images/caller_id.png'),
          );
        }
      } else {
        // Log or handle the case where contact is null
        console.log('No contact found, using default profile image.');
      }
    } catch (error) {
      console.error('Error fetching contact:', error);
    }
  };

  // Use useFocusEffect to refresh the UI when the screen is focused
  useFocusEffect(
    useCallback(() => {
      // Logic to refresh UI or fetch new data
      getContact();
      getElapsedTime();

      // Optionally, return a cleanup function
      return () => {
        console.log('Screen is unfocused');
      };
    }, []),
  );

  return (
    <DefaultSafeAreaView>
      <ScrollFrame>
        <TabsHeader label="Decoy Call" />
        <Frame>
          <Separator />
          <View>
            <KingaCard
              title={selectedContact.name || 'No contact selected'}
              subtitle="Create a new caller or pick from your contacts"
              arrow
              onPress={handleNavigate}
              children={
                <Image source={selectedContact.profile} className="w-7 h-7" />
              }
            />
            <Separator />

            <Options
              options={decoyCallOptions}
              recordTime={elapsedTime ? String(elapsedTime) : '00:00'}
            />
          </View>
        </Frame>
      </ScrollFrame>
    </DefaultSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#152e42',
  },
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1, // Ensure it renders above the tab bar
  },
});
