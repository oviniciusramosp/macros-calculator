import { StyleSheet, View } from "react-native";
import React from "react";
import PickerCustom from "./PickerCustom";

export default function Example() {
  // object with all picker options
  const pickerOptions = [
    {
      id: "1",
      label: "teste 1",
      icon: require("../assets/icons/ic_height.png"),
    },
    { id: "2", label: "teste 2" },
    { id: "3", label: "teste 3" },
  ];

  // selected value to use in other places
  var pickerSelection = 0;

  return (
    <View>
      <PickerCustom
        options={pickerOptions}
        onChangeSelect={(id) => {
          pickerSelection = id;
          alert(pickerSelection);
        }}
      ></PickerCustom>
    </View>
  );
}

const styles = StyleSheet.create({});
