import {useNavigation} from '@react-navigation/native'; // Import useNavigation from React Navigation

export default function EditProfileLogic() {
  const navigation = useNavigation(); // Initialize navigation hook

  const handlePress = () => {
    navigation.navigate('DeleteAccount');
  };

  return {
    handlePress,
  };
}
