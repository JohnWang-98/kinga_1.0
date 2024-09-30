import { ReactNode } from "react";
import { TextInputProps } from "react-native";

export default interface ITextInputField extends TextInputProps {
  icon: ReactNode;
  error: any;
  touch: any;
  password?: boolean;
  viewClassName?: string;
}
