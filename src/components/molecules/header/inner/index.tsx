import {View, TouchableOpacity} from 'react-native';
import IInner from './inner.interface';
import InnerLogic from './inner.logic';
import CustomText from '@/components/atoms/customText';
import CheveronLeft from '@/assets/icons/cheveron-left';

export default function InnerHeader(props: IInner) {
  const {label, gobackLabel, onBeforeBackHandler, ...rest} = props;
  const {statusBarHeight, handleNavigate} = InnerLogic();
  return (
    <View
      style={{
        paddingTop: (statusBarHeight || 0) + 20,
      }}
      className=" bg-background">
      <View className="flex flex-row justify-center items-center relative h-12">
        <TouchableOpacity
          className="flex-row items-center absolute left-0 top-0 bottom-0 -mb-2"
          onPress={() => {
            // onBeforeBackHandler();
            handleNavigate();
          }}
          {...rest}>
          <CheveronLeft />
          <CustomText className="text-primary-bright ml-2 text-[12.5px]">
            {gobackLabel}
          </CustomText>
        </TouchableOpacity>
        <CustomText className="font-600 text-xl text-center ">
          {label}
        </CustomText>
      </View>
    </View>
  );
}
