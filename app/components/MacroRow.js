import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
// styles
import colors from "../config/colors";
// custom components
import TextCustom from "./TextCustom";
import IconCustom from "./IconCustom";
// data
import { UserData } from "../contexts/userdata";

export default function MacroRow({
  title,
  value,
  kcal,
  percentage,
  unit = "g",
  composition,
  preciseFactor,
  iconName = "ic_placeholder",
  iconColor = colors.primary,
}) {
  const { numberWithDot } = useContext(UserData);

  return (
    <View style={[styles.row, styles.macrosBox]}>
      <IconCustom
        size={28}
        name={iconName}
        style={styles.macrosIcons}
        color={iconColor}
      />
      <View style={styles.fillWidth}>
        <View style={[styles.row, styles.spaceBetween]}>
          <TextCustom fontWeight="Semi Bold" fontSize={16}>
            {title}
          </TextCustom>
          {value ? (
            <TextCustom>
              {numberWithDot(value)} {unit}
            </TextCustom>
          ) : null}
        </View>
        {(kcal && percentage) || composition ? (
          <View style={[styles.row, styles.spaceBetween]}>
            {kcal && percentage ? (
              <TextCustom style={styles.macrosSubtitle}>
                {numberWithDot(kcal)} kcal · {percentage}%
              </TextCustom>
            ) : (
              <TextCustom />
            )}
            <TextCustom style={styles.macrosSubtitle}>
              {preciseFactor !== composition[0] && preciseFactor !== undefined
                ? "~"
                : null}
              {numberWithDot(composition[0])} {composition[1]}
            </TextCustom>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  fillWidth: {
    flex: 1,
  },
  spaceBetween: {
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  macrosBox: {
    paddingVertical: 20,
    paddingRight: 24,
  },
  macrosIcons: {
    marginRight: 24,
  },
  macrosSubtitle: {
    fontSize: 14,
    color: colors.grayDark,
    marginTop: 4,
    lineHeight: 16,
  },
});
