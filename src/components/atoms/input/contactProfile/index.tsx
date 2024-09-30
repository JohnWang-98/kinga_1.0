import { View, TextInput } from "react-native";
import IContactProfile from "./contactProfile.interface";
import ContactProfileLogic from "./contactProfile.logic";

export default function ContactProfileInputField(props: IContactProfile) {
  const { error, touch, ...rest } = props;
  const {} = ContactProfileLogic();
  return (
    <View className="mb-4">
      <View
        className={`rounded-lg bg-[#EDEDED] flex-row items-center px-3 mb-1 h-8 w-60`}
      >
        <TextInput
          className="font-400 flex-1 py-0 items-center placeholder:font-400 placeholder:text-sm placeholder:text-muted -mb-0.5 text-xs"
          autoCorrect={false}
          placeholderTextColor="#ACACAC"
          {...rest}
        />
      </View>
    </View>
  );
}
