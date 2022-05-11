import React from "react";
import { StyleSheet } from "react-native";
import colors from "../config/colors";

import TextCustom from "../components/TextCustom";

function Header({ children, style, ...otherProps }) {
  return (
    <TextCustom
      fontWeight="Semi Bold"
      style={[styles.header, style]}
      {...otherProps}
    >
      {children}
    </TextCustom>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    marginBottom: 16,
    lineHeight: 28,
    color: colors.black,
     letterSpacing: -0.7,
  },
});

export default Header;
