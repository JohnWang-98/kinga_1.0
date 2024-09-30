import {contacts} from '@/lib/constants';
import {useCallerIdStore} from '@/lib/store/caller';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation from React Navigation
import {useEffect, useState} from 'react';
import {getLocalData} from '@/lib/helpers/localStorage';

export default function DecoyCallLogic() {
  const navigation = useNavigation(); // Initialize navigation hook

  const handleNavigate = () => {
    navigation.navigate('ChooseFromContacts');
  };
  return {handleNavigate};
}
