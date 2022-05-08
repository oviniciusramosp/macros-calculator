import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import Card from "../components/Card";
import FabButtonCustom from "../components/FabButtonCustom";
import Header from "../components/Header";
import { StatusBar } from "expo-status-bar";
import colors from "../config/colors";
import TextInputCustom from "../components/TextInputCustom";
import TextCustom from "../components/TextCustom";
import PickerCustom from "../components/Picker/PickerCustom";
import { LinearGradient } from "expo-linear-gradient";

function Step3({ route, navigation }) {
  const { userTDEE, userTMB } = route.params;
  const [pickerStatusSelection, setPickerStatusSelection] = useState(0);
  const [pickerGoalSelection, setPickerGoalSelection] = useState(0);

  const pickerStatusOptions = [
    {
      id: "1",
      label: "Pouca Gordura e Pouca Massa Magra",
      icon: require("../assets/icons/ic_body_skinny.png"),
    },
    {
      id: "2",
      label: "Perder Peso Acelerado",
      icon: require("../assets/icons/ic_body_fat_muscle.png"),
    },
    {
      id: "3",
      label: "Perder Peso",
      icon: require("../assets/icons/ic_body_muscle.png"),
    },
    {
      id: "4",
      label: "Manter Peso",
      icon: require("../assets/icons/ic_body_fat.png"),
    },
  ];

  const pickerGoalOptions = [
    {
      id: "1",
      label: "Definir Défict Específico",
      icon: require("../assets/icons/ic_height.png"),
    },
    {
      id: "2",
      label: "Perder Peso Acelerado",
      icon: require("../assets/icons/ic_height.png"),
    },
    {
      id: "3",
      label: "Perder Peso",
      icon: require("../assets/icons/ic_height.png"),
    },
    {
      id: "4",
      label: "Manter Peso",
      icon: require("../assets/icons/ic_height.png"),
    },
    {
      id: "5",
      label: "Ganhar Peso",
      icon: require("../assets/icons/ic_height.png"),
    },
    {
      id: "6",
      label: "Ganhar Peso Acelerado",
      icon: require("../assets/icons/ic_height.png"),
    },
    {
      id: "7",
      label: "Definir Superávit Específico",
      icon: require("../assets/icons/ic_height.png"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.list}>
        <Card>
          <View style={styles.tbmContent}>
            <FabButtonCustom
              onPress={() => navigation.goBack()}
              isEmoji={false}
              size="small"
              backgroundColor="gray"
            >
              ←
            </FabButtonCustom>
            <View style={styles.margin} />
            <View style={styles.margin} />
            <View style={styles.row}>
              <View style={styles.column}>
                <TextCustom
                  fontWeight="Semi Bold"
                  style={[styles.tbmLabel, styles.colorPrimary]}
                >
                  TMB
                </TextCustom>
                <TextCustom
                  fontWeight="Semi Bold"
                  style={[styles.tbmLabel, styles.colorPrimary]}
                >
                  GET
                </TextCustom>
              </View>
              <View style={styles.margin} />
              <View style={styles.caloriesHeader}>
                <TextCustom fontWeight="Semi Bold" style={styles.tbmLabel}>
                  {userTMB.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  kcal
                </TextCustom>
                <TextCustom fontWeight="Semi Bold" style={styles.tbmLabel}>
                  {userTDEE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  kcal
                </TextCustom>
              </View>
            </View>
          </View>
        </Card>
        <Card>
          <Header>Estado Atual</Header>
          <PickerCustom
            placeholder="Selecione seu Estado Atual"
            options={pickerStatusOptions}
            onChangeSelect={(id) => {
              setPickerStatusSelection(id);
            }}
          ></PickerCustom>
        </Card>
        <Card>
          <Header>Objetivo</Header>
          <PickerCustom
            placeholder="Selecione seu Objetivo"
            options={pickerGoalOptions}
            onChangeSelect={(id) => {
              setPickerGoalSelection(id);
              console.log(pickerGoalSelection);
            }}
          />
          {pickerGoalSelection == 7 ? (
            <TextInputCustom
              placeholder="0"
              keyboardType="number-pad"
              maxLength={4}
              returnKeyType="done"
              textAlign="center"
              onChangeText={(value) => value}
              sufix={"kcal"}
              style={styles.kcalInput}
            />
          ) : null}
          {pickerGoalSelection == 1 ? (
            <TextInputCustom
              placeholder="0"
              keyboardType="number-pad"
              maxLength={4}
              returnKeyType="done"
              textAlign="center"
              onChangeText={(value) => value}
              sufix={"kcal"}
              style={styles.kcalInput}
            />
          ) : null}
        </Card>
        <View style={styles.margin} />
      </ScrollView>
      <View>
        <LinearGradient
          style={styles.fab}
          colors={colors.grayLightGradient}
          locations={[0, 0.5]}
        >
          <FabButtonCustom
            disabled={
              pickerGoalSelection > 0 && pickerStatusSelection > 0
                ? false
                : true
            }
            onPress={() =>
              navigation.navigate("Step 4", {
                status: pickerStatusSelection,
                goal: pickerGoalSelection,
              })
            }
            isEmoji={true}
          >
            →
          </FabButtonCustom>
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
  margin: {
    height: 24,
    width: 12,
  },
  caloriesHeader: {
    alignItems: "flex-end",
  },
  tbmContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
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
  tdeeContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
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
