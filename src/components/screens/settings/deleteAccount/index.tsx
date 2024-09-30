import { View, StyleSheet } from 'react-native';
import IDeleteAccount from './deleteAccount.interface';
import DeleteAccountLogic from './deleteAccount.logic';
import { ScrollFrame } from '@/components/atoms/frame';
import InnerHeader from '@/components/molecules/header/inner';
import CustomText from '@/components/atoms/customText';
import Options from '@/components/molecules/options';
import { reasonsOptions } from '@/lib/constants';
import Separator from '@/components/atoms/separator';
import DeleteAccoutForm from '@/components/molecules/form/deleteAccount';
import { useState } from 'react';
import { add } from 'react-native-track-player/lib/src/trackPlayer';
import { deleteAccountRequest } from '@/lib/services/profile';
import Toast from 'react-native-toast-message';
import { AuthContext } from '@/contexts/auth';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

export default function DeleteAccount(props: IDeleteAccount) {
  const {} = props;
  const {} = DeleteAccountLogic();
  const [reason, setReason] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const { signOut } = useContext(AuthContext);
  const navigation = useNavigation();
  const [alertVisible, setAlertVisible] = useState(false);

  const onConfirmDeleteAccount = async () => {
    const response = await deleteAccountRequest(reason, additionalInfo);
    if (response.success) {
      await signOut();
      navigation.replace('Auth');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed to delete account. Please contact customer support.',
      });
    }
  };

  const handleOnChangeReason = (index: number) => {
    // Handle reason change
    setReason(reasonsOptions[index].label);
  };

  const handleOnDeleteAccount = async (additionalInfo: string) => {
    // Handle delete account
    if (reason === '') {
      Toast.show({
        type: 'error',
        text1: 'Please select a reason to delete account',
      });
      return;
    }

    setAdditionalInfo(additionalInfo);

    // Show Alert and confirm here
    Alert.alert(
      'Are you sure you want to delete your account?',
      'Please type "DELETE" to confirm',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'DELETE',
          onPress: () => onConfirmDeleteAccount(),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollFrame>
        <InnerHeader label="Delete Account" gobackLabel="Back" />
        <Separator />
        <View className="flex-col gap-4 flex-1 h-full">
          <View>
            <CustomText className="font-600 text-[17px]  mb-2">
              Select reason
            </CustomText>
            <Options options={reasonsOptions} onChange={handleOnChangeReason} />
          </View>
          <View className="flex-1 h-full">
            <CustomText className="font-600 text-[17px]  mb-2">
              Anything you would like to add
            </CustomText>
            <DeleteAccoutForm onDeleteAccount={handleOnDeleteAccount} />
          </View>
        </View>
        <Separator />
        <CustomText className="text-red-500 font-400">
          *All the data will be delected permanently from our server including
          your profile, messages, and other data.
        </CustomText>
      </ScrollFrame>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#152e42',
  },
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1, // Ensure it renders above the tab bar
  },
});
