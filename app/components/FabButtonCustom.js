import React, { useState } from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
// third parties
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
// custom
import colors from "../config/colors";
import TextCustom from "../components/TextCustom";
import IconCustom from "./IconCustom";

function FabButtonCustom({
  children,
  onPress,
  label,
  icon,
  iconRotate,
  emoji,
  buttonStyle = "contained",
  size = "default",
  backgroundColor = "primary",
  style,
  ...otherProps
}) {
  const [isPressing, setIsPressing] = useState(false);

  return (
    <BlurView style={styles.blur}>
      <TouchableHighlight
        onPress={onPress}
        onPressIn={() => (
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
          setIsPressing(true)
        )}
        onPressOut={() => setIsPressing(false)}
        style={[
          styles.button,
          size === "small" ? styles.small : null,
          buttonStyle === "outlined"
            ? styles.outlined
            : backgroundColor === "gray"
            ? styles.grayButton
            : null,
          otherProps.disabled === true
            ? styles.buttonDisabled
            : styles.buttonEnabled,
          style,
        ]}
        underlayColor={
          buttonStyle === "outlined"
            ? colors.primaryLight
            : backgroundColor === "primary"
            ? colors.primaryDark
            : colors.primaryLight
        }
        {...otherProps}
      >
        <View style={styles.row}>
          {icon && (
            <IconCustom
              size={28}
              name={icon}
              rotate={iconRotate}
              filled={isPressing ? true : false}
              color={buttonStyle === "outlined" ? colors.primary : colors.white}
            />
          )}
          {emoji && <TextCustom style={styles.fabEmoji}>{emoji}</TextCustom>}
          {label && (
            <TextCustom
              fontWeight="Semi Bold"
              style={[
                styles.fabLabel,
                size === "small" ? styles.smallFabLabel : null,
              ]}
            >
              {label}
            </TextCustom>
          )}
          {children}
        </View>
      </TouchableHighlight>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blur: {
    borderRadius: 72,
    overflow: "hidden",
  },
  button: {
    height: 72,
    width: 72,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 72,
    fontSize: 22,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.fadedGrayLight,
    color: colors.primary,
    backgroundColor: "transparent",
  },
  small: {
    height: 52,
    width: 52,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  fabEmoji: {
    fontSize: 30,
    marginHorizontal: 6,
  },
  fabLabel: {
    fontSize: 30,
    marginHorizontal: 6,
  },
  smallFabLabel: {
    fontSize: 22,
  },
  buttonDisabled: {
    backgroundColor: colors.grayDark,
    opacity: 0.3,
    color: colors.grayLight,
  },
});

export default FabButtonCustom;
