import { StyleSheet, TouchableHighlight, View } from "react-native";
import React from "react";
import TextCustom from "../TextCustom";
import colors from "../../config/colors";
import IconCustom from "../IconCustom";

export default function PickerItemCustom({
  label,
  description,
  icon,
  selected,
  iconRotate,
  ...otherProps
}) {
  return (
    <TouchableHighlight
      style={[styles.item, selected ? styles.selected : null]}
      underlayColor={selected ? colors.primaryDark : colors.primaryLight}
      {...otherProps}
    >
      <View style={styles.row}>
        {icon && (
          <IconCustom
            name={icon}
            size={28}
            filled={selected}
            rotate={iconRotate}
            style={styles.icon}
            color={selected ? colors.white : colors.primary}
          />
        )}
        <View>
          <TextCustom
            style={[styles.label, selected ? styles.labelSelected : null]}
            fontWeight={selected ? "Semi Bold" : "Regular"}
          >
            {label}
          </TextCustom>
          {description && (
            <TextCustom
              style={[
                styles.description,
                selected ? styles.descriptionSelected : null,
              ]}
            >
              {description}
            </TextCustom>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  item: {
    minHeight: 52,
    padding: 12,
    marginHorizontal: 12,
    borderRadius: 12,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  selected: {
    backgroundColor: colors.primary,
  },
  icon: {
    marginRight: 12,
  },
  label: {
    fontSize: 16,
  },
  labelSelected: {
    color: colors.white,
  },
  description: {
    fontSize: 14,
    color: colors.grayDark,
    marginTop: 4,
  },
  descriptionSelected: {
    color: colors.grayLight,
  },
});
