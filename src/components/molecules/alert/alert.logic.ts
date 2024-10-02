import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation
import { useState } from 'react';

export default function AlertLogic() {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation(); // Initialize navigation hook

  const handleLogout = () => {
    setVisible(false);
    navigation.navigate('TabsHome');
  };

  return {
    handleLogout,
    visible,
    setVisible,
  };
}
