import { useState } from 'react';
import * as Yup from 'yup';
import { Alert } from 'react-native';
import { addMessageRequest } from '@/lib/services/messages';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { saveLocalData, getLocalData } from '@/lib/helpers/localStorage';

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
    // console.log('values', values);
    setIsLoading(true);
    try {
      // Get the existing messages array from AsyncStorage
      const existingMessages = await getLocalData('messages');
      // If there are no existing messages, initialize as an empty array
      const messagesArray = existingMessages
        ? JSON.parse(existingMessages)
        : [];
      // Create the new message object
      const newMessage = {
        message: values.display_name, // Assuming 'display_name' holds the message text
        active: false, // Initially set to false, can be changed later
      };
      // Add the new message to the messages array
      messagesArray.push(newMessage);
      // Save the updated messages array to AsyncStorage
      await saveLocalData('messages', JSON.stringify(messagesArray));
      // console.log('messagesArray', messagesArray);
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Message saved successfully',
      });
      navigation.goBack();
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to save message');
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSubmit = async (values: any) => {
  //   setIsLoading(true);

  //   try {
  //     const res = await addMessageRequest(values.display_name);
  //     setIsLoading(false);

  //     if (res.success) {
  //       Toast.show({
  //         type: 'success',
  //         text1: 'Success',
  //         text2: 'Message saved successfully',
  //       });
  //       navigation.goBack();
  //     } else {
  //     }
  //   } catch (error) {
  //   } finally {
  //     setIsLoading(false); // Stop the loader in both success and error cases
  //   }
  // };

  return {
    isLoading,
    handleSubmit,
    setIsLoading,
    schema,
    initialValues,
    errorMessage, // Return the error message so the UI can display it
  };
}
