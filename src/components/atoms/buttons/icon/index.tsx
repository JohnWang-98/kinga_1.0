import { View, Text, TouchableOpacity } from "react-native";
import IIcon from "./icon.interface";
import IconLogic from "./icon.logic";
import { cn } from "@/lib/utils";

export default function IconButton(props: IIcon) {
  const { className, label, icon, ...rest } = props;
  const {} = IconLogic();
  return (
    <TouchableOpacity
      {...rest}
      className={cn(
        "border-[#CBD5E1] rounded-full border-2 flex-row items-center w-[49%] h-14 justify-center ",
        className
      )}
    >
      {icon}
      <Text className="text-muted font-500 ml-2">{label}</Text>
    </TouchableOpacity>
  );
}
