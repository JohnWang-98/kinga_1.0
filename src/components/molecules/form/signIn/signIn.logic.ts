import messaging from '@react-native-firebase/messaging';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useState, useContext, useEffect, useCallback } from 'react';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import { AuthContext } from 'contexts/auth';
import { saveLocalData, getLocalData } from '@/lib/helpers/localStorage';

export default function SignInLogic() {
  const { signIn, state } = useContext(AuthContext);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const checkRememberMe = async () => {
    const rememberMe = await getLocalData('rememberMe');
    setInitialValues({
      ...initialValues,
      rememberMe: rememberMe,
    });
  };

  // Use useFocusEffect to refresh the UI when the screen is focused
  useFocusEffect(
    useCallback(() => {
      // Logic to refresh UI or fetch new data
      checkRememberMe();

      // Optionally, return a cleanup function
      return () => {
        console.log('Screen is unfocused');
      };
    }, []),
  );

  const SignInSchema = Yup.object().shape({
    email: Yup.string().required('Required').email('Invalid email'),
    password: Yup.string()
      .required('Required')
      .min(8, 'Password must contain at least 8 characters')
      .matches(/^(?=.*[0-9])/, 'Password must contain a number'),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const res = await signIn(
        values.email,
        values.password,
        values.rememberMe,
      );
      setIsLoading(false);

      if (res) {
        const result = await saveLocalData('rememberMe', values.rememberMe);
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
    }
  };

  return {
    isLoading,
    handleSubmit,
    setIsLoading,
    SignInSchema,
    initialValues,
  };
}
