import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  View,
} from "react-native";
import React, { useState } from "react";
import TextCustom from "../TextCustom";
import colors from "../../config/colors";
import ModalCustom from "../ModalCustom";
import PickerItemCustom from "./PickerItemCustom";
import IconCustom from "../IconCustom";
import * as Haptics from "expo-haptics";

export default function PickerCustom({
  options,
  selectedValue,
  onChangeSelect,
  iconListSize,
  placeholder = "Selecionar",
  modalHeader,
  closeButton = false,
  header,
}) {
  const [content, setContent] = useState(
    options[selectedValue] != undefined && options[selectedValue].label
      ? options[selectedValue].label
      : placeholder
  );
  const [contentIcon, setContentIcon] = useState(
    options[selectedValue] != undefined && options[selectedValue].icon
      ? options[selectedValue].icon
      : null
  );
  const [contentIconRotate, setContentIconRotate] = useState(
    options[selectedValue] != undefined && options[selectedValue].iconRotate
      ? options[selectedValue].iconRotate
      : null
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [itemSelected, setItemSelected] = useState("");

  function renderOption(item) {
    return (
      <PickerItemCustom
        label={item.label}
        description={item.description}
        iconRotate={item.iconRotate}
        selected={item.id === itemSelected}
        icon={item.icon}
        iconSize={iconListSize}
        onPress={() => {
          onChangeSelect(item.id);
          setContent(item.label);
          setContentIcon(item.icon);
          setContentIconRotate(item.iconRotate);
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
        onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
      >
        {/* PICKER */}
        <View style={styles.leftPickerLabel}>
          {contentIcon && (
            <IconCustom
              style={styles.icon}
              name={contentIcon}
              size={28}
              rotate={contentIconRotate}
              filled={true}
            />
          )}
          <TextCustom style={styles.pickerLabel} numberOfLines={1}>
            {content}
          </TextCustom>
        </View>
        <IconCustom
          name={"ic_chevron"}
          rotate={modalVisible ? 180 : 0}
          size={28}
        />
      </TouchableOpacity>
      {/* CONTENT */}
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
          ListHeaderComponent={
            <View>
              {!header && <View style={styles.maginItem} />}
              {header && (
                <TextCustom fontWeight="Semi Bold" style={styles.headerLabel}>
                  {header}
                </TextCustom>
              )}
            </View>
          }
        />
      </ModalCustom>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  picker: {
    flex: 1,
    borderColor: colors.fadedGrayLight,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11,
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
  headerLabel: {
    padding: 24,
    paddingBottom: 12,
  },
  maginItem: {
    height: 12,
  },
  icon: {
    marginRight: 12,
  },
  chevron: { height: 30, width: 30, marginLeft: 12 },
});
