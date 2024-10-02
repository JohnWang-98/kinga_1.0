import { Platform, PermissionsAndroid, Alert } from 'react-native';

const requestNotificationPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: 'Notification Permission',
        message: 'This app requires access to send notifications.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Notification permission granted.');
      // You can now enable notifications
      // await messaging().registerDeviceForRemoteMessages(); // Register the device for FCM
      // const token = await messaging().getToken(); // Get the FCM token
      // console.log('FCM Token:', token);
    } else {
      console.log('Notification permission denied.');
      Alert.alert(
        'Permission denied',
        'You need to allow notifications in the app settings.',
      );
    }
  } else {
    // Android version is below 13, no need to request permissions
    console.log(
      'Notification permission is granted by default for Android versions below 13.',
    );
  }
};

export default requestNotificationPermission;
