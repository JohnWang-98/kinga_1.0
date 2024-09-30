import { useState } from 'react';
import * as Yup from 'yup';
import { Alert } from 'react-native';
import { addMessageRequest } from '@/lib/services/messages';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

export default function CustomizeTextLogic() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State to handle errors
  const navigation = useNavigation();

  const initialValues = {
    display_name: '',
  };

  const schema = Yup.object().shape({
    display_name: Yup.string().required('Required'),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);

    try {
      const res = await addMessageRequest(values.display_name);
      setIsLoading(false);

      if (res.success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Message saved successfully',
        });
        navigation.goBack();
      } else {
      }
    } catch (error) {
    } finally {
      setIsLoading(false); // Stop the loader in both success and error cases
    }
  };

  return {
    isLoading,
    handleSubmit,
    setIsLoading,
    schema,
    initialValues,
    errorMessage, // Return the error message so the UI can display it
  };
}
