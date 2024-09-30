import { useState } from 'react';
import * as Yup from 'yup';
import { changePasswordRequest } from '@/lib/services/profile';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

export default function ChangePasswordLogic() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const initialValues = {
    current_password: '',
    new_password: '',
    confirm_password: '',
  };

  const schema = Yup.object().shape({
    current_password: Yup.string().required('Required'),
    new_password: Yup.string().required('Required'),
    confirm_password: Yup.string().required('Required'),
  });

  const handleSubmit = async (values: any) => {
    if (values.new_password !== values.confirm_password) {
      Toast.show({
        type: 'error',
        text1: 'New password and confirm password do not match',
      });

      return;
    }

    setIsLoading(true);

    const res = await changePasswordRequest(
      values.current_password,
      values.new_password,
    );

    setIsLoading(false);
    if (res.success) {
      Toast.show({
        type: 'success',
        text1: 'Password changed successfully',
      });
      console.log('Password changed successfully');
      navigation.goBack();
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed to change password',
      });
      console.log('Failed to change password');
    }
  };

  return {
    isLoading,
    handleSubmit,
    setIsLoading,
    schema,
    initialValues,
  };
}
