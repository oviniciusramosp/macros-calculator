import React from "react";
import { StyleSheet, TouchableHighlight, Text } from "react-native";
import colors from "../config/colors";
import * as Haptics from "expo-haptics";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";

function FabButtonCustom({
  children,
  onPress,
  isEmoji = false,
  buttonStyle = "filled",
  size = "default",
  backgroundColor = "primary",
  ...otherProps
}) {
  return (
    <TouchableHighlight
      onPress={onPress}
      onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
      style={[
        styles.button,
        size === "small" ? styles.small : null,
        backgroundColor === "gray" ? styles.grayButton : null,
        otherProps.disabled === true
          ? styles.buttonDisabled
          : styles.buttonEnabled,
      ]}
      underlayColor={
        backgroundColor === "primary" ? colors.primaryDark : colors.primaryLight
      }
      {...otherProps}
    >
      <Text
        style={[
          (isEmoji = true ? styles.buttonEmojiLabel : styles.null),
          size === "small" ? styles.smallLabel : null,
          backgroundColor === "gray" ? styles.grayButtonLabel : null,
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
    fontSize: 22,
  },
  small: {
    height: 52,
    width: 52,
  },
  smallLabel: {
    fontSize: 22,
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
  grayButton: {
    backgroundColor: colors.grayLight,
    color: colors.primary,
  },
  grayButtonLabel: {
    color: colors.primary,
  },
});

export default FabButtonCustom;
