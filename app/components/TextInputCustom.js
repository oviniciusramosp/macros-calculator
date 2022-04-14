import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text, Image } from "react-native";
import colors from "../config/colors";

function TextInputCustom({ children, icon, sufix, ...otherProps }) {
  const [text, onChangeText] = useState("Useless Text");
  const [number, onChangeNumber] = useState();
  const [isActive, setActive] = useState(false);

  return (
    <View style={styles.inputWithLabel}>
      <Text style={styles.label}>{children}</Text>
      <View style={styles.input}>
        {icon && <Image style={styles.icon} source={icon} />}
        <TextInput
          style={styles.inputText}
          onChangeText={onChangeNumber}
          value={number}
          maxLength={3}
          {...otherProps}
          // onFocus={() => setActive(true)}
        />

        {sufix && <Text>{sufix}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.grayLight,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 11,
  },
  inputText: {
    color: colors.grayDark,
    paddingRight: 4,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    height: 52,
    marginLeft: 12,
  },
  inputWithLabel: {
    flex: 1,
    flexDirection: "column",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 16,
    marginBottom: 6,
    color: colors.grayDark,
  },
  icon: {
    height: 30,
    width: 30,
  },
});

export default TextInputCustom;
