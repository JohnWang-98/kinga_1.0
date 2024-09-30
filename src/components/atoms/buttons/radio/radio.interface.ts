import { TouchableOpacityProps } from "react-native";

export default interface IRadio extends TouchableOpacityProps {
  selected: boolean;
  isMultiSelect?: boolean;
  onPress: () => void;
}
