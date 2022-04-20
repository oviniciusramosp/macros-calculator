import React from "react";
import { StyleSheet, TouchableHighlight, Text } from "react-native";
import colors from "../config/colors";
import * as Haptics from "expo-haptics";

function FabButtonCustom({
  children,
  onPress,
  isEmoji = false,
  buttonStyle = "filled",
  size = "default",
  ...otherProps
}) {
  return (
    <TouchableHighlight
      style={[
        styles.button,
        size === "small" ? styles.small : null,
        otherProps.disabled === true
          ? styles.buttonDisabled
          : styles.buttonEnabled,
      ]}
      onPress={onPress}
      onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
      underlayColor={colors.primaryDark}
      {...otherProps}
    >
      <Text
        style={[
          (isEmoji = true ? styles.buttonEmojiLabel : styles.null),
          size === "small" ? styles.smallLabel : null,
        ]}
      >
        {children}
      </Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 72,
    width: 72,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 72,
  },
  small: {
    height: 52,
    width: 52,
  },
  buttonDisabled: {
    backgroundColor: colors.grayDark,
    opacity: 0.3,
    color: colors.grayLight,
  },
  buttonEmojiLabel: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "600",
  },
  smallLabel: {
    fontSize: 22,
  },
});

export default FabButtonCustom;
