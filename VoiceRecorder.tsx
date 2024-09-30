import React, { useState } from 'react';
import { View, Button, Text, PermissionsAndroid, Platform } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

const VoiceRecorder = () => {
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [recording, setRecording] = useState(false);

  // Function to request recording permissions on Android
  const requestPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Voice Recording Permission',
            message: 'This app requires access to your microphone to record audio.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permission denied');
          return false;
        }
      }
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const startRecording = async () => {
    const permissionGranted = await requestPermissions();
    if (!permissionGranted) return;

    try {
      const result = await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener((e) => {
        setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      });
      setRecording(true);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setRecordTime('00:00:00');
      setRecording(false);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ marginTop: 50, padding: 20 }}>
      <Text style={{ marginBottom: 20, fontSize: 18 }}>Recording Time: {recordTime}</Text>
      <Button title={recording ? 'Stop Recording' : 'Start Recording'} onPress={recording ? stopRecording : startRecording} />
    </View>
  );
};

export default VoiceRecorder;
