// react
import React, { useState, useContext } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
// expo libraries
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
// styles
import colors from "../config/colors";
// custom components
import Card from "../components/Card";
import FabButtonCustom from "../components/FabButtonCustom";
import Header from "../components/Header";
import PickerCustom from "../components/Picker/PickerCustom";
import TextCustom from "../components/TextCustom";
// data
import { UserData } from "../contexts/userdata";
import NumberInputCustom from "../components/NumberInputCustom";
import Summary from "../components/Summary";

function Step3({ navigation }) {
  const { user, setUserStatus, setUserGoal, setCalDiference } =
    useContext(UserData);

  const pickerStatusOptions = [
    {
      id: 0,
      label: user.gender == "male" ? "Magro" : "Magra",
      description: "Pouco músculo e pouca gordura",
      icon: "ic_skinny",
    },
    {
      id: 1,
      label: user.gender == "male" ? "Falso Magro" : "Falsa Magra",
      description:
        user.gender == "male"
          ? "Magro mas com gordura localizada"
          : "Magra mas com gordura localizada",
      icon: "ic_fake_skinny",
    },
    {
      id: 2,
      label: "Em Forma",
      description: "Massa magra considerável",
      icon: "ic_strong",
    },
    {
      id: 3,
      label: "Sobrepeso",
      description: "Excesso de gordura",
      icon: "ic_fat",
    },
  ];

  const pickerGoalOptions = [
    {
      id: 0,
      label: "Superávit Específico",
      description: "Insira o valor manualmente",
      icon: "ic_plus",
    },
    {
      id: 1,
      label: "Ganhar Peso Rápido",
      description: "a",
      icon: "ic_arrow_circle_double",
      iconRotate: -90,
    },
    {
      id: 2,
      label: "Ganhar Peso",
      icon: "ic_arrow_circle",
      iconRotate: -90,
    },
    {
      id: 3,
      label: "Manter Peso",
      icon: "ic_pause",
    },
    {
      id: 4,
      label: "Perder Peso",
      icon: "ic_arrow_circle",
      iconRotate: 90,
    },
    {
      id: 5,
      label: "Perder Peso Rápido",
      description: "Pode perder massa magra junto",
      icon: "ic_arrow_circle_double",
      iconRotate: 90,
    },
    {
      id: 6,
      label: "Défict Específico",
      description: "Insira o valor manualmente",
      icon: "ic_minus",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.list}>
        {/* SUMMARY */}
        <Summary backFunction={() => navigation.goBack()} hideGoal={true} />
        {/* USER ACTUAL STATUS */}
        <Card>
          <Header>Estado Atual</Header>
          <PickerCustom
            placeholder="Selecione seu Estado Atual"
            header="Selecione o mais próximo"
            selectedValue={user.status}
            options={pickerStatusOptions}
            onChangeSelect={(id) => {
              setUserStatus(id);
            }}
            iconListSize={28}
          />
        </Card>
        {/* USER GOAL */}
        <Card>
          <Header>Objetivo</Header>
          <PickerCustom
            placeholder="Selecione seu Objetivo"
            selectedValue={user.goal}
            options={pickerGoalOptions}
            onChangeSelect={(id) => {
              setUserGoal(id);
            }}
          />
          {user.goal == 6 || user.goal == 0 ? (
            <NumberInputCustom
              maxLength={4}
              content={user.goalCalDifference}
              onChangeContent={(value) => setCalDiference(value)}
              returnKeyType="done"
              sufix={"kcal"}
              valueToAdd={50}
              maxValue={9999}
              style={styles.kcalInput}
            />
          ) : null}
        </Card>
      </ScrollView>
      <View>
        <LinearGradient
          style={styles.fab}
          colors={colors.grayLightGradient}
          locations={[0, 0.5]}
        >
          <FabButtonCustom
            disabled={user.goal >= 0 && user.status >= 0 ? false : true}
            onPress={() => navigation.navigate("Step 4", {})}
            icon={"ic_arrow"}
          />
        </LinearGradient>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayLight,
  },
  list: {
    padding: 24,
    paddingBottom: 72 + 48,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  fillWidth: {
    flex: 1,
  },
  spaceBetween: {
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  tbmIcon: {
    backgroundColor: colors.grayLight,
    height: 52,
    width: 52,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 52,
    marginRight: 24,
  },
  tbmLabel: {
    fontSize: 18,
    fontWeight: "600",
  },
  colorPrimary: {
    color: colors.primary,
  },
  tdeeIcon: {
    backgroundColor: colors.grayLight,
    height: 52,
    width: 52,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 52,
    marginRight: 24,
  },
  emojiIcon: {
    fontSize: 24,
  },
  tdeeLabel: {
    fontSize: 18,
    fontWeight: "600",
  },
  kcalInput: {
    marginTop: 12,
  },
  fab: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 24,
    position: "absolute",
    bottom: 0,
  },
  hide: {
    display: "none",
  },
});

export default Step3;
