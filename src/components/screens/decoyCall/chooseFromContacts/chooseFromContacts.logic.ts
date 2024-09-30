import { useState, useEffect } from 'react';
import * as NativeContacts from 'react-native-contacts';
import { saveLocalData } from '@/lib/helpers/localStorage';
import { getLocalData } from '@/lib/helpers/localStorage';

export default function ChooseFromContactsLogic() {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [phoneContacts, setPhoneContacts] = useState([]);

  const toggleSelection = (id: number) => {
    setSelectedOptions([id]);

    // Save selected contact to local storage
    console.log('Selected contact:', phoneContacts[id]);
    saveLocalData('callerContact', phoneContacts[id]);
  };

  const getContacts = async () => {
    try {
      const contactsList = await NativeContacts.getAll();

      console.log(contactsList);

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

      setPhoneContacts(formattedContacts);
      getLocalData('callerContact').then(contact => {
        if (contact) {
          const index = formattedContacts.findIndex(
            item => JSON.stringify(item) === JSON.stringify(contact),
          );

          if (index !== -1) {
            setSelectedOptions([index]);
          }
        }
      });
      console.log('Contacts loaded:', formattedContacts);
    } catch (error) {
      console.error('Failed to load contacts', error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return {
    toggleSelection,
    selectedOptions,
    phoneContacts,
  };
}
