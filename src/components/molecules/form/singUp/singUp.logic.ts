import {useNavigation} from '@react-navigation/native'; // Import useNavigation from React Navigation
import {useState} from 'react';
import * as Yup from 'yup';

export default function SignUpLogic() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation(); // Initialize navigation hook

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
      .min(8, 'Password must contain 8 characters')
      .matches(/^(?=.{8,})/, 'aaaaaaaaaaaaaaaaaaa')
      .matches(/^(?=.*[0-9])/, 'Password must contain a number'),
    confirm_password: Yup.string()
      .required('Required')
      .min(8, 'Password must contain 8 characters')
      .matches(/^(?=.{8,})/, 'aaaaaaaaaaaaaaaaaaa')
      .matches(/^(?=.*[0-9])/, 'Password must contain a number'),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    navigation.navigate('Home'); // need to check
    setIsLoading(false);
  };

  return {
    isLoading,
    handleSubmit,
    setIsLoading,
    SignUpSchema,
    initialValues,
  };
}
