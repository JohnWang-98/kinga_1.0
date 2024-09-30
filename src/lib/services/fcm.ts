import messaging from '@react-native-firebase/messaging';
import { saveFcmTokenRequest } from '@/lib/services/profile'; // Import the sendFcmToken function
import PushNotification from 'react-native-push-notification'; // Import PushNotification

class NotificationService {
  configure() {
    // Create notification channel for Android
    PushNotification.createChannel(
      {
        channelId: 'kinga-channel-id',
        channelName: 'Kinga Channel',
        importance: 4, // High priority
        vibrate: true,
      },
      created => console.log(`Notification channel '${created}' created`),
    );

    // Handle background and foreground notifications
    messaging().onMessage(async remoteMessage => {
      console.log('Foreground message received:', remoteMessage);

      PushNotification.localNotification({
        channelId: 'kinga-channel-id',
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
        playSound: true,
        soundName: 'default',
        vibrate: true, // Enable vibration
        vibration: 300, // Vibration duration in ms
        largeIcon: 'ic_launcher', // Optional large icon
        smallIcon: 'ic_notification', // Required small icon for Android
      });
    });

    // Handle notifications when app is opened from background state
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background:',
        remoteMessage.notification,
      );
      // You can navigate to a specific screen if needed
      this.navigateFromNotification(remoteMessage.data);
    });

    // Handle notifications when app is opened from a killed state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from killed state:',
            remoteMessage.notification,
          );
          this.navigateFromNotification(remoteMessage.data);
        }
      });

    // Background message handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background message handled:', remoteMessage);

      // You can process data here in the background, for example, update a local database
      if (remoteMessage.data) {
        // Process data (like saving to storage or updating background tasks)
        console.log('Background message data:', remoteMessage.data);
      }

      // You can trigger a local notification as well:
      PushNotification.localNotification({
        channelId: 'kinga-channel-id',
        title: remoteMessage.notification?.title || 'Kinga Notification',
        message:
          remoteMessage.notification?.body ||
          'This notification was handled in the background!',
        vibrate: true, // Enable vibration
        vibration: 300, // Vibration duration in ms
        largeIcon: 'ic_launcher', // Optional large icon
        smallIcon: 'ic_notification', // Required small icon for Android
      });
    });
  }

  // Example function to handle navigation
  navigateFromNotification(data) {
    if (data && data.screen) {
      // Example: Navigate based on custom data in notification payload
      console.log('Navigating to:', data.screen);
      // Here, add your navigation logic, like `navigation.navigate(data.screen)`
    }
  }
}

// Get the device token
async function getTokenAndSendToServer() {
  const token = await messaging().getToken();
  console.log('FCM Token:', token);

  const res = await saveFcmTokenRequest(token);
  if (res.success) {
    console.log('FCM Token saved successfully:', res.data);

    return true;
  } else {
    console.error('Failed to save FCM Token:', res.data);
  }

  return false;
}

const notificationService = new NotificationService();

export { notificationService, getTokenAndSendToServer };
