import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import GoBackLogic from "./goBack.logic";
import GobackIcon from "@/assets/icons/goback";

export default function GoBack(props: TouchableOpacityProps) {
  const { ...rest } = props;
  const {} = GoBackLogic();
  return (
    <TouchableOpacity
      className="rounded-full border border-[#2563EB] w-10 h-10 items-center justify-center mt-5"
      {...rest}
    >
      <GobackIcon />
    </TouchableOpacity>
  );
}
