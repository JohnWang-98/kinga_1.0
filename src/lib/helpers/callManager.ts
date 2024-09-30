import RNCallKeep from 'react-native-callkeep';
import uuid from 'react-native-uuid';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import BackgroundTimer from 'react-native-background-timer';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

export default function CallManager() {
  const audioRecorderPlayer = new AudioRecorderPlayer();

  const call911 = () => {
    const callUUID = uuid.v4();

    //     Important Legal Considerations:
    // Explicit User Action: Ensure that the user is fully aware and consents to making the emergency call.
    // Avoid Automated Emergency Calls: Never automate emergency calls in your app, as this could lead to app rejection or legal consequences.
    // Platform Restrictions: Both Android and iOS have strict guidelines about making emergency calls, so ensure you comply with the platform policies.
    RNCallKeep.startCall(callUUID, '911', '911');
  };
  const checkRecordFileExists = async () => {
    const path = Platform.select({
      ios: `${RNFS.LibraryDirectoryPath}/kinga_record.m4a`, // Internal storage for iOS
      android: `${RNFS.CachesDirectoryPath}/kinga_record.mp3`, // Internal storage for Android
    });

    try {
      const exists = await RNFS.exists(path);
      console.log(`File exists: ${exists}`);
      return exists;
    } catch (error) {
      console.error('Error checking file existence', error);
    }
    return false;
  };

  const registerCallKeepEventListeners = () => {
    RNCallKeep.addEventListener('answerCall', handleAnswerCall);
    RNCallKeep.addEventListener('endCall', handleEndCall);
  };

  const handleAnswerCall = async ({ callUUID }) => {
    console.log(`Call answered with UUID: ${callUUID}`);

    const path = Platform.select({
      ios: `${RNFS.LibraryDirectoryPath}/kinga_record.m4a`, // Internal storage for iOS
      android: `${RNFS.CachesDirectoryPath}/kinga_record.mp3`, // Internal storage for Android
    });

    try {
      const msg = await audioRecorderPlayer.startPlayer(path);
      console.log('Audio started playing', msg);

      BackgroundTimer.setTimeout(() => {
        RNCallKeep.setCurrentCallActive(callUUID);
      }, 1000);

      audioRecorderPlayer.addPlayBackListener(e => {
        if (e.currentPosition === e.duration) {
          console.log('Audio finished playing');
          endCall(callUUID); // End the call after playback finishes
          audioRecorderPlayer.stopPlayer();
        }
      });
    } catch (error) {
      console.error('Error playing audio', error);
    }
  };

  const handleEndCall = ({ callUUID }) => {
    console.log(`Call ended with UUID: ${callUUID}`);
    stopAudio();
  };

  // Method to stop audio playback when the call ends
  const stopAudio = async () => {
    try {
      await audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
    } catch (error) {
      console.error('Error stopping audio', error);
    }
  };

  // Programmatically end the call
  const endCall = callUUID => {
    RNCallKeep.endCall(callUUID);
    stopAudio(); // Ensure audio is stopped after ending the call
  };

  const displayIncomingCall = (callerName, callerPhone) => {
    const callerId = uuid.v4();

    RNCallKeep.displayIncomingCall(
      callerId,
      callerPhone,
      callerName,
      'number',
      false,
    );
  };

  // Schedule the incoming call with a delay
  const scheduleIncomingCall = (
    callerName,
    callerPhone,
    delayInMilliSeconds = 1000,
  ) => {
    // Use BackgroundTimer to schedule the incoming call after a delay
    BackgroundTimer.setTimeout(() => {
      displayIncomingCall(callerName, callerPhone);
    }, delayInMilliSeconds); // Convert seconds to milliseconds
  };

  // Cleanup: good practice to clean up event listeners when they're no longer needed
  const unregisterCallKeepEventListeners = () => {
    RNCallKeep.removeEventListener('answerCall', handleAnswerCall);
    RNCallKeep.removeEventListener('endCall', handleEndCall);
  };

  return {
    call911,
    checkRecordFileExists,
    registerCallKeepEventListeners,
    displayIncomingCall,
    scheduleIncomingCall,
    unregisterCallKeepEventListeners,
  };
}
