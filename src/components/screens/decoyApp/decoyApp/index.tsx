import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { LocationBroadcastIcon } from '@/assets/icons/location-broadcast';
import { SettingsIcon } from '@/assets/icons/settings';
import PhoneIcon from '@/assets/icons/phone';
import CustomText from '@/components/atoms/customText';
import DecoyAppLogic from './decoyApp.logic';
import TabsHeader from '@/components/molecules/header/tabs';
import DecoyAppCard from '@/components/molecules/card/decoyApp';
import { apps } from '@/lib/constants';
import Separator from '@/components/atoms/separator';
import { ScrollFrame } from '@/components/atoms/frame';
import { useNavigation } from '@react-navigation/native';
import { broadcastLocationRequest } from '@/lib/services/locationBroadcast';
import Geolocation from '@react-native-community/geolocation';
import { Alert } from 'react-native';
import { SafeAreaView, Platform, PermissionsAndroid } from 'react-native';
import DefaultSafeAreaView from '../../../atoms/defaultSaveAreaView/DefaultSafeAreaView';
import DefaultFloatingWidget from '../defaultFloatingWidget';
import { getLocalData, saveLocalData } from '@/lib/helpers/localStorage';

export default function DecoyApp(props) {
  const {} = props;
  const { setSelectedOption, selectedOption } = DecoyAppLogic();
  const [showWidget, setShowWidget] = useState(false);
  const navigation = useNavigation(); // Initialize the navigation hook

  useEffect(() => {
    const getSelectedApp = async () => {
      const selectedApp = await getLocalData('selectedApp');
      console.log('Selected App', selectedApp);
      if (selectedApp !== null) {
        setSelectedOption(selectedApp);
      }
    };

    getSelectedApp();
  }, []);

  const handleSelectApp = async index => {
    await saveLocalData('selectedApp', index);
    setSelectedOption(index);
  };

  // Request location permission (Android)
  // const requestLocationPermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //         {
  //           title: 'Location Permission',
  //           message: 'This app needs to access your location to broadcast it.',
  //           buttonNeutral: 'Ask Me Later',
  //           buttonNegative: 'Cancel',
  //           buttonPositive: 'OK',
  //         },
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('Location permission granted');
  //         return true;
  //       } else {
  //         console.log('Location permission denied');
  //         return false;
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  // Handle location broadcast when the button is clicked
  // const handleBroadcastLocation = async () => {
  //   try {
  //     // Request location permissions (for Android)
  //     const hasPermission = await requestLocationPermission();
  //     if (!hasPermission) return;

  //     // Get current location
  //     Geolocation.getCurrentPosition(
  //       async position => {
  //         const { latitude, longitude } = position.coords;
  //         console.log(`Broadcasting location: ${latitude}, ${longitude}`);

  //         // Send location to backend using the provided `broadcastLocationRequest` function
  //         await broadcastLocationRequest(latitude, longitude);

  //         Alert.alert('Success', 'Location broadcasted successfully!');
  //       },
  //       error => {
  //         console.error('Error getting location:', error);
  //         Alert.alert('Error', 'Unable to fetch location.');
  //       },
  //       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
  //     );
  //   } catch (error) {
  //     console.error('Error broadcasting location:', error);
  //     Alert.alert('Error', 'Failed to broadcast location.');
  //   }
  // };

  return (
    <DefaultSafeAreaView>
      <ScrollFrame>
        <TabsHeader label="Decoy App" />
        <Separator />
        {selectedOption == 0 && <DefaultFloatingWidget />}
        {apps.map((data, index) => (
          <DecoyAppCard
            key={index}
            data={data}
            selectedOption={selectedOption}
            setSelectedOption={handleSelectApp}
          />
        ))}
      </ScrollFrame>
    </DefaultSafeAreaView>
  );
}
