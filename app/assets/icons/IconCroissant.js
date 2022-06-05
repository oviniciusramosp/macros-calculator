import * as React from "react";
import Svg, { Path, G } from "react-native-svg";

export default function IconCroissant({
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
      style={{ transform: [{ rotate: rotate + "deg" }] }}
    >
      {filled ? (
        <G>
          <Path d="M19.975 17.175c.417.217.771.167 1.063-.15.291-.317.329-.675.112-1.075l-1.675-3.15-1.35 3.425 1.85.95zm-5.15-.925h1.65l2.425-6c.1-.25.104-.454.013-.613a.885.885 0 00-.413-.362l-2-.8a.801.801 0 00-.662-.013c-.209.092-.33.263-.363.513l-.65 7.275zm-7.3 0h1.65l-.65-7.325a.579.579 0 00-.35-.463c-.2-.091-.425-.087-.675.013l-2 .8c-.217.083-.35.217-.4.4-.05.183-.033.392.05.625l2.375 5.95zm-3.5.925l1.85-.95L4.55 12.8l-1.7 3.175c-.233.417-.196.775.113 1.075.308.3.662.342 1.062.125zm6.65-.925h2.65l.775-8.675a.674.674 0 00-.175-.588.758.758 0 00-.575-.237h-2.7c-.183 0-.358.075-.525.225a.64.64 0 00-.225.55l.775 8.725zM3.5 18.775c-.6 0-1.125-.217-1.575-.65-.45-.433-.675-1-.675-1.7a2.324 2.324 0 01.275-1.1L3.8 11c-.267-.717-.292-1.354-.075-1.913.217-.558.625-.962 1.225-1.212l2-.8c.283-.117.55-.18.8-.188.25-.008.492.046.725.163.15-.533.417-.967.8-1.3.383-.333.85-.5 1.4-.5h2.675c.55 0 1.013.158 1.388.475.375.317.645.742.812 1.275.2-.067.438-.096.713-.088.275.009.537.063.787.163l2 .8c.6.233 1.02.646 1.262 1.238.242.591.213 1.204-.087 1.837l2.275 4.325a2.24 2.24 0 01.275 1.025c0 .833-.27 1.454-.812 1.863-.542.408-1.088.612-1.638.612-.167 0-.325-.017-.475-.05a2.079 2.079 0 01-.475-.175l-1.6-.8H6.2l-1.475.775a2.218 2.218 0 01-.562.187c-.209.042-.43.063-.663.063z" />
        </G>
      ) : (
        <G>
          <Path d="M19.975 17.175c.417.217.771.167 1.063-.15.291-.317.329-.675.112-1.075l-1.675-3.15-1.35 3.425 1.85.95zm-5.15-.925h1.65l2.425-6c.1-.25.104-.454.013-.613a.885.885 0 00-.413-.362l-2-.8a.801.801 0 00-.662-.013c-.209.092-.33.263-.363.513l-.65 7.275zm-7.3 0h1.65l-.65-7.325a.579.579 0 00-.35-.463c-.2-.091-.425-.087-.675.013l-2 .8c-.217.083-.35.217-.4.4-.05.183-.033.392.05.625l2.375 5.95zm-3.5.925l1.85-.95L4.55 12.8l-1.7 3.175c-.233.417-.196.775.113 1.075.308.3.662.342 1.062.125zm6.65-.925h2.65l.775-8.675a.674.674 0 00-.175-.588.758.758 0 00-.575-.237h-2.7c-.183 0-.358.075-.525.225a.64.64 0 00-.225.55l.775 8.725zM3.5 18.775c-.6 0-1.125-.217-1.575-.65-.45-.433-.675-1-.675-1.7a2.324 2.324 0 01.275-1.1L3.8 11c-.267-.717-.292-1.354-.075-1.913.217-.558.625-.962 1.225-1.212l2-.8c.283-.117.55-.18.8-.188.25-.008.492.046.725.163.15-.533.417-.967.8-1.3.383-.333.85-.5 1.4-.5h2.675c.55 0 1.013.158 1.388.475.375.317.645.742.812 1.275.2-.067.438-.096.713-.088.275.009.537.063.787.163l2 .8c.6.233 1.02.646 1.262 1.238.242.591.213 1.204-.087 1.837l2.275 4.325a2.24 2.24 0 01.275 1.025c0 .833-.27 1.454-.812 1.863-.542.408-1.088.612-1.638.612-.167 0-.325-.017-.475-.05a2.079 2.079 0 01-.475-.175l-1.6-.8H6.2l-1.475.775a2.218 2.218 0 01-.562.187c-.209.042-.43.063-.663.063z" />
        </G>
      )}
    </Svg>
  );
}
