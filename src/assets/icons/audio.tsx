import React from "react";
import { View } from "react-native";
import { Path, Svg } from "react-native-svg";

export default function AudioIcon() {
  return (
    <View className="bg-[#E981CC] rounded-md w-7 h-7 items-center justify-center">
      <Svg width="14" height="19" viewBox="0 0 14 19" fill="none">
        <Path
          d="M12.3 9C12.3 12 9.76 14.1 7 14.1C4.24 14.1 1.7 12 1.7 9H0C0 12.41 2.72 15.23 6 15.72V19H8V15.72C11.28 15.23 14 12.41 14 9M5.8 2.9C5.8 2.24 6.34 1.7 7 1.7C7.66 1.7 8.2 2.24 8.2 2.9L8.19 9.1C8.19 9.76 7.66 10.3 7 10.3C6.34 10.3 5.8 9.76 5.8 9.1M7 12C7.79565 12 8.55871 11.6839 9.12132 11.1213C9.68393 10.5587 10 9.79565 10 9V3C10 2.20435 9.68393 1.44129 9.12132 0.87868C8.55871 0.316071 7.79565 0 7 0C6.20435 0 5.44129 0.316071 4.87868 0.87868C4.31607 1.44129 4 2.20435 4 3V9C4 9.79565 4.31607 10.5587 4.87868 11.1213C5.44129 11.6839 6.20435 12 7 12Z"
          fill="white"
        />
      </Svg>
    </View>
  );
}
