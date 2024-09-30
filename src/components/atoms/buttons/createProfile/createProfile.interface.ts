import { TouchableOpacityProps } from "react-native";

export default interface ICreateProfile extends TouchableOpacityProps {
  label: string;
  isLoading: boolean;
}
