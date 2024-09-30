import useToggleSwitchStore from '@/lib/store/toggleSwitch';
import {Platform, StatusBar} from 'react-native';

export default function TabsLogic() {
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight : 0;

  const {isSwitchOn, toggleSwitch} = useToggleSwitchStore();

  return {
    statusBarHeight,
    isSwitchOn,
    toggleSwitch,
  };
}
