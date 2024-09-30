import { TouchableOpacityProps } from "react-native";

export default interface IPrimary extends TouchableOpacityProps {
  label: string;
  isLoading?: boolean;
  textClassName?: string;

}