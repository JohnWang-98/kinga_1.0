import { useWindowDimensions } from "react-native";

export default function PaginatorLogic() {
  const { width } = useWindowDimensions();
  return {
    width,
  };
}
