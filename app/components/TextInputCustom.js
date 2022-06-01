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
import IconCustom from "./IconCustom";

function TextInputCustom({
  icon = "ic_placeholder",
  sufix,
  style,
  label,
  ...otherProps
}) {
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
      {label && (
        <TextCustom fontWeight="Semi Bold" style={styles.label}>
          {label}
        </TextCustom>
      )}
      <View
        style={[
          styles.input,
          isActive === true ? styles.inputFocus : styles.inpuinputUnfocus,
        ]}
      >
        {icon && (
          <IconCustom name={icon} size="28" filled={isActive ? true : false} />
        )}
        <TextInput
          style={styles.inputText}
          onChangeText={onChangeContent}
          placeholderTextColor={colors.grayDark}
          enablesReturnKeyAutomatically={true}
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

        {sufix && <TextCustom style={styles.sufixLabel}>{sufix}</TextCustom>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11,
    borderWidth: 1,
    borderColor: colors.fadedGrayLight,
    height: 52,
  },
  inputFocus: {
    borderColor: colors.primary,
    borderWidth: 3,
    paddingHorizontal: 9,
  },
  inputText: {
    color: colors.black,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    height: "100%",
    marginLeft: 12,
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
    color: colors.black,
    letterSpacing: -0.5,
  },
  sufixLabel: {
    marginLeft: 12,
  },
});

export default TextInputCustom;
