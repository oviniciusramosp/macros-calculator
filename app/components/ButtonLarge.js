import React from "react";
import { StyleSheet, TouchableHighlight, Text } from "react-native";
import colors from "../config/colors";

function ButtonLarge({ children, onPress, isEmoji = false }) {
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={onPress}
      underlayColor={colors.primaryDark}
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
    height: 52,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  buttonEmojiLabel: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "600",
  },
  buttonEmojiLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ButtonLarge;