import React from 'react';
import {View} from 'react-native';
import {Path, Svg} from 'react-native-svg';

export default function MicIcon({length = 22, color = '#5D5DFB'}) {
  return (
    <View style={{marginLeft: 8, marginRight: 4}}>
      <Svg
        width={length * 0.77}
        height={length}
        viewBox="0 0 13 18"
        fill="none">
        <Path
          d="M6.43335 11.7227C8.08521 11.7227 9.19751 10.4858 9.19751 8.71777V3.16455C9.19751 1.38818 8.08521 0.159668 6.43335 0.159668C4.77319 0.159668 3.66089 1.38818 3.66089 3.16455V8.71777C3.66089 10.4858 4.77319 11.7227 6.43335 11.7227ZM0.48999 8.85059C0.48999 12.1045 2.63989 14.3872 5.80249 14.6528V16.5869H2.7229C2.37427 16.5869 2.09204 16.8691 2.09204 17.2178C2.09204 17.5664 2.37427 17.8403 2.7229 17.8403H10.1355C10.4841 17.8403 10.7664 17.5664 10.7664 17.2178C10.7664 16.8691 10.4841 16.5869 10.1355 16.5869H7.05591V14.6528C10.2268 14.3872 12.3684 12.1045 12.3684 8.85059V7.16553C12.3684 6.81689 12.0945 6.54297 11.7458 6.54297C11.3972 6.54297 11.115 6.81689 11.115 7.16553V8.80078C11.115 11.6313 9.27222 13.5073 6.43335 13.5073C3.58618 13.5073 1.74341 11.6313 1.74341 8.80078V7.16553C1.74341 6.81689 1.46948 6.54297 1.11255 6.54297C0.763916 6.54297 0.48999 6.81689 0.48999 7.16553V8.85059Z"
          fill={color}
          fillOpacity="0.88"
        />
      </Svg>
    </View>
  );
}
