import * as React from "react";
import Svg, { Path, G } from "react-native-svg";

export default function IconSkinny({ size = 24, color, filled, rotate = 0 }) {
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
          <Path d="M12 7a2 2 0 100-4 2 2 0 000 4zM4 8.75A.75.75 0 014.75 8h14.5a.75.75 0 010 1.5h-5.7L14 14l.864 5.619a.765.765 0 01-1.5.288l-1.17-5.063c-.047-.206-.341-.206-.389 0l-1.168 5.063a.765.765 0 01-1.501-.288L10 14l.45-4.5h-5.7A.75.75 0 014 8.75z" />
        </G>
      ) : (
        <G>
          <Path d="M12 7a2 2 0 100-4 2 2 0 000 4zM4 8.75A.75.75 0 014.75 8h14.5a.75.75 0 010 1.5h-5.7L14 14l.864 5.619a.765.765 0 01-1.5.288l-1.17-5.063c-.047-.206-.341-.206-.389 0l-1.168 5.063a.765.765 0 01-1.501-.288L10 14l.45-4.5h-5.7A.75.75 0 014 8.75z" />
        </G>
      )}
    </Svg>
  );
}
