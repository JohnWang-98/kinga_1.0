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

export default function DefaultFloatingWidget(props: IDefaultFloatingWidget) {
  const {} = props;
  const {} = DefaultFloatingWidgetLogic();
  const { getLocation } = LocationManager();
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const { scheduleIncomingCall, checkRecordFileExists, call911 } =
    CallManager();

  const handleLocationBroadcast = async () => {
    setIsGettingLocation(true);
    const message = await getLocalData('message');

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

      broadcastLocationRequest(
        message,
        newLocation.latitude,
        newLocation.longitude,
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
