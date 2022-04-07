import React from "react";
import { StyleSheet, Text } from "react-native";
import colors from "../config/colors";

function Header({ children }) {
  return <Text style={styles.header}>{children}</Text>;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    lineHeight: 28,
    color: colors.grayDark,
  },
});

export default Header;
