import React from "react";
import { StyleSheet, TouchableHighlight, Text } from "react-native";
import colors from "../config/colors";
import * as Haptics from "expo-haptics";

function ToggleItem({
  children,
  onPress,
  isEmoji = false,
  isSelected,
  ...otherProps
}) {
  return (
    <TouchableHighlight
      style={[styles.button, isSelected === true ? styles.selected : null]}
      onPress={onPress}
      onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
      underlayColor={colors.primaryDark}
      {...otherProps}
    >
      <Text
        style={[
          isEmoji ? styles.toggleEmoji : styles.toggleLabel,
          isSelected ? null : styles.unselectedLabel,
        ]}
      >
        {children}
      </Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    backgroundColor: colors.grayLight,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    flex: 1,
  },
  toggleEmoji: {
    fontSize: 30,
    fontWeight: "600",
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
  selected: {
    backgroundColor: colors.primary,
  },
  unselectedLabel: {
    color: colors.grayDark,
  },
});

export default ToggleItem;
