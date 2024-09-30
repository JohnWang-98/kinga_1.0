import { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";

export default interface IIcon extends TouchableOpacityProps {
  label: string;
  icon: ReactNode;
}
