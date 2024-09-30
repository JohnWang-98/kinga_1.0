import React from 'react';
import {
  Defs,
  // FeBlend,
  FeColorMatrix,
  // FeComposite,
  // FeFlood,
  FeGaussianBlur,
  FeOffset,
  Filter,
  G,
  Path,
  Svg,
} from 'react-native-svg';

function HomeIcon() {
  return (
    <Svg width="18" height="21" viewBox="0 0 18 21" fill="none">
      <Path
        d="M17.0001 7.00001L11.0001 1.74001C10.4501 1.24805 9.73803 0.976074 9.0001 0.976074C8.26216 0.976074 7.55012 1.24805 7.0001 1.74001L1.00009 7.00001C0.682463 7.28408 0.428995 7.63256 0.256567 8.02225C0.0841385 8.41194 -0.00329256 8.83389 9.47941e-05 9.26V18C9.47941e-05 18.7957 0.316165 19.5587 0.878775 20.1213C1.44138 20.6839 2.20445 21 3.0001 21H15.0001C15.7957 21 16.5588 20.6839 17.1214 20.1213C17.684 19.5587 18.0001 18.7957 18.0001 18V9.25C18.0021 8.82557 17.9139 8.40555 17.7416 8.01769C17.5692 7.62983 17.3165 7.28296 17.0001 7.00001V7.00001ZM11.0001 19H7.0001V14C7.0001 13.7348 7.10545 13.4804 7.29299 13.2929C7.48053 13.1054 7.73488 13 8.0001 13H10.0001C10.2653 13 10.5197 13.1054 10.7072 13.2929C10.8947 13.4804 11.0001 13.7348 11.0001 14V19ZM16.0001 18C16.0001 18.2652 15.8947 18.5196 15.7072 18.7071C15.5197 18.8946 15.2653 19 15.0001 19H13.0001V14C13.0001 13.2044 12.684 12.4413 12.1214 11.8787C11.5588 11.3161 10.7957 11 10.0001 11H8.0001C7.20445 11 6.44138 11.3161 5.87877 11.8787C5.31617 12.4413 5.0001 13.2044 5.0001 14V19H3.0001C2.73488 19 2.48052 18.8946 2.29299 18.7071C2.10545 18.5196 2.0001 18.2652 2.0001 18V9.25C2.00027 9.10802 2.03069 8.9677 2.08931 8.83838C2.14794 8.70907 2.23343 8.59372 2.3401 8.50001L8.3401 3.25001C8.52258 3.08969 8.75719 3.00127 9.0001 3.00127C9.243 3.00127 9.47761 3.08969 9.6601 3.25001L15.6601 8.50001C15.7668 8.59372 15.8523 8.70907 15.9109 8.83838C15.9695 8.9677 15.9999 9.10802 16.0001 9.25V18Z"
        fill="#959398"
      />
    </Svg>
  );
}

function HomeIconFocus() {
  return (
    <Svg width="47" height="48" viewBox="0 0 47 48" fill="none">
      <G filter="url(#filter0_d_90_1013)">
        <Path
          d="M36.625 36.1667C36.625 36.5535 36.4714 36.9244 36.1979 37.1979C35.9244 37.4714 35.5534 37.625 35.1667 37.625H11.8333C11.4466 37.625 11.0756 37.4714 10.8021 37.1979C10.5286 36.9244 10.375 36.5535 10.375 36.1667V20.8396C10.3748 20.6174 10.4255 20.398 10.523 20.1984C10.6206 19.9987 10.7625 19.824 10.9379 19.6875L22.6046 10.6123C22.8606 10.4132 23.1757 10.3051 23.5 10.3051C23.8243 10.3051 24.1394 10.4132 24.3954 10.6123L36.0621 19.6875C36.2375 19.824 36.3794 19.9987 36.477 20.1984C36.5745 20.398 36.6252 20.6174 36.625 20.8396V36.1667Z"
          fill="#50D6E2"
        />
      </G>
      <Defs>
        <Filter
          id="filter0_d_90_1013"
          x="0.975"
          y="0.905054"
          width="45.05"
          height="46.1199"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB">
          {/* <FeFlood flood-opacity="0" result="BackgroundImageFix" /> */}
          <FeColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <FeOffset />
          <FeGaussianBlur stdDeviation="0.7" />
          {/* <FeComposite in2="hardAlpha" operator="out" /> */}
          <FeColorMatrix
            type="matrix"
            values="0 0 0 0 0.315062 0 0 0 0 0.839304 0 0 0 0 0.886111 0 0 0 0.79 0"
          />
          {/* <FeBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_90_1013"
          />
          <FeBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_90_1013"
            result="shape"
          /> */}
        </Filter>
      </Defs>
    </Svg>
  );
}

export { HomeIcon, HomeIconFocus };