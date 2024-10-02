import IDefaultFloatingWidget from './defaultFloatingWidget.interface';
import DefaultFloatingWidgetLogic from './defaultFloatingWidget.logic';
import Toast from 'react-native-toast-message';
import { getLocalData } from '@/lib/helpers/localStorage';
import CallManager from '@/lib/helpers/callManager';
import Separator from '@/components/atoms/separator';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import LocationManager from '@/lib/helpers/geoLocation';
import { useState } from 'react';
import { broadcastLocationRequest } from '@/lib/services/locationBroadcast';
import axios from 'axios';

export default function DefaultFloatingWidget(props: IDefaultFloatingWidget) {
  const {} = props;
  const {} = DefaultFloatingWidgetLogic();
  const { getLocation } = LocationManager();
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const { scheduleIncomingCall, checkRecordFileExists, call911 } =
    CallManager();

  const getSavedPhoneNumbers = async () => {
    try {
      // Get the saved contacts from AsyncStorage
      const savedContacts = await getLocalData('savedContacts');
      // console.log('savedContacts:', savedContacts);
      // Check if savedContacts is not null
      if (savedContacts !== null) {
        // Parse the saved contacts and map to extract phone numbers
        const contactsArray = JSON.parse(savedContacts);
        const phoneNumbers = contactsArray.map(contact =>
          contact.phone.replace(/\D/g, ''),
        );

        console.log('Saved phone numbers:', phoneNumbers);
        return phoneNumbers;
      } else {
        console.log('No saved contacts found');
        return [];
      }
    } catch (error) {
      console.error('Error retrieving saved phone numbers:', error);
      return [];
    }
  };
  const broadcastLocationRequest = async (
    message,
    latitude,
    longitude,
    phoneNumbers,
    fullName,
    fcmToken,
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/user/notifications/sendBroadcast`,
        {
          message,
          latitude,
          longitude,
          phoneNumbers,
          fullName,
          fcmToken, // Send an array of phone numbers
        },
      );

      return response.data; // Return the response data to handle success/failure
    } catch (error) {
      console.error(
        'Error broadcasting location:',
        error.response ? error.response.data : error.message,
      );
      return { success: false }; // Return failure if an error occurs
    }
  };
  const handleLocationBroadcast = async () => {
    setIsGettingLocation(true);
    const message = await getLocalData('message');
    const phoneNumber = await getLocalData('phoneNumber');
    const savedPhoneNumbers = await getSavedPhoneNumbers();
    const fullName = await getLocalData('full_name');
    const fcmToken = await getLocalData('fcmToken');
    if (message === null) {
      Toast.show({
        type: 'error',
        text1: 'No message set',
        text2: 'Please set a message to broadcast',
      });
      setIsGettingLocation(false);
      return;
    }

    getLocation(newLocation => {
      setIsGettingLocation(false);

      if (newLocation === null) {
        Toast.show({
          type: 'error',
          text1: 'Error getting location',
          text2: 'Please try again',
        });
        return;
      }

      if (phoneNumber) {
        if (savedPhoneNumbers) {
          broadcastLocationRequest(
            message,
            newLocation.latitude,
            newLocation.longitude,
            savedPhoneNumbers,
            fullName,
            fcmToken,
          ).then(res => {
            if (res.success) {
              Toast.show({
                type: 'success',
                text1: 'Location broadcasted',
                text2: 'Your location has been broadcasted successfully',
              });
            } else {
              Toast.show({
                type: 'error',
                text1: 'Error broadcasting location',
                text2: 'Please try again',
              });
            }
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'No contacts selected',
            text2: 'Please select contacts to broadcast',
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'No phone number set',
          text2: 'Please set a phone number to broadcast',
        });
      }
    });
  };

  const handleEmergencyCall = async () => {
    call911();
  };

  const handleDecoyCall = async () => {
    const contact = await getLocalData('callerContact');

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
    scheduleIncomingCall(contact.name, contact.phone, 3);
  };

  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity
        style={[styles.iconButton, styles.locationIcon]}
        onPress={handleLocationBroadcast}>
        {isGettingLocation ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <MaterialCommunityIcons
            name="map-marker-radius"
            color={'white'}
            size={24}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.iconButton, styles.alertIcon]}
        onPress={handleEmergencyCall}>
        <MaterialCommunityIcons
          name="car-emergency"
          color={'white'}
          size={24}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.iconButton, styles.phoneIcon]}
        onPress={handleDecoyCall}>
        <Feather name="phone-call" color={'white'} size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#152e42',
  },
  iconContainer: {
    flexDirection: 'row', // Align icons in a row
    justifyContent: 'space-around', // Spread icons evenly
    paddingVertical: 20, // Padding for the row
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Transparent black background
    borderRadius: 20, // Rounded corner
    marginBottom: 30,
  },
  iconButton: {
    width: 60, // Button size
    height: 60,
    borderRadius: 30, // Circular shape
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationIcon: {
    backgroundColor: '#6363db', // Purple background for the location icon
  },
  alertIcon: {
    backgroundColor: '#d72638', // Red background for the emergency/alert icon
  },
  phoneIcon: {
    backgroundColor: '#fc6ab5', // Pink background for the phone icon
  },
});
