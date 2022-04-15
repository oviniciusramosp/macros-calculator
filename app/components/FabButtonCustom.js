import React from "react";
import { StyleSheet, TouchableHighlight, Text } from "react-native";
import colors from "../config/colors";
import * as Haptics from "expo-haptics";

function FabButtonCustom({
  children,
  onPress,
  isEmoji = false,
  ...otherProps
}) {
  return (
    <TouchableHighlight
      style={[
        styles.button,
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
        style={(isEmoji = true ? styles.buttonEmojiLabel : styles.buttonLabel)}
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
});

export default FabButtonCustom;
