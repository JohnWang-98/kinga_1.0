import {useNavigation} from '@react-navigation/native'; // Import useNavigation from React Navigation

export default function ConversationsLogic() {
  const navigation = useNavigation(); // Initialize navigation hook

  const handleNavigate = () => {
    navigation.navigate('Home'); // need to check
  };
  return {handleNavigate};
}
