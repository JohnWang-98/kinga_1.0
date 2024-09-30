import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Circle } from "react-native-svg";

export default function OnboardingButtonLogic(percentage: number) {
  const size = 70;
  const strokeWidth = 3;
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef<Circle>(null);

  const animation = (toValue: any) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener((value) => {
      const strokeDashoffset =
        circumference - (circumference * value.value) / 100;
      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });
  }, [percentage]);

  return {
    size,
    radius,
    center,
    animation,
    strokeWidth,
    progressRef,
    circumference,
    progressAnimation,
  };
}
