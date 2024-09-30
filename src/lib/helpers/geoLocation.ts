import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { useState } from 'react';

//  Request location permission (Android)
export default function LocationManager() {
  const [location, setLocation] = useState(null);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs to access your location to broadcast it.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          return true;
        } else {
          console.log('Location permission denied');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // Get the current location
  const getLocation = onGetLocation => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('Position:', position);
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        onGetLocation({ latitude, longitude });
      },
      error => {
        // Handle error case
        console.log('Error getting location', error);
        Toast.show({
          type: 'error',
          text1: 'Error getting location',
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  return {
    location,
    setLocation,
    getLocation,
    requestLocationPermission,
  };
}
