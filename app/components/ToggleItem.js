import React from "react";
import { StyleSheet, TouchableHighlight, Text } from "react-native";
import colors from "../config/colors";

function ToggleItem(props) {
  return (
    <TouchableHighlight
      style={[
        styles.button,
        props.isSelected === true ? styles.selected : null,
      ]}
      onPress={props.onPress}
      underlayColor={colors.primaryDark}
    >
      <Text style={styles.toggleLabel}>{props.children}</Text>
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
  toggleLabel: {
    color: colors.grayDark,
    fontSize: 30,
    fontWeight: "600",
  },
  selected: {
    backgroundColor: colors.primary,
  },
});

export default ToggleItem;
