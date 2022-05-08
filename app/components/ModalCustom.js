import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Image,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import colors from "../config/colors";
import Header from "./Header";

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

export default function ModalCustom({
  children,
  style,
  closeButton = true,
  closeButtonFunction,
  visible,
  header,
  ...otherProps
}) {
  const [animationState, setAnimationState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height),
  });

  useEffect(() => {
    if (visible) {
      openModal();
    }
  }, [visible]);

  const openModal = () => {
    console.log("rodou open");
    console.log(visible);
    Animated.sequence([
      Animated.timing(animationState.container, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animationState.opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(animationState.modal, {
        toValue: 0,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(animationState.modal, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(animationState.opacity, {
        toValue: 0.9,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animationState.container, {
        toValue: height,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Modal visible={visible} {...otherProps} transparent={true}>
      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity: animationState.opacity,
            transform: [{ translateY: animationState.container }],
          },
        ]}
      >
        {/* Close modal on outside press */}
        <Pressable style={styles.closeArea} onPress={closeModal()} />
        {/* Modal Content */}
        <Animated.View
          style={[
            styles.modal,
            style,
            {
              transform: [{ translateY: animationState.modal }],
            },
          ]}
        >
          {header || closeButton ? (
            <View style={header ? styles.hasHeader : styles.noHeader}>
              {header && <Header style={styles.modalHeader}>{header}</Header>}
              {closeButton && (
                <TouchableOpacity onPress={closeModal()}>
                  <Image
                    style={styles.icon}
                    source={require("../assets/icons/ic_fire.png")}
                  />
                </TouchableOpacity>
              )}
            </View>
          ) : null}
          <View style={styles.content}>{children}</View>
        </Animated.View>
        {/* Close modal on outside press */}
        <Pressable style={styles.closeArea} onPress={openModal()} />
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  closeArea: {
    flex: 1,
    alignSelf: "stretch",
  },
  modal: {
    width: width - 48,
    backgroundColor: colors.white,
    borderRadius: 24,
    marginHorizontal: 24,
    // shadowColor: colors.black,
    // shadowOffset: { width: 4, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 24,
  },
  hasHeader: {
    flex: 1,
    justifyContent: "space-between",
    alignContent: "center",
    marginBottom: 24,
    padding: 24,
    flexDirection: "row",
  },
  modalHeader: {
    height: 52,
  },
  noHeader: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 24,
    flexDirection: "row",
    backgroundColor: colors.primary,
    height: 24,
    padding: 24,
  },
  content: {},
});
