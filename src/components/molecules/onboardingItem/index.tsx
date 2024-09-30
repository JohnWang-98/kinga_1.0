import { View, Text, useWindowDimensions, Image } from "react-native";
import React from "react";
import IOnboardingItem from "./onboardingItem.interface";

const OnboardingItems = (props: IOnboardingItem) => {
  const { width } = useWindowDimensions();
  const { item } = props;

  return (
    <View
      className={`flex-1 justify-center items-center px-3 gap-y-5 ${item.bgColor}`}
      style={[{ width }]}
    >
      <View className="gap-4">
        {item.id === "1" ? (
          <Text className="font-600 text-[49px] leading-[55px] text-center text-white">
            Welcome to <Text className="text-[#47B5BD]">KINGA</Text>
          </Text>
        ) : (
          <Text className="font-600 text-2xl text-white">{item.title}</Text>
        )}
        <Text className="font-400 text-[16px] leading-5 text-white">
          {item.description}
        </Text>
      </View>
      <Image source={item.image} className="contain" />
    </View>
  );
};

export default OnboardingItems;
