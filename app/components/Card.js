import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
  },
});

export default Card;
