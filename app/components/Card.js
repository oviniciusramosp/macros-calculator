import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";

function Card({ children, padding = 24, ...otherProps }) {
  return (
    <View style={[styles.card, { padding: padding }]} {...otherProps}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 24,
    marginBottom: 24,
  },
});

export default Card;
