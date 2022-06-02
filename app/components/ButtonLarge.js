import React from "react";
import { StyleSheet, TouchableHighlight, Text } from "react-native";
import colors from "../config/colors";
import TextCustom from "./TextCustom";

function ButtonLarge({ children, onPress, isEmoji = false, ...otherProps }) {
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={onPress}
      underlayColor={colors.primaryDark}
      {...otherProps}
    >
      <TextCustom fontSize={16} color={colors.white} fontWeight="Semi Bold">
        {children}
      </TextCustom>
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
});

export default ButtonLarge;
