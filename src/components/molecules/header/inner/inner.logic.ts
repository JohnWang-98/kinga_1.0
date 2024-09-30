import {useNavigation} from '@react-navigation/native'; // Import useNavigation from React Navigation
import {Platform, StatusBar} from 'react-native';

export default function InnerLogic() {
  const navigation = useNavigation(); // Initialize navigation hook

  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight : 0;

  const handleNavigate = () => {
    navigation.goBack();
  };

  return {
    handleNavigate,
    statusBarHeight,
  };
}
