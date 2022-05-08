import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import TextCustom from "../TextCustom";
import colors from "../../config/colors";
import ModalCustom from "../ModalCustom";
import PickerItemCustom from "./PickerItemCustom";

export default function PickerCustom({
  options,
  onChangeSelect,
  placeholder = "Selecionar",
  modalHeader,
  closeButton = false,
}) {
  const [content, setContent] = useState(placeholder);
  const [contentImage, setContentImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemSelected, setItemSelected] = useState("");

  function renderOption(item) {
    return (
      <PickerItemCustom
        itemLabel={item.label}
        selected={item.id === itemSelected}
        itemIconPath={item.icon}
        onPress={() => {
          onChangeSelect(item.id);
          setContent(item.label);
          setContentImage(item.icon);
          setModalVisible(false);
          setItemSelected(item.id);
        }}
      />
    );
  }

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.picker}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.leftPickerLabel}>
          {contentImage && <Image style={styles.icon} source={contentImage} />}
          <TextCustom style={styles.pickerLabel} numberOfLines={1}>
            {content}
          </TextCustom>
        </View>
        <Image
          style={styles.chevron}
          source={
            modalVisible
              ? require("../../assets/icons/ic_chevron_up.png")
              : require("../../assets/icons/ic_chevron_down.png")
          }
        />
      </TouchableOpacity>
      <ModalCustom
        visible={modalVisible}
        header={modalHeader}
        onRequestClose={() => setModalVisible(false)}
        closeButton={closeButton}
        closeButtonFunction={() => setModalVisible(false)}
        style={styles.modalPicker}
      >
        <FlatList
          data={options}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => renderOption(item)}
          style={styles.list}
          ListFooterComponent={<View style={styles.maginItem} />}
          ListHeaderComponent={<View style={styles.maginItem} />}
        />
      </ModalCustom>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  picker: {
    flex: 1,
    backgroundColor: colors.grayLight,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11,
    borderWidth: 3,
    borderColor: colors.grayLight,
    height: 52,
  },
  leftPickerLabel: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 26,
  },
  pickerLabel: {},
  modalPicker: {
    maxHeight: "90%",
  },
  list: {},
  maginItem: {
    height: 12,
  },
  icon: {
    height: 30,
    width: 30,
    marginRight: 12,
  },
  chevron: { height: 30, width: 30, marginLeft: 12 },
});
