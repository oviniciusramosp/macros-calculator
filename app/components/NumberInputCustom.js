import React, { useState, useRef } from "react";
import { TextInput, StyleSheet, View, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import * as Haptics from "expo-haptics";
import TextCustom from "../components/TextCustom";
import IconCustom from "./IconCustom";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

function NumberInputCustom({
  children,
  icon = "ic_placeholder",
  sufix,
  style,
  label,
  content,
  onChangeText,
  onChangeContent,
  valueToAdd = 1,
  maxValue = 99,
  minValue = 0,
  ...otherProps
}) {
  const [isActive, setActive] = useState(false);
  const [isPressingMinus, setIsPressingMinus] = useState(false);
  const [isPressingPlus, setIsPressingPlus] = useState(false);

  const textInputContent = useRef();

  function focusInput() {
    textInputContent.current.focus();
  }

  function sumValue() {
    var newValue = content * 1 + valueToAdd;
    if (newValue > maxValue) newValue = maxValue;
    onChangeContent(newValue.toString());
  }

  function subtractValue() {
    var newValue = content * 1 - valueToAdd;
    if (newValue < minValue) newValue = minValue;
    onChangeContent(newValue.toString());
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
        <Pressable
          onPressIn={() => setIsPressingMinus(true)}
          onPressOut={() => setIsPressingMinus(false)}
          onPress={() => subtractValue()}
          disabled={content <= minValue ? true : false}
          style={styles.button}
        >
          <IconCustom
            name={"ic_minus"}
            size="28"
            filled={isPressingMinus ? true : false}
            color={content <= minValue ? colors.grayDark : colors.primary}
          />
        </Pressable>
        <View style={styles.inputValue}>
          <TextInput
            style={styles.inputText}
            onChangeText={onChangeContent}
            placeholderTextColor={colors.grayDark}
            enablesReturnKeyAutomatically={true}
            ref={textInputContent}
            value={content.toString()}
            maxLength={3}
            placeholder="0"
            keyboardType="number-pad"
            {...otherProps}
            onFocus={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setActive(true);
            }}
            onBlur={() => setActive(false)}
          />

          {sufix && <TextCustom style={styles.sufixLabel}>{sufix}</TextCustom>}
        </View>
        <Pressable
          onPressIn={() => setIsPressingPlus(true)}
          onPressOut={() => setIsPressingPlus(false)}
          onPress={() => sumValue()}
          disabled={content >= maxValue ? true : false}
          style={styles.button}
        >
          <IconCustom
            name={"ic_plus"}
            size="28"
            filled={isPressingPlus ? true : false}
            color={content >= maxValue ? colors.grayDark : colors.primary}
          />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.fadedGrayLight,
    height: 52,
    paddingHorizontal: 2,
  },
  inputFocus: {
    borderColor: colors.primary,
    borderWidth: 3,
    paddingHorizontal: 0,
  },
  inputValue: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 12,
  },
  inputText: {
    color: colors.black,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    height: "100%",
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
  button: {
    height: 52,
    width: 52,
    padding: 11,
  },
  sufixLabel: {
    marginLeft: 12,
  },
});

export default NumberInputCustom;
