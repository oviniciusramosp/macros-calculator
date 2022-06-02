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
          <TextCustom fontWeight="Semi Bold" fontSize={20}>
            {title}
          </TextCustom>
          {value && (
            <TextCustom>
              {numberWithDot(value)} {unit}
            </TextCustom>
          )}
        </View>
        {kcal && percentage && (
          <View style={[styles.row, styles.spaceBetween]}>
            <TextCustom style={styles.macrosSubtitle}>
              {numberWithDot(kcal)} kcal
            </TextCustom>
            <TextCustom style={styles.macrosSubtitle}>
              {Math.round(percentage)} %
            </TextCustom>
          </View>
        )}
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
    padding: 24,
    paddingLeft: 35,
  },
  macrosIcons: {
    marginRight: 35,
  },
  macrosSubtitle: {
    fontSize: 14,
    color: colors.grayDark,
    marginTop: 4,
    lineHeight: 16,
  },
});
