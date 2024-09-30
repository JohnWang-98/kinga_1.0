import { TouchableOpacityProps } from "react-native";

export default interface ITrigger extends TouchableOpacityProps {
  value: string;
  title: string;
  textClasses?: string;
  isActive?: boolean;
  onPress?: () => void;
}
