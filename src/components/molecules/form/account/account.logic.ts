import { getLocalData, saveLocalData } from '@/lib/helpers/localStorage';
import { updateProfileRequest } from '@/lib/services/profile';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation
import { useState, useContext } from 'react';
import { AuthContext } from '@/contexts/auth';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import messaging from '@react-native-firebase/messaging';
import { createBroadcastRequest } from '@/lib/services/locationBroadcast';
import axios from 'axios';
import { API_URL } from '@env';

export default function AccountLogic() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation(); // Initialize navigation hook
  const { updateProfile } = useContext(AuthContext);

  const ProfileSchema = Yup.object().shape({
    full_name: Yup.string().required('Required'),
    phone_number: Yup.string().required('Required'),
    email: Yup.string().required('Required').email('Invalid email'),
  });

  const createBroadcastRequest = async (
    phoneNumber: string,
    fcmToken: string,
    fullName: string,
    email: string,
  ) => {
    try {
      const response = await axios.put(`${API_URL}/user/broadcast`, {
        phoneNumber: phoneNumber,
        fcmToken: fcmToken,
        fullName: fullName,
        email: email,
      });

      return response.data; // Assuming your API sends the response with a 'success' key
    } catch (error) {
      console.error(
        'Error creating broadcast request:',
        error.response?.data || error.message,
      );
      return { success: false }; // Return failure if there's an error
    }
  };

  const handleSubmit = async (values: any) => {
    setIsLoading(true);

    try {
      // Get the FCM token
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      // Make the API request using the phone number and token

      const res = await createBroadcastRequest(
        values.phone_number,
        token,
        values.full_name,
        values.email,
      );
      // console.log('Broadcast Response:', res);

      if (res.success) {
        setIsLoading(false);
        Toast.show({
          type: 'success',
          text1: 'Profile updated successfully',
        });
        await saveLocalData('phoneNumber', values.phone_number);
        await saveLocalData('full_name', values.full_name);
        await saveLocalData('fcmToken', token);
        // console.log('Profile updated successfully');
        navigation.goBack();
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Failed to update profile',
      });
      // console.error('Failed to update profile:', error.message || error);
    }
  };

  return {
    isLoading,
    handleSubmit,
    setIsLoading,
    ProfileSchema,
  };
}
