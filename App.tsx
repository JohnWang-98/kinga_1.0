// import React, {useEffect, useState} from 'react';
// import {
//   PermissionsAndroid,
//   TouchableOpacity,
//   StyleSheet,
//   Text,
//   View,
//   Vibration,
//   DeviceEventEmitter,
// } from 'react-native';
// import RNCallKeep from 'react-native-callkeep';
// import Sound from 'react-native-sound';
// import BackgroundTimer from 'react-native-background-timer';

// BackgroundTimer.start();

// let voiceRecording = null; // Declare globally
// const callUUID = '1234-abcd'; // Unique call identifier
// const phone = '+1(123)456-7890'; // Display name for the incoming call
// const name = 'Jordan Marshall';

// // Define your CallKeep options
// const options = {
//   ios: {
//     appName: 'Kinga',
//   },
//   android: {
//     alertTitle: 'Permissions Required',
//     alertDescription: 'This app needs access to your phone accounts',
//     cancelButton: 'Cancel',
//     okButton: 'OK',
//     additionalPermissions: [PermissionsAndroid.PERMISSIONS.READ_CONTACTS],
//   },
// };

// async function requestPermissions() {
//   try {
//     const granted = await PermissionsAndroid.requestMultiple([
//       PermissionsAndroid.PERMISSIONS.CALL_PHONE,
//       PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
//       PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
//       PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//     ]);

//     if (
//       granted['android.permission.CALL_PHONE'] ===
//       PermissionsAndroid.RESULTS.GRANTED
//     ) {
//       console.log('CALL_PHONE permission granted');
//     } else {
//       console.log('CALL_PHONE Permission denied');
//     }

//     if (
//       granted['android.permission.READ_PHONE_STATE'] ===
//       PermissionsAndroid.RESULTS.GRANTED
//     ) {
//       console.log('READ_PHONE_STATE permission granted');
//     } else {
//       console.log('READ_PHONE_STATE Permission denied');
//     }

//     if (
//       granted['android.permission.ACCESS_COARSE_LOCATION'] ===
//       PermissionsAndroid.RESULTS.GRANTED
//     ) {
//       console.log('ACCESS_COARSE_LOCATION permission granted');
//     } else {
//       console.log('ACCESS_COARSE_LOCATION Permission denied');
//     }

//     if (
//       granted['android.permission.ACCESS_FINE_LOCATION'] ===
//       PermissionsAndroid.RESULTS.GRANTED
//     ) {
//       console.log('ACCESS_FINE_LOCATION permission granted');
//     } else {
//       console.log('ACCESS_FINE_LOCATION Permission denied');
//     }

//     if (
//       granted['android.permission.READ_CONTACTS'] ===
//       PermissionsAndroid.RESULTS.GRANTED
//     ) {
//       console.log('READ_CONTACTS permission granted');
//     } else {
//       console.log('READ_CONTACTS Permission denied');
//     }

//     if (
//       granted['android.permission.RECORD_AUDIO'] ===
//       PermissionsAndroid.RESULTS.GRANTED
//     ) {
//       console.log('RECORD_AUDIO permission granted');
//     } else {
//       console.log('RECORD_AUDIO Permission denied');
//     }

//     if (
//       granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
//       PermissionsAndroid.RESULTS.GRANTED
//     ) {
//       console.log('READ_EXTERNAL_STORAGE permission granted');
//     } else {
//       console.log('READ_EXTERNAL_STORAGE Permission denied');
//     }

//     if (
//       granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
//       PermissionsAndroid.RESULTS.GRANTED
//     ) {
//       console.log('WRITE_EXTERNAL_STORAGE permission granted');
//     } else {
//       console.log('WRITE_EXTERNAL_STORAGE Permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// }

// RNCallKeep.setup(options);

// function App(): React.JSX.Element {
//   const [isDecoyCallScheduled, setIsDecoyCallScheduled] = useState(false);
//   const [statusText, setStatusText] = useState('');

//   const displayIncomingCallDelayed = () => {
//     BackgroundTimer.setTimeout(() => {
//       RNCallKeep.displayIncomingCall(callUUID, phone, name, false);
//     }, 3000);
//   };

//   const playPreRecordedVoice = () => {
//     if (!voiceRecording) {
//       // Load the audio file
//       voiceRecording = new Sound(
//         'decoy_voice.mp3',
//         Sound.MAIN_BUNDLE,
//         error => {
//           if (error) {
//             console.log(`Error loading sound: ${error.message}`);
//             return;
//           }
//           voiceRecording.setVolume(1.0);
//           voiceRecording.play(success => {
//             if (!success) {
//               console.log('Playback failed due to audio decoding errors');
//             } else {
//               console.log(
//                 `Playback finished playing for call UUID: ${callUUID}`,
//               );
//               RNCallKeep.endCall(callUUID);
//               setStatusText('Call ended.');
//             }
//           });
//         },
//       );
//     } else {
//       voiceRecording.play(success => {
//         if (!success) {
//           console.log('Playback failed due to audio decoding errors');
//         } else {
//           console.log(`Playback finished playing for call UUID: ${callUUID}`);
//           RNCallKeep.endCall(callUUID);
//           setStatusText('Call ended.');
//         }
//       });
//     }
//   };

//   const answerCall = ({callUUID}) => {
//     // Play the recorded voice when the call is accepted
//     console.log(`callUUID = ${callUUID}`);
//     playPreRecordedVoice();

//     // RNCallKeep.startCall(callUUID, phone, name);

//     BackgroundTimer.setTimeout(() => {
//       console.log('Now receiving incoming call');
//       RNCallKeep.setCurrentCallActive(callUUID);
//     }, 1000);
//   };

//   useEffect(() => {
//     // Function to trigger a decoy call
//     const listener = RNCallKeep.addEventListener('answerCall', answerCall);
//     console.log('React Native is ready and listening for widget events.');

//     const subscription = DeviceEventEmitter.addListener(
//       'ButtonClick',
//       button => {
//         console.log(`${button} was clicked!`);
//         // Handle button click event
//       },
//     );

//     return () => {
//       listener.remove();
//       subscription.remove();
//     };
//   }, []);

//   const handleLongPress = () => {
//     // Vibrate the device for 500ms
//     Vibration.vibrate(500);

//     // Show alert that decoy call will arise in 3 seconds
//     setStatusText('Decoy call will arise in 3 seconds');
//     displayIncomingCallDelayed();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>{statusText}</Text>

//       <TouchableOpacity
//         style={styles.button}
//         onLongPress={handleLongPress}
//         delayLongPress={500} // Time (ms) for long press to trigger
//       >
//         <Text style={styles.buttonText}>LongPress to test incoming call</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#2196F3',
//     padding: 15,
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default App;

import React from 'react';
import {Text, View} from 'react-native';

const App = () => {
  return (
    <View>
      <Text>Hello from Kinga!</Text>
    </View>
  );
};

export default App;
