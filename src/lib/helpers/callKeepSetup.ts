import RNCallKeep from 'react-native-callkeep';
import { PermissionsAndroid } from 'react-native';

// Define your CallKeep options
const options = {
  ios: {
    appName: 'Kinga',
  },
  android: {
    alertTitle: 'Permissions Required',
    alertDescription:
      'This app needs access to your phone accounts and notifications',
    cancelButton: 'Cancel',
    okButton: 'OK',
    additionalPermissions: [
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS, // Permission for push notifications (Android 13+)
    ],
  },
};

const setupCallKeep = () => {
  RNCallKeep.setup(options)
    .then(accepted => {
      console.log('CallKeep setup accepted:', accepted);
      RNCallKeep.setAvailable(true);
    })
    .catch(console.error);
};

export default setupCallKeep;
