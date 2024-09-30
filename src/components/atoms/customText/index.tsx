import { Text, TextProps } from 'react-native';
import { cn } from '@/lib/utils';

export default function CustomText(props: TextProps) {
  const { className, children, ...rest } = props;

  return (
    <Text className={cn('text-white font-400', className)} {...rest}>
      {children}
    </Text>
  );
}
