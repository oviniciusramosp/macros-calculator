import React, { useState, useEffect, useRef } from "react";
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
    modal: new Animated.Value(0),
    modalOpacity: new Animated.Value(0.5),
  });

  const [modalVisibility, setModalVisibility] = useState(false);

  const openModal = () => {
    setModalVisibility(true);
    Animated.parallel([
      Animated.timing(animationState.opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animationState.modalOpacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(animationState.modal, {
        toValue: 1,
        bounciness: 8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(animationState.modal, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(animationState.modalOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animationState.opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(() => {
      setModalVisibility(false);
    }, 300);
  };

  useEffect(() => {
    if (visible) {
      openModal();
    } else {
      closeModal();
    }
  }, [visible]);

  return (
    <Modal visible={modalVisibility} transparent={true} {...otherProps}>
      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity: animationState.opacity,
          },
        ]}
      >
        {/* Close modal on outside press */}
        <Pressable style={styles.closeArea} onPress={closeButtonFunction} />
        {/* Modal Content */}
        <Animated.View
          style={[
            styles.modal,
            style,
            {
              transform: [{ scale: animationState.modal }],
              opacity: animationState.modalOpacity,
            },
          ]}
        >
          {header || closeButton ? (
            <View style={header ? styles.hasHeader : styles.noHeader}>
              {header && <Header style={styles.modalHeader}>{header}</Header>}
              {closeButton && (
                <TouchableOpacity onPress={closeButtonFunction}>
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
        <Pressable style={styles.closeArea} onPress={closeButtonFunction} />
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    height: height,
    width: width,
    backgroundColor: "rgba(0,0,0,0.15)",
    position: "absolute",
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
