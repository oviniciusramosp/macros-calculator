import React from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import colors from "../config/colors";
import * as Haptics from "expo-haptics";
import TextCustom from "../components/TextCustom";
import IconCustom from "./IconCustom";

function ToggleItem({
  children,
  onPress,
  emoji,
  icon,
  label,
  isSelected,
  ...otherProps
}) {
  return (
    <TouchableHighlight
      style={[styles.button, isSelected === true ? styles.selected : null]}
      onPress={onPress}
      onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
      underlayColor={isSelected ? colors.primaryDark : colors.primaryLight}
      {...otherProps}
    >
      <View style={styles.row}>
        {icon && (
          <IconCustom
            size="28"
            name={icon}
            color={isSelected ? colors.white : colors.grayDark}
          />
        )}
        {emoji && <TextCustom style={styles.toggleEmoji}>{emoji}</TextCustom>}
        {label && (
          <TextCustom
            fontWeight="Semi Bold"
            style={[
              styles.toggleLabel,
              isSelected ? null : styles.unselectedLabel,
            ]}
          >
            {label}
          </TextCustom>
        )}
        {children}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.fadedGrayLight,
    flex: 1,
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  toggleEmoji: {
    fontSize: 30,
    marginHorizontal: 6,
  },
  toggleLabel: {
    fontSize: 16,
    color: colors.white,
    marginHorizontal: 6,
  },
  unselectedLabel: {
    color: colors.grayDark,
  },
});

export default ToggleItem;
