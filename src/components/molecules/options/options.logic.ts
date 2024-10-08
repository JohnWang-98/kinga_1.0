import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/contexts/auth';

export default function OptionsLogic({ options }) {
  const [viewWidth, setViewWidth] = useState(0);
  const { signOut } = useContext(AuthContext);
  const [toggleStates, setToggleStates] = useState<boolean[]>([]);
  const [selectedOption, setSelectedOption] = useState<number>();
  const [alertVisible, setAlertVisible] = useState(false);

  const navigation = useNavigation(); // Initialize navigation hook

  useEffect(() => {
    options.forEach((option, index) => {
      if (option.buttonType === 'switch') {
        setToggleStates(prevStates => {
          const newStates = [...prevStates];
          newStates[index] = option.state;
          return newStates;
        });
      }
    });
  }, [options]);

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setViewWidth(width);
  };

  const handlePress = ({
    option,
    index,
  }: {
    option: Options;
    index: number;
  }) => {
    if (option.route) {
      navigation.navigate(option.route, { id: option.id });
    } else if (option.buttonType === 'switch') {
      onToggleSwitch(index);
    } else if (option.buttonType === 'logout') {
      handleLogout();
    } else {
      setSelectedOption(index);

      if (option.buttonType === 'option' && option.onSelected) {
        option.onSelected(index);
      }
    }
  };

  const onToggleSwitch = (index: number) => {
    setToggleStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const handleLogout = () => {
    setAlertVisible(true);
  };

  const onConfirmLogout = () => {
    setAlertVisible(false);
    signOut();
    navigation.replace('Auth');
  };

  return {
    viewWidth,
    handleLayout,
    handlePress,
    toggleStates,
    onToggleSwitch,
    setSelectedOption,
    selectedOption,
    handleLogout,
    onConfirmLogout,
    alertVisible,
    setAlertVisible,
  };
}
