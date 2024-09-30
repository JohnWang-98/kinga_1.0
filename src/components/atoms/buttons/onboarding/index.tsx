import { TouchableOpacity, View } from 'react-native';
import IOnboardingButton from './onboardingButton.interface';
import OnboardingButtonLogic from './onboardingButton.logic';
import { Circle, G, Svg } from 'react-native-svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function OnboardingButton(props: IOnboardingButton) {
  const { scrollTo, percentage } = props;
  const {
    size,
    center,
    radius,
    animation,
    strokeWidth,
    progressRef,
    circumference,
  } = OnboardingButtonLogic(percentage);

  return (
    <View className="absolute right-0 bottom-0 items-center justify-center flex p-frame-padding ">
      <Svg width={size} height={size} fill={'none'}>
        <G rotation={'-90'} origin={center}>
          <Circle
            stroke={'#ffffff50'}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef}
            stroke={'#fff'}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={scrollTo}
        className="absolute rounded-full p-2 bg-white">
        <MaterialIcons name="chevron-right" size={36} color={'#F2D478'} />
      </TouchableOpacity>
    </View>
  );
}
