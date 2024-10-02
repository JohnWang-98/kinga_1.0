import Separator from '@/components/atoms/separator';
import ISettings from './settings.interface';
import SettingsLogic from './settings.logic';
import { ScrollFrame } from '@/components/atoms/frame';
import TabsHeader from '@/components/molecules/header/tabs';
import { Avatar } from 'react-native-paper';
import { View } from 'react-native';
import CustomText from '@/components/atoms/customText';
import PrimaryButton from '@/components/atoms/buttons/primary';
import Options from '@/components/molecules/options';
import {
  logoutOption,
  PreferencesOptions,
  supportOptions,
} from '@/lib/constants';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation
import { StyleSheet } from 'react-native';
import { saveLocalData, getLocalData } from '@/lib/helpers/localStorage';
// import {styles} from '@/lib/constants';
import { useState, useEffect, useContext } from 'react';
import DefaultSafeAreaView from '../../../atoms/defaultSaveAreaView/DefaultSafeAreaView';
import { AuthContext } from '@/contexts/auth';

export default function Settings(props: ISettings) {
  const {} = props;
  const {} = SettingsLogic();
  const navigation = useNavigation(); // Initialize navigation hook
  const { state } = useContext(AuthContext);
  const [fullName, setFullName] = useState('');
  const [notificationOptions, setNotificationOptions] =
    useState(PreferencesOptions);

  const handleSwitchOptionToggle = (id: string, state: boolean) => {
    if (id === 'pushnotify') {
      saveLocalData('pushNotificationStatus', state);
    }
  };

  useEffect(() => {
    const updateOptions = async () => {
      let savedStatus = await getLocalData('pushNotificationStatus');
      if (savedStatus === null) savedStatus = true;

      const options = PreferencesOptions.map(option => {
        if (option.id === 'pushnotify') {
          return {
            ...option,
            state: savedStatus,
            onToggleSwitch: handleSwitchOptionToggle,
          };
        }
      });

      setNotificationOptions(options);
    };

    updateOptions();
    const getFullName = async () => {
      const fullName = await getLocalData('full_name');
      setFullName(fullName);
    };

    getFullName();
  }, [PreferencesOptions]);

  // const [isPushNotificationEnabled, setIsPushNotificationEnabled] =
  //   useState(false);

  // // Load saved preferences from local storage when the component mounts
  // useEffect(() => {
  //   const loadPushNotificationStatus = async () => {
  //     try {
  //       const savedStatus = await getLocalData('pushNotificationStatus');
  //       console.log('savedstatus', savedStatus);
  //       if (savedStatus !== null) {
  //         setIsPushNotificationEnabled(JSON.parse(savedStatus));
  //       }
  //     } catch (error) {
  //       console.error('Error loading push notification status:', error);
  //     }
  //   };

  //   loadPushNotificationStatus();
  // }, []);
  // const changePreferencesOptions = PreferencesOptions.map(option => {
  //   if (option.id === 'pushnotify') {
  //     return {
  //       ...option,
  //       value: isPushNotificationEnabled,
  //       onValueChange: handleTogglePushNotification, // Attach the toggle handler
  //     };
  //   }
  //   return option;
  // });
  // // Handle the push notification toggle switch and save to local storage using saveLocalData
  // const handleTogglePushNotification = async (value: boolean) => {
  //   setIsPushNotificationEnabled(value);
  //   console.log('successeddfe', value);

  //   const success = await saveLocalData('pushNotificationStatus', value); // Use saveLocalData function
  //   console.log('success', success);
  //   if (success) {
  //     console.log('Push notification status saved:', value);
  //   } else {
  //     console.error('Failed to save push notification status.');
  //   }
  // };

  return (
    <DefaultSafeAreaView>
      <TabsHeader label="Settings" />
      <ScrollFrame>
        <Separator />
        <View className="items-center justify-center gap-5">
          <Avatar.Image
            size={80}
            source={require('../../../../assets/images/avatar.png')}
          />
          <View className="items-center justify-center ">
            {fullName ? (
              <CustomText className="font-500 text-2xl">{fullName}</CustomText>
            ) : (
              <CustomText className="font-500 text-2xl">Unknown</CustomText>
            )}
            <CustomText className="font-500 text-xs text-muted-foreground">
              {state?.user?.email}
            </CustomText>
          </View>
          <PrimaryButton
            label="Edit profile"
            textClassName="font-500 text-sm"
            className="px-10 h-12"
            onPress={() => navigation.navigate('EditProfile')}
          />
        </View>
        <View className="mt-10 ">
          <CustomText className="font-500 text-xs text-muted-foreground ml-3 mb-2">
            Preferences
          </CustomText>
          <Options options={notificationOptions} />
        </View>
        <View className="mt-5">
          <CustomText className="font-500 text-xs text-muted-foreground ml-3 mb-2">
            Support
          </CustomText>
          <Options options={supportOptions} />
        </View>
        <View className="mt-5">
          <Options options={logoutOption} />
        </View>
        <View className="mt-5 flex-row justify-center">
          <CustomText className="font-500 text-xs text-muted-foreground ml-3 mb-2">
            Version 1.0.0
          </CustomText>
        </View>
      </ScrollFrame>
    </DefaultSafeAreaView>
  );
}
