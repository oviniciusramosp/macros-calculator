import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import colors from "../config/colors";
import Header from "./Header";

export default function ModalCustom({
  children,
  style,
  closeButton = true,
  closeButtonFunction,
  header,
  ...otherProps
}) {
  return (
    <View>
      <Modal {...otherProps} transparent={true}>
        <View style={styles.centeredView}>
          <Pressable style={styles.closeArea} onPress={closeButtonFunction} />
          <View style={[styles.modal, style]}>
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
          </View>
          <Pressable style={styles.closeArea} onPress={closeButtonFunction} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  closeArea: {
    flex: 1,
    alignSelf: "stretch",
  },
  modal: {
    width: "90%",
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
