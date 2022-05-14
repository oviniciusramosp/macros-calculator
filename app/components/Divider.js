import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";

function Divider({ style, color, ...otherProps }) {
  return (
    <View
      style={[styles.divider, color ? { backgroundColor: color } : null, style]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    flex: 1,
    backgroundColor: colors.grayLight,
  },
});

export default Divider;
