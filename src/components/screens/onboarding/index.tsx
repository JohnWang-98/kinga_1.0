import { Animated, FlatList, SafeAreaView, View } from 'react-native';
import IOnboarding from './onboarding.interface';
import OnboardingLogic from './onboarding.logic';
import { slides } from '@/lib/constants';
import OnboardingItems from '@/components/molecules/onboardingItem';
import Paginator from '@/components/atoms/paginator';
import OnboardingButton from '@/components/atoms/buttons/onboarding';
import { saveLocalData } from '@/lib/helpers/localStorage';

export default function Onboarding(props: IOnboarding) {
  const { onComplete } = props;
  const { viewableItemsChanged, viewConfig, slidesRef, scrollX, currentIndex } =
    OnboardingLogic();

  const scrollTo = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      await saveLocalData('isFirstLaunch', false); // Save that onboarding is done
      onComplete(); // Call the passed function
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View style={{ flex: 3 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          data={slides}
          renderItem={({ item }) => <OnboardingItems item={item} />}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            },
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slidesRef}
        />
      </View>
      <Paginator slides={slides} scrollX={scrollX} />
      <OnboardingButton
        scrollTo={scrollTo}
        percentage={(currentIndex + 1) * (100 / slides.length)}
      />
    </SafeAreaView>
  );
}
