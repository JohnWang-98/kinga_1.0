import {
  Animated,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IPaginator from './paginator.interface';
import PaginatorLogic from './paginator.logic';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation

export default function Paginator(props: IPaginator) {
  const { slides, scrollX } = props;
  const { width } = PaginatorLogic();
  const navigation = useNavigation(); // Initialize navigation hook

  return (
    <View className="absolute bottom-0 p-frame-padding gap-3">
      <View
        className="flex-row mt-2"
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        {slides?.map((_: any, i: any) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              className="h-2 rounded-md bg-white mx-1.5"
              style={{ width: dotWidth, opacity }}
              key={i?.toString()}
            />
          );
        })}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('TabsHome')}>
        <Text className="text-gray-200 font-400 text-base pl-1">Skip</Text>
      </TouchableOpacity>
    </View>
  );
}
