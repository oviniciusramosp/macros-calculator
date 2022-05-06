import React, { useState } from "react";
import { StyleSheet, View, Modal, TouchableOpacity } from "react-native";
import colors from "../config/colors";

function ModalCustom({ children, style, ...otherProps }) {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <Modal
      style={[styles.modal, style]}
      visible={isModalVisible}
      onRequestClose={() => setModalVisible(false)}
      {...otherProps}
    >
      {children}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    background: colors.white,
    padding: 12,
    borderRadius: 24,
  },
});

export default ModalCustom;
