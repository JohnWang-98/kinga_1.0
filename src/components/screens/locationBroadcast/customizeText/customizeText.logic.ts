import { useState, useEffect } from 'react';
import { updateMessageStatus, fetchMessageData } from '@/lib/services/api';
import {
  fetchMessagesRequest,
  updateMessageActiveRequest,
} from '@/lib/services/messages';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { saveLocalData } from '@/lib/helpers/localStorage';

export default function CustomizeTextLogic() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [error, setError] = useState('');

  // Use useFocusEffect to refresh the UI when the screen is focused
  useFocusEffect(
    useCallback(() => {
      // Logic to refresh UI or fetch new data
      getMessages();

      // Optionally, return a cleanup function
      return () => {
        console.log('Screen is unfocused');
      };
    }, []),
  );

  const getMessages = async () => {
    setIsLoading(true);

    try {
      const res = await fetchMessagesRequest();
      setIsLoading(false);

      if (res.success) {
        console.log('Messages fetched successfully');
        const fetchedMessages = res.data.data;
        setMessages(fetchedMessages);
        // Set the selected option to the first message
        if (fetchedMessages.length > 0) {
          const index = fetchedMessages.findIndex(
            (message: any) => message.active,
          );
          setSelectedOption(index);
        }
      } else {
        setError('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Error fetching messages');
    }
  };

  const setSelectedOptionAndUpdate = async (index: number) => {
    setSelectedOption(index); // Set the selected option

    // Update the message status
    const messageId = messages[index]?.id;

    // Save to local database
    const message = messages[index]?.message;
    await saveLocalData('message', message);

    updateMessageActiveRequest(messageId, true).then(res => {
      if (res.success) {
        console.log('Message status updated successfully');
      } else {
        setError('Failed to update message status');
      }
    });
  };

  return {
    isLoading,
    messages,
    error,
    selectedOption,
    setSelectedOptionAndUpdate,
  };
}
