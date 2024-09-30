import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Animated,
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import CustomText from '@/components/atoms/customText';
import Separator from '@/components/atoms/separator';
import InnerHeader from '@/components/molecules/header/inner';
import DefaultSafeAreaView from '../../../atoms/defaultSaveAreaView/DefaultSafeAreaView';
import { ScrollFrame } from '@/components/atoms/frame';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import RNFS from 'react-native-fs'; // Ensure react-native-fs is installed
import { saveLocalData, getLocalData } from '@/lib/helpers/localStorage';

const COLOR_RECORDING = '#FF6347'; // Color when recording (tomato)
const COLOR_IDLE = '#FF6347'; // Idle color (red)
const SIZE = 155;
const MAX_RECORD_TIME = 300000; // 5 minutes in milliseconds

export default function RecordVoice() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingPath, setRecordingPath] = useState('');
  const [recordTime, setRecordTime] = useState('00:00'); // Time tracker
  const audioRecorderPlayer = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const stopRecordingBeforeBack = () => {
    if (isRecording) {
      stopRecording();
    }
  };

  useEffect(() => {
    audioRecorderPlayer.current = new AudioRecorderPlayer();

    const checkExistingElapsedTime = async () => {
      const path = Platform.select({
        ios: `${RNFS.LibraryDirectoryPath}/kinga_record.m4a`, // iOS: Save in the Library directory
        android: `${RNFS.CachesDirectoryPath}/kinga_record.mp3`, // Android: Save in the Cache directory
      });

      const fileExists = await RNFS.exists(path);
      const savedElapsedTime = await getLocalData('elapsedTime');

      if (fileExists && savedElapsedTime) {
        setRecordingPath(path); // Set the recording path so UI reflects that the file exists
        setRecordTime(savedElapsedTime); // Update with the saved elapsed time
        console.log('Loaded saved elapsed time:', savedElapsedTime);
      } else {
        // If there's no valid elapsed time, ensure the UI starts with 00:00
        setRecordTime('00:00');
      }
    };

    checkExistingElapsedTime(); // Call the function when the component mounts
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        return (
          granted['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
        );
      } catch (err) {
        console.warn('Permission error:', err);
        return false;
      }
    }
    return true;
  };

  const startRecording = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Toast.show({
        type: 'error',
        text1: 'Permissions not granted',
      });
      return;
    }

    try {
      const path = Platform.select({
        ios: `${RNFS.LibraryDirectoryPath}/kinga_record.m4a`, // iOS: Save in the Library directory
        android: `${RNFS.CachesDirectoryPath}/kinga_record.mp3`, // Android: Save in the Cache directory
      });

      const fileExists = await RNFS.exists(path);
      if (fileExists) {
        await RNFS.unlink(path); // Delete the existing file
        console.log('Existing recording deleted');
      }

      // Reset recording time to 0 before starting a new recording
      setRecordTime('00:00');
      setRecordingPath(null); // Clear any existing recording path
      setIsRecording(false);

      const result = await audioRecorderPlayer.current.startRecorder(path);
      setRecordingPath(result);
      setIsRecording(true);
      console.log('Recording started at:', result);

      // Start tracking recording time
      audioRecorderPlayer.current.addRecordBackListener(e => {
        const elapsedTime = e.currentPosition;
        if (elapsedTime >= MAX_RECORD_TIME) {
          stopRecording();
        } else {
          setRecordTime(formatTime(elapsedTime)); // Update displayed time
        }
      });

      startPulseAnimation();
    } catch (error) {
      console.log('Recording error:', error);
    }
  };

  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.current.stopRecorder();
      stopPulseAnimation();
      audioRecorderPlayer.current.removeRecordBackListener();

      // Save the final elapsed time to local storage
      await saveLocalData('elapsedTime', recordTime); // Saving the formatted time

      setIsRecording(false);
      console.log('Recording stopped at:', result);
    } catch (error) {
      console.log('Stop recording error:', error);
    }
  };

  const handlePress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const stopPulseAnimation = () => {
    Animated.timing(pulseAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).stop();
  };

  // Function to format time (mm:ss)
  const formatTime = milliseconds => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  };

  return (
    <DefaultSafeAreaView>
      <ScrollFrame>
        <InnerHeader
          label="Record Voice"
          gobackLabel="Back"
          onBeforeBackHandler={stopRecordingBeforeBack}
        />
        <Separator />
        <View style={styles.centered}>
          <TouchableWithoutFeedback onPress={handlePress}>
            <Animated.View
              style={[
                styles.dot,
                {
                  backgroundColor: isRecording ? COLOR_RECORDING : COLOR_IDLE,
                  transform: [{ scale: pulseAnim }],
                },
              ]}>
              <Ionicons
                name="mic"
                size={80}
                color={isRecording ? '#FFFFFF' : '#5D5DFB'}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <Separator />
          {isRecording ? (
            <>
              <CustomText style={styles.text}>Recording...</CustomText>
              <CustomText style={styles.timeText}>{recordTime}</CustomText>
            </>
          ) : (
            <>
              <CustomText style={styles.text}>
                Tap the button to {recordingPath ? 'start another' : 'start'}{' '}
                recording
              </CustomText>
              {recordingPath && (
                <>
                  {/* Display saved elapsed time for existing recordings */}
                  <CustomText style={styles.text}>
                    Previous Recording:
                  </CustomText>
                  <CustomText style={styles.timeText}>{recordTime}</CustomText>
                </>
              )}
            </>
          )}
        </View>
      </ScrollFrame>
    </DefaultSafeAreaView>
  );
}

const styles = StyleSheet.create({
  dot: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#152e42',
  },
  centered: {
    alignItems: 'center',
    marginTop: 80,
  },
  text: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  timeText: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
