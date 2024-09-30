import { Animated } from "react-native";

export default interface IPaginator {
  slides: ISlides[];
  scrollX: Animated.Value;
}
