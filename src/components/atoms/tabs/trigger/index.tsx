import { View, Text, TouchableOpacity } from "react-native";
import ITrigger from "./trigger.interface";
import TriggerLogic from "./trigger.logic";

export default function TabsTrigger(props: ITrigger) {
  const { value, title, isActive, onPress, textClasses, className, ...rest } =
    props;
  const {} = TriggerLogic();
  return (
    <TouchableOpacity
      className={`px-8 py-2.5 drop-shadow-2xl rounded-full  border-2 border-transparent w-1/2 ${
        isActive ? "bg-white border-[#CBD5E1]" : ""
      } ${className}`}
      onPress={onPress}
      {...props}
    >
      <Text
        className={`font-medium text-center font-500 ${
          isActive ? "text-[#334155]" : "text-[#64748B]"
        } ${textClasses}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
