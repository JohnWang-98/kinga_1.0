import {useNavigation} from '@react-navigation/native'; // Import useNavigation from React Navigation

export default function ControlsLogic() {
  const navigation = useNavigation(); // Initialize navigation hook

  const handleBack = () => {
    navigation.navigate('DecoyApp');
  };

  return {
    handleBack,
  };
}
