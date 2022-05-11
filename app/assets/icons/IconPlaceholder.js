import * as React from "react";
import Svg, { Path, G } from "react-native-svg";

export default function IconPlaceholder({
  size = 24,
  color,
  filled,
  rotate = 0,
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      style={{ transform: [{ rotateY: rotate + "deg" }] }}
    >
      {filled ? (
        <G>
          <Path d="M12 21.5a9.263 9.263 0 01-3.712-.75 9.58 9.58 0 01-3.013-2.025 9.58 9.58 0 01-2.025-3.013A9.263 9.263 0 012.5 12c0-1.317.25-2.554.75-3.713a9.583 9.583 0 012.025-3.012A9.58 9.58 0 018.288 3.25 9.263 9.263 0 0112 2.5a9.27 9.27 0 013.713.75 9.583 9.583 0 013.012 2.025 9.583 9.583 0 012.025 3.012A9.27 9.27 0 0121.5 12c0 1.317-.25 2.554-.75 3.712a9.58 9.58 0 01-2.025 3.013 9.583 9.583 0 01-3.012 2.025A9.27 9.27 0 0112 21.5z" />
        </G>
      ) : (
        <G>
          <Path d="M12 21.5a9.263 9.263 0 01-3.712-.75 9.58 9.58 0 01-3.013-2.025 9.58 9.58 0 01-2.025-3.013A9.263 9.263 0 012.5 12c0-1.317.25-2.554.75-3.713a9.583 9.583 0 012.025-3.012A9.58 9.58 0 018.288 3.25 9.263 9.263 0 0112 2.5a9.27 9.27 0 013.713.75 9.583 9.583 0 013.012 2.025 9.583 9.583 0 012.025 3.012A9.27 9.27 0 0121.5 12c0 1.317-.25 2.554-.75 3.712a9.58 9.58 0 01-2.025 3.013 9.583 9.583 0 01-3.012 2.025A9.27 9.27 0 0112 21.5z" />
        </G>
      )}
    </Svg>
  );
}