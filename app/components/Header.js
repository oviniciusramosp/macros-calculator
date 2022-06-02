import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import TextCustom from "../components/TextCustom";
import colors from "../config/colors";
import IconCustom from "./IconCustom";

function Header({
  children,
  style,
  hasButton = false,
  buttonAction,
  buttonIcon,
  ...otherProps
}) {
  return (
    <View style={styles.row}>
      <TextCustom
        fontWeight="Semi Bold"
        style={[styles.header, style]}
        {...otherProps}
      >
        {children}
      </TextCustom>
      {hasButton && (
        <TouchableOpacity onPress={buttonAction} style={styles.button}>
          <IconCustom name={buttonIcon} color={colors.grayDark} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    // flexDirection: "row",
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    lineHeight: 28,
    letterSpacing: -0.7,
  },
  button: {
    height: 52,
    width: 52,
    padding: 14,
    position: "absolute",
    right: -14,
    top: -12,
  },
});

export default Header;
