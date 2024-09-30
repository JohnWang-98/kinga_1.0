import useToggleSwitchStore from "@/lib/store/toggleSwitch";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export default function HomeLogic() {
  const { isSwitchOn } = useToggleSwitchStore();

  const fadeAnim = useRef(new Animated.Value(isSwitchOn ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isSwitchOn ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isSwitchOn]);

  return {
    isSwitchOn,
    fadeAnim,
  };
}
