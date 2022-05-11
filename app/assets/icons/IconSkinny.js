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
          <Path d="M12 6a2 2 0 100-4 2 2 0 000 4zM4 7.75A.75.75 0 014.75 7h14.5a.75.75 0 010 1.5h-5.382a.3.3 0 00-.3.325L14 14l.893 7.141a.764.764 0 01-1.51.236l-1.186-6.329c-.041-.217-.353-.217-.394 0l-1.186 6.329a.764.764 0 01-1.51-.236L10 14l.431-5.175a.3.3 0 00-.299-.325H4.75A.75.75 0 014 7.75z" />
        </G>
      ) : (
        <G>
          <Path d="M12 6a2 2 0 100-4 2 2 0 000 4zM4 7.75A.75.75 0 014.75 7h14.5a.75.75 0 010 1.5h-5.382a.3.3 0 00-.3.325L14 14l.893 7.141a.764.764 0 01-1.51.236l-1.186-6.329c-.041-.217-.353-.217-.394 0l-1.186 6.329a.764.764 0 01-1.51-.236L10 14l.431-5.175a.3.3 0 00-.299-.325H4.75A.75.75 0 014 7.75z" />
        </G>
      )}
    </Svg>
  );
}
