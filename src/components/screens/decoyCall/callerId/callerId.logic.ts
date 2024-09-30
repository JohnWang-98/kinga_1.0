import {useCallerIdStore} from '@/lib/store/caller';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation from React Navigation

export default function CallerIdLogic() {
  const {selectedOptions, setSelectedOptions} = useCallerIdStore();
  const navigation = useNavigation(); // Initialize navigation hook

  const toggleSelection = (id: number) => {
    setSelectedOptions([id]);
  };

  const handleNavigate = () => {
    navigation.navigate('ChooseFromContacts');
  };

  return {handleNavigate, selectedOptions, toggleSelection};
}
