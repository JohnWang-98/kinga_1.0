import {
  SafeAreaView,
  ScrollView,
  ScrollViewProps,
  View,
  ViewProps,
} from 'react-native';
import { cn } from '@/lib/utils';
import DefaultSafeAreaView from '@/components/atoms/defaultSaveAreaView/DefaultSafeAreaView';

function Frame(props: ViewProps) {
  const { className, children, ...rest } = props;

  return (
    <DefaultSafeAreaView>
      <View className={cn('h-full px-frame-padding', className)} {...rest}>
        {children}
      </View>
    </DefaultSafeAreaView>
  );
}

function ScrollFrame(props: ScrollViewProps) {
  const { className, children, ...rest } = props;

  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
      className={cn('h-full px-frame-padding', className)}
      {...rest}>
      {children}
    </ScrollView>
  );
}

export { Frame, ScrollFrame };
