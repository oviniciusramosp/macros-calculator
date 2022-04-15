import React from "react";
import { StyleSheet, TouchableHighlight, Text } from "react-native";
import colors from "../config/colors";

function FabButtonCustom({ children, onPress, isEmoji = false }) {
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
    height: 72,
    width: 72,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 72,
  },
  buttonEmojiLabel: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "600",
  },
});

export default FabButtonCustom;
