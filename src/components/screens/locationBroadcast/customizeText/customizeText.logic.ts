import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getLocalData, saveLocalData } from '@/lib/helpers/localStorage';
import { updateMessageActiveRequest } from '@/lib/services/messages';

export default function CustomizeTextLogic() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Use useFocusEffect to refresh the UI when the screen is focused
  useFocusEffect(
    useCallback(() => {
      getMessages();

      // Cleanup logic if needed when the screen is unfocused
      return () => {
        console.log('Screen is unfocused');
      };
    }, []),
  );

  const getMessages = async () => {
    setIsLoading(true);

    try {
      // Fetch messages from local storage
      const res = await getLocalData('messages');
      setIsLoading(false);

      if (res) {
        // console.log('res', res);
        const fetchedMessages = JSON.parse(res); // Make sure to parse the stored string
        setMessages(fetchedMessages);

        // Set the selected option to the first active message or the first message if none are active
        if (fetchedMessages.length > 0) {
          const activeIndex = fetchedMessages.findIndex(
            (msg: any) => msg.active,
          );
          setSelectedOption(activeIndex !== -1 ? activeIndex : 0); // Default to first message if none are active
        }
      } else {
        setError('No messages found');
        setMessages([]); // Set to empty array in case no data is found
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Error fetching messages');
      setIsLoading(false);
    }
  };

  const setSelectedOptionAndUpdate = async (index: number) => {
    setSelectedOption(index); // Set the selected option

    // Update the message status
    const selectedMessage = messages[index];

    if (selectedMessage) {
      try {
        // Update the local messages state to mark the selected message as active
        const updatedMessages = messages.map((msg, idx) => ({
          ...msg,
          active: idx === index, // Set only the selected message to active
        }));

        // Save the updated messages array to AsyncStorage
        await saveLocalData('messages', JSON.stringify(updatedMessages));
        console.log('updatedMessages', updatedMessages);
        // Save the selected message to AsyncStorage
        await saveLocalData('message', selectedMessage.message);

        // Update the state with the new messages array
        setMessages(updatedMessages);

        console.log(
          'Message and active status updated successfully in AsyncStorage',
        );
      } catch (error) {
        console.error('Error saving message to AsyncStorage:', error);
        setError('Error saving message');
      }
    }
  };

  return {
    isLoading,
    messages,
    error,
    selectedOption,
    setSelectedOptionAndUpdate,
  };
}
