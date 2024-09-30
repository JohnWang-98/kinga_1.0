import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import DefaultSafeAreaView from '@/components/atoms/defaultSaveAreaView/DefaultSafeAreaView';
import { ScrollFrame } from '@/components/atoms/frame';
import InnerHeader from '@/components/molecules/header/inner';
import Separator from '@/components/atoms/separator';
import { Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import CustomText from '@/components/atoms/customText';

export default function LocationMessageView() {
  const { message } = useRoute().params;

  return (
    <DefaultSafeAreaView>
      <ScrollFrame>
        <InnerHeader label={message?.from?.fullName} gobackLabel="Back" />
        <Separator />
        <CustomText>Message: {message?.message}</CustomText>
        <CustomText>Location: {JSON.stringify(message?.location)}</CustomText>
        <Separator />
      </ScrollFrame>
    </DefaultSafeAreaView>
  );
}
