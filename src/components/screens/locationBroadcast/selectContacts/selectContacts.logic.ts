import useSelectedOptionsStore from '@/lib/store/contactIndex';
import * as NativeContacts from 'react-native-contacts';
import { useState, useEffect } from 'react';
import {
  fetchContactsRequest,
  saveContactsRequest,
} from '@/lib/services/contacts';
import Toast from 'react-native-toast-message';

export default function SelectContactsLogic() {
  // const {selectedOptions, toggleSelection} = useSelectedOptionsStore();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [phoneContacts, setPhoneContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serverContacts, setServerContacts] = useState([]);

  const toggleSelection = index => {
    const _selectedOptions = selectedOptions.includes(index)
      ? selectedOptions.filter(option => option !== index)
      : [...selectedOptions, index];

    setSelectedOptions(_selectedOptions);
  };

  const handleSaveContacts = async () => {
    const selectedContacts = selectedOptions.map(index => phoneContacts[index]);
    console.log('Selected contacts:', selectedContacts);

    setIsLoading(true);

    try {
      const res = await saveContactsRequest(selectedContacts);
      setIsLoading(false);
    } catch (err) {}
    // Great, now save to the server
  };

  const getUserContacts = async () => {
    setIsLoading(true);
    try {
      fetchContactsRequest()
        .then(res => {
          setIsLoading(false);
          if (res.success) {
            console.log('Contacts fetched successfully');
            console.log(res.data.data);
            setServerContacts(res.data.data);
          } else {
            console.error('Failed to fetch contacts');
          }
        })
        .catch(error => {
          setIsLoading(false);
          console.error('Error fetching contacts:', error);
        });
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    getUserContacts();
  }, []);

  const getContacts = async () => {
    try {
      const contactsList = await NativeContacts.getAll();

      // Map contacts to the structure expected by your Contacts component
      const formattedContacts = contactsList.map(contact => ({
        name:
          contact.displayName || `${contact.givenName} ${contact.familyName}`,
        email: contact.emailAddresses[0]?.email || '',
        phone: contact.phoneNumbers[0]?.number || '',
        profile: contact.thumbnailPath
          ? { uri: contact.thumbnailPath }
          : require('@/assets/images/avatar.png'), // Placeholder if no thumbnail
      }));

      const _selectedOptions = [];
      formattedContacts.map((contact, index) => {
        const foundInServerContacts = serverContacts.find(
          serverContact =>
            (serverContact.email !== '' &&
              contact.email !== '' &&
              serverContact.email === contact.email) ||
            (serverContact.phone !== '' &&
              contact.phone !== '' &&
              serverContact.phone === contact.phone),
        );

        if (foundInServerContacts) _selectedOptions.push(index);
      });

      setPhoneContacts(formattedContacts);
      setSelectedOptions(_selectedOptions);
      console.log('Contacts loaded:', formattedContacts);
    } catch (error) {
      console.error('Failed to load contacts', error);
    }
  };

  useEffect(() => {
    getContacts();
  }, [serverContacts]);

  return {
    isLoading,
    setIsLoading,
    phoneContacts,
    setPhoneContacts,
    selectedOptions,
    toggleSelection,
    handleSaveContacts,
  };
}
