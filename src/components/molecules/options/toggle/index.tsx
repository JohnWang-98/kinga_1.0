import { View, Text, TouchableOpacity } from 'react-native';
import IToggle from './toggle.interface';
import ToggleLogic from './toggle.logic';
import CustomText from '@/components/atoms/customText';
import RadioButton from '@/components/atoms/buttons/radio';
import { Fragment } from 'react';

export default function ToggleOptions(props: IToggle) {
  const { options, label, selectedOption, setSelectedOption } = props;
  const {} = ToggleLogic();

  return (
    <View className="bg-black/30 rounded-xl py-1">
      {label && (
        <CustomText className="pl-4 py-[10px] text-[13px]">{label}</CustomText>
      )}
      {options.map((option, index) => (
        <Fragment key={index}>
          <TouchableOpacity
            className="border-b border-transparent"
            onPress={() => {
              if (selectedOption === index) setSelectedOption(undefined);
              else setSelectedOption(index);
            }}>
            <View className="flex flex-row items-center justify-between px-3 py-[10px]">
              <View className="flex flex-row items-center">
                <CustomText className={`-mb-0.5 text-[13px]`}>
                  {option.label}
                </CustomText>
              </View>
              <RadioButton
                selected={selectedOption === index}
                onPress={() => {
                  if (selectedOption === index) setSelectedOption(undefined);
                  else setSelectedOption(index);
                }}
              />
            </View>
          </TouchableOpacity>
          {index < options.length - 1 && (
            <View className="flex flex-row">
              <View className="flex-1 h-[1px] bg-white/20" />
            </View>
          )}
        </Fragment>
      ))}
    </View>
  );
}
