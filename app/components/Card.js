import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";

function Card({
  children,
  padding = 24,
  style,
  marginBottom = true,
  cardList = false,
  ...otherProps
}) {
  return (
    <View
      style={[
        styles.card,
        marginBottom && styles.marginBottom,
        { padding: padding },
        cardList && styles.cardList,
        style,
      ]}
      {...otherProps}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 24,
  },
  marginBottom: {
    marginBottom: 24,
  },
  cardList: {
    paddingLeft: 24,
  },
});

export default Card;
