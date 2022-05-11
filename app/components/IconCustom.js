import * as React from "react";
import colors from "../config/colors";
import { View } from "react-native";
// Icons Available
import IconWeight from "../assets/icons/IconWeight";
import IconHeight from "../assets/icons/IconHeight";
import IconCake from "../assets/icons/IconCake";
import IconGenderMale from "../assets/icons/IconGenderMale";
import IconGenderFemale from "../assets/icons/IconGenderFemale";
import IconGenders from "../assets/icons/IconGenders";
import IconArrow from "../assets/icons/IconArrow";
import IconPlaceholder from "../assets/icons/IconPlaceholder";
import IconFire from "../assets/icons/IconFire";
import IconFaceSerious from "../assets/icons/IconFaceSerious";
import IconChevron from "../assets/icons/IconChevron";

export default function IconCustom({
  color = colors.primary,
  size = 24,
  name,
  rotate,
  filled = false,
}) {
  return (
    <View>
      {(() => {
        switch (name) {
          // A
          case "ic_arrow":
            return (
              <IconArrow
                color={color}
                size={size}
                filled={filled}
                rotate={rotate}
              />
            );
          // B
          // C
          case "ic_cake":
            return (
              <IconCake
                color={color}
                size={size}
                filled={filled}
                rotate={rotate}
              />
            );
          case "ic_chevron":
            return (
              <IconChevron
                color={color}
                size={size}
                filled={filled}
                rotate={rotate}
              />
            );
          // D
          // E
          // F
          case "ic_face_serious":
            return (
              <IconFaceSerious
                color={color}
                size={size}
                filled={filled}
                rotate={rotate}
              />
            );
          case "ic_female":
            return (
              <IconGenderFemale
                color={color}
                size={size}
                filled={filled}
                rotate={rotate}
              />
            );
          case "ic_fire":
            return (
              <IconFire
                color={color}
                size={size}
                filled={filled}
                rotate={rotate}
              />
            );
          // G
          case "ic_gender":
            return (
              <IconGenders
                color={color}
                size={size}
                filled={filled}
                rotate={rotate}
              />
            );
          // H
          case "ic_height":
            return (
              <IconHeight
                color={color}
                size={size}
                filled={filled}
                rotate={rotate}
              />
            );
          // I
          // J
          // K
          // L
          // M
          case "ic_male":
            return (
              <IconGenderMale
                color={color}
                size={size}
                filled={filled}
                rotate={rotate}
              />
            );
          // N
          // O
          // P
          case "ic_placeholder":
            return (
              <IconPlaceholder
                color={color}
                size={size}
                filled={filled}
                rotate={rotate}
              />
            );
          // Q
          // R
          // S
          // T
          // U
          // V
          // W
          case "ic_weight":
            return (
              <IconWeight
                color={color}
                size={size}
                filled={filled}
                rotate={rotate}
              />
            );
          // X
          // Y
          // Z

          default:
            return (
              <IconPlaceholder
                color={color}
                size={size}
                filled={filled}
                rotate={rotate}
              />
            );
        }
      })()}
    </View>
  );
}
