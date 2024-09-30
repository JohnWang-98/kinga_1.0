import {View, ViewProps} from 'react-native';
import {cn} from '@/lib/utils';

export default function Separator(props: ViewProps) {
  const {className} = props;
  return <View className={cn('my-4', className)} />;
}
