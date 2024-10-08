import { getLocalData } from '@/lib/helpers/localStorage';
import { updateProfileRequest } from '@/lib/services/profile';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation
import { useState, useContext } from 'react';
import { AuthContext } from '@/contexts/auth';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

export default function AccountLogic() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation(); // Initialize navigation hook
  const { updateProfile } = useContext(AuthContext);

  const ProfileSchema = Yup.object().shape({
    full_name: Yup.string().required('Required'),
    phone_number: Yup.string().required('Required'),
    email: Yup.string().required('Required').email('Invalid email'),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);

    let isReceiveNotification = await getLocalData('pushNotification');
    if (isReceiveNotification === null) isReceiveNotification = true;

    const res = await updateProfile(
      values.full_name,
      values.email,
      values.phone_number,
      isReceiveNotification,
    );
    if (res) {
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Profile updated successfully',
      });
      console.log('Profile updated successfully');
      navigation.goBack();
    } else {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Failed to update profile',
      });
      console.log('Failed to update profile');
    }
  };

  return {
    isLoading,
    handleSubmit,
    setIsLoading,
    ProfileSchema,
  };
}
