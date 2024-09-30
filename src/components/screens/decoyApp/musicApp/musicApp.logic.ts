import useToggleSwitchStore from '@/lib/store/toggleSwitch';
import { useEffect, useState } from 'react';
import { Platform, StatusBar, Vibration } from 'react-native';
import { getLocalData } from '@/lib/helpers/localStorage';
import { ACTION_TYPE } from '@/lib/constants';
import { defaultLocale } from 'yup';
import CallManager from '@/lib/helpers/callManager';
import Toast from 'react-native-toast-message';
import LocationManager from '@/lib/helpers/geoLocation';
import { broadcastLocationRequest } from '@/lib/services/locationBroadcast';

export default function MusicAppLogic() {
  const { isSwitchOn, toggleSwitch } = useToggleSwitchStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight : 0;
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [like, setLike] = useState(false);

  const { scheduleIncomingCall, checkRecordFileExists, call911 } =
    CallManager();

  const { getLocation } = LocationManager();

  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleButtonAction = async actionType => {
    switch (actionType) {
      case ACTION_TYPE.TRIGGER_CALL:
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
        break;

      case ACTION_TYPE.SEND_LOCATION:
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
              Vibration.vibrate(500);
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
        break;

      case ACTION_TYPE.DIAL_911:
        call911();

        break;
      default:
        console.log('Invalid action type');
        break;
    }
  };

  const handleLike = () => {
    setLike(!like);
  };

  const handleRepeat = async () => {
    const action = await getLocalData('repeatButton');
    if (action === null) Vibration.vibrate();
    else handleButtonAction(action);
  };

  const handlePrev = async () => {
    const action = await getLocalData('prevButton');
    if (action === null) Vibration.vibrate();
    else handleButtonAction(action);
  };

  const handleNext = async () => {
    const action = await getLocalData('nextButton');
    if (action === null) Vibration.vibrate();
    else handleButtonAction(action);
  };

  const handleShuffle = async () => {
    const action = await getLocalData('shuffleButton');
    if (action === null) Vibration.vibrate();
    else handleButtonAction(action);

    // shuffleButton
  };

  const handlePlay = async () => {
    setIsPlaying(!isPlaying);

    console.log('11111');
    const action = await getLocalData('playButton');
    if (action === null) Vibration.vibrate();
    else handleButtonAction(action);
  };

  return {
    statusBarHeight,
    isPlayerReady,
    toggleSwitch,
    isSwitchOn,
    handleLike,
    like,
    handlePlay,
    isPlaying,
    handleRepeat,
    handlePrev,
    handleNext,
    handleShuffle,
  };
}
