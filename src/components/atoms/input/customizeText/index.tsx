import { View, TextInput, Text } from "react-native";
import ICustomizeText from "./customizeText.interface";
import CustomizeTextLogic from "./customizeText.logic";

export default function CustomizeTextInputField(props: ICustomizeText) {
  const { error, touch, ...rest } = props;
  const {} = CustomizeTextLogic();

  return (
    <View className="mb-2">
      <View className={`rounded-lg bg-[#EDEDED] px-3 mb-1 py-2 `}>
        <TextInput
          className="font-400 placeholder:font-400 placeholder:text-sm placeholder:text-muted -mb-0.5 text-xs"
          autoCorrect={false}
          placeholderTextColor="#ACACAC"
          multiline={true}
          numberOfLines={7}
          style={{ textAlignVertical: "top" }}
          {...rest}
        />
      </View>
      {error && touch && (
        <Text className="font-500 text-xs mt-2 text-red-400">{error}</Text>
      )}
    </View>
  );
}
