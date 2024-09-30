import { slides } from '@/lib/constants';
import { useNavigation } from '@react-navigation/native'; // Import navigation
import { useRef, useState } from 'react';
import { Animated, FlatList } from 'react-native';
import { saveLocalData } from '@/lib/helpers/localStorage';

export default function OnboardingLogic() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const slidesRef = useRef<FlatList>(null);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return {
    scrollX,
    slidesRef,
    viewConfig,
    currentIndex,
    viewableItemsChanged,
  };
}
