import { useNavigation } from '@react-navigation/native';
import { useState, useContext } from 'react';
import * as Yup from 'yup';
import { AuthContext } from 'contexts/auth';
import { saveLocalData } from '@/lib/helpers/localStorage';
import Toast from 'react-native-toast-message';

export default function SignUpLogic() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { signUp } = useContext(AuthContext);

  const initialValues = {
    email: '',
    password: '',
    full_name: '',
    phone_number: '',
    confirm_password: '',
  };

  const SignUpSchema = Yup.object().shape({
    full_name: Yup.string().required('Required'),
    phone_number: Yup.string().required('Required'),
    email: Yup.string().required('Required').email('Invalid email'),
    password: Yup.string()
      .required('Required')
      .min(8, 'Password must contain at least 8 characters')
      .matches(/^(?=.*[0-9])/, 'Password must contain a number'),
    confirm_password: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const res = await signUp(
        values.full_name,
        values.email,
        values.phone_number,
        values.password,
      );
      setIsLoading(false);

      if (res) {
        navigation.navigate('TabsHome');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Invalid email or password',
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return {
    isLoading,
    handleSubmit,
    setIsLoading,
    SignUpSchema,
    initialValues,
  };
}
