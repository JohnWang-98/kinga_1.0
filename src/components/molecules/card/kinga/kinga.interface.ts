import { TouchableOpacityProps } from "react-native";

export default interface IKinga extends TouchableOpacityProps {
  title: string;
  titleClassName?: string;
  subtitle: string;
  arrow: boolean;
}
