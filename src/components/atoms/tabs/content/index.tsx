import { View, Text } from "react-native";
import IContent from "./content.interface";

export default function TabsContent(props: IContent) {
  const { children } = props;
  return <View className="mt-5">{children}</View>;
}
