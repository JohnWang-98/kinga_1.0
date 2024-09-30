import { Platform, StatusBar } from "react-native";

export default function AuthLogic() {
  const statusBarHeight =
    Platform.OS === "android" ? StatusBar.currentHeight : 0;

  return {
    statusBarHeight,
  };
}
