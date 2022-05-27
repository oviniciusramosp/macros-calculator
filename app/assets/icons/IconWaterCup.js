import * as React from "react";
import Svg, { Path, G } from "react-native-svg";

export default function IconWaterCup({ size = 24, color, filled, rotate = 0 }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      style={{ transform: [{ rotate: rotate + "deg" }] }}
    >
      {filled ? (
        <G>
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.3 21.5c-.483 0-.9-.154-1.25-.462a1.747 1.747 0 01-.6-1.163L3.675 3.5a.858.858 0 01.213-.713.886.886 0 01.687-.287h14.85a.89.89 0 01.688.287c.175.192.245.43.212.713L18.55 19.875c-.05.467-.246.854-.588 1.163a1.782 1.782 0 01-1.237.462H7.3zm-.225-1.587a.376.376 0 01-.125-.213l-.987-9.112c.708.367 1.584.662 2.537.662 1.459 0 2.738-.692 3.505-1.27.29.212.644.433 1.035.628.685.343 1.553.642 2.46.642s1.775-.299 2.46-.642l.079-.04-.989 9.132a.49.49 0 01-.112.2.274.274 0 01-.213.1H7.3a.334.334 0 01-.225-.087zm11.17-11.247a5.633 5.633 0 01-.955.6c-.565.283-1.197.484-1.79.484s-1.225-.201-1.79-.483c-.566-.283-.996-.614-1.18-.797a.75.75 0 00-1.06 0c-.426.425-1.646 1.28-2.97 1.28-1.137 0-2.198-.63-2.744-1.078L5.25 4h13.5l-.505 4.666z"
          />
        </G>
      ) : (
        <G>
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.3 21.5c-.483 0-.9-.154-1.25-.462a1.747 1.747 0 01-.6-1.163L3.675 3.5a.858.858 0 01.213-.713.886.886 0 01.687-.287h14.85a.89.89 0 01.688.287c.175.192.245.43.212.713L18.55 19.875c-.05.467-.246.854-.588 1.163a1.782 1.782 0 01-1.237.462H7.3zm-.225-1.587a.376.376 0 01-.125-.213l-.987-9.112c.708.367 1.584.662 2.537.662 1.459 0 2.738-.692 3.505-1.27.29.212.644.433 1.035.628.685.343 1.553.642 2.46.642s1.775-.299 2.46-.642l.079-.04-.989 9.132a.49.49 0 01-.112.2.274.274 0 01-.213.1H7.3a.334.334 0 01-.225-.087zm11.17-11.247a5.633 5.633 0 01-.955.6c-.565.283-1.197.484-1.79.484s-1.225-.201-1.79-.483c-.566-.283-.996-.614-1.18-.797a.75.75 0 00-1.06 0c-.426.425-1.646 1.28-2.97 1.28-1.137 0-2.198-.63-2.744-1.078L5.25 4h13.5l-.505 4.666z"
          />
        </G>
      )}
    </Svg>
  );
}