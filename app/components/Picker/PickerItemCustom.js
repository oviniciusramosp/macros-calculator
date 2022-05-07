import { StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import TextCustom from "../TextCustom";
import colors from "../../config/colors";

export default function PickerItemCustom({
  itemLabel,
  itemIconPath,
  selected,
  ...otherProps
}) {
  return (
    <TouchableOpacity
      style={[styles.item, selected ? styles.selected : null]}
      {...otherProps}
    >
      {itemIconPath && <Image style={styles.icon} source={itemIconPath} />}
      <TextCustom fontWeight={selected ? "Semi Bold" : "Regular"}>
        {itemLabel}
      </TextCustom>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 52,
    padding: 12,
    marginHorizontal: 12,
    borderRadius: 12,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  selected: {
    backgroundColor: colors.grayLight,
  },
  icon: {
    height: 30,
    width: 30,
    marginRight: 12,
  },
});
