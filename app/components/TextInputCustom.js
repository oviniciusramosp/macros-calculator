import React, { useState, useRef } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";
import * as Haptics from "expo-haptics";
import TextCustom from "../components/TextCustom";

function TextInputCustom({ children, icon, sufix, style, ...otherProps }) {
  const [content, onChangeContent] = useState();
  const [isActive, setActive] = useState(false);
  const textInputContent = useRef();

  function focusInput() {
    textInputContent.current.focus();
  }

  return (
    <TouchableOpacity
      style={[styles.inputWithLabel, style]}
      onPress={focusInput}
      activeOpacity={1}
    >
      {children && (
        <TextCustom fontWeight="Semi Bold" style={styles.label}>
          {children}
        </TextCustom>
      )}
      <View
        style={[
          styles.input,
          isActive === true ? styles.inputFocus : styles.inpuinputUnfocus,
        ]}
      >
        {icon && <Image style={styles.icon} source={icon} />}
        <TextInput
          style={styles.inputText}
          onChangeText={onChangeContent}
          ref={textInputContent}
          value={content}
          maxLength={3}
          {...otherProps}
          onFocus={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setActive(true);
          }}
          onBlur={() => setActive(false)}
        />

        {sufix && <TextCustom>{sufix}</TextCustom>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.grayLight,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 11,
    borderWidth: 3,
    borderColor: colors.grayLight,
    height: 52,
  },
  inputText: {
    color: colors.grayDark,
    paddingRight: 4,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    height: "100%",
    marginLeft: 12,
  },
  inputFocus: {
    borderColor: colors.primary,
  },
  inputUnfocus: {},
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
    letterSpacing: -0.5,
  },
  icon: {
    height: 30,
    width: 30,
  },
});

export default TextInputCustom;
