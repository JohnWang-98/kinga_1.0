import { useState } from "react";

export default function TextInputFieldLogic(password: boolean | undefined) {
  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return {
    isFocused,
    setIsFocused,
    hidePassword,
    setHidePassword,
  };
}
