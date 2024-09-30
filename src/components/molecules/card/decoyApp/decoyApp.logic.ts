import {useNavigation} from '@react-navigation/native'; // Import useNavigation from React Navigation

export default function DecoyAppLogic(
  data: DecoyAppCard,
  setSelectedOption: (id: number) => void,
) {
  const navigation = useNavigation(); // Initialize navigation hook
  const handleNavigate = () => {
    if (data.app_route) {
      navigation.navigate(data.app_route);
      // router.push(data.app_route);
    } else {
      setSelectedOption(data.id);
    }
  };
  return {handleNavigate};
}
