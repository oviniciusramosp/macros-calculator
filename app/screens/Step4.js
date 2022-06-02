// react
import React, { useContext, useEffect, useRef } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { captureRef } from "react-native-view-shot";
// expo libraries
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import * as MediaLibrary from "expo-media-library";
// styles
import colors from "../config/colors";
// custom components
import Card from "../components/Card";
import Divider from "../components/Divider";
import TextCustom from "../components/TextCustom";
import ScreenshotView from "../components/ScreenshotView";
// data
import { UserData } from "../contexts/userdata";
import Summary from "../components/Summary";
import FabButtonCustom from "../components/FabButtonCustom";
import MacroRow from "../components/MacroRow";

export default function Step4({ navigation }) {
  const { numberWithDot, user, setTotalCalGoal } = useContext(UserData);

  var totalGoalCalories = Math.round(userGoalCalories());

  function userGoalCalories() {
    if (user.goal === 0) return user.tdee * 1 + user.goalCalDifference * 1; // Superávit Específico
    if (user.goal === 1) return user.tdee * 1.15; // Ganhar Peso Rápido
    if (user.goal === 2) return user.tdee * 1.07; // Ganhar Peso
    if (user.goal === 3) return user.tdee; // Manter Peso
    if (user.goal === 4) return user.tdee * 0.85; // Perder Peso
    if (user.goal === 5) return user.tdee * 0.7; // Perder Peso Rápido
    if (user.goal === 6) return user.tdee * 1 - user.goalCalDifference * 1; // Deficit Específico
  }

  var proteinGrams = Math.round(pronteinInGrams());
  var proteinCalories = proteinGrams * 4;
  var proteinPercentage = (proteinCalories * 100) / totalGoalCalories;
  function pronteinInGrams() {
    switch (user.status) {
      case 0:
        // Magro
        return user.gender === "female" ? user.weight * 1.8 : user.weight * 2;
      case 1:
        // Falso Magro
        return user.gender === "female" ? user.weight * 2 : user.weight * 2.2;
      case 2:
        // Em Forma
        return user.gender === "female" ? user.weight * 2.2 : user.weight * 2.6;
      case 3:
        // Sobrepeso
        return user.weight * 1.8;
      default:
        break;
    }
  }

  var fatGrams = Math.round(user.weight * 0.8);
  var fatCalories = fatGrams * 9;
  var fatPercentage = (fatCalories * 100) / totalGoalCalories;

  var carbGrams = Math.round(
    (totalGoalCalories - fatCalories - proteinCalories) / 4
  );
  var carbsCalories = carbGrams * 4;
  var carbsPercentage = 100 - fatPercentage - proteinPercentage;

  function waterGrams() {
    if (user.age <= 17) return user.weight * 40;
    if (user.age >= 18 && user.age < 55) return user.weight * 35;
    if (user.age >= 55 && user.age < 65) return user.weight * 30;
    if (user.age >= 65) return user.weight * 25;
  }

  useEffect(() => {
    setTotalCalGoal(proteinCalories + fatCalories + carbsCalories);
  }, [proteinCalories, fatCalories, carbsCalories]);

  const fiberGrams = Math.round(totalGoalCalories / 100);

  const screenshotView = useRef();

  function onCapture() {
    captureRef(screenshotView, {
      format: "png",
      quality: 1,
      snapshotContentContainer: true,
    }).then(
      (uri) => MediaLibrary.saveToLibraryAsync(uri),
      alert("Imagem Salva"),
      (error) => alert("Ops, Sua Imagem Não Foi Salva", error)
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.list}>
        <Summary backFunction={() => navigation.goBack()} />
        <Card padding={0}>
          <MacroRow
            title={"Proteínas"}
            iconName={"ic_chicken"}
            iconColor={"#FD7036"}
            value={proteinGrams}
            kcal={proteinCalories}
            percentage={proteinPercentage}
          />
          <Divider />
          <MacroRow
            title={"Gorduras"}
            iconName={"ic_peanuts"}
            iconColor={"#CA6F59"}
            value={fatGrams}
            kcal={fatCalories}
            percentage={fatPercentage}
          />
          <Divider />
          <MacroRow
            title={"Carboidratos"}
            iconName={"ic_croissant"}
            iconColor={"#CC996D"}
            value={carbGrams}
            kcal={carbsCalories}
            percentage={carbsPercentage}
          />
        </Card>
        <Card padding={0}>
          <MacroRow
            title={"Água"}
            iconName={"ic_water_cup"}
            iconColor={"#1EA5FC"}
            value={waterGrams()}
            unit={"ml"}
          />
          <Divider />
          <MacroRow
            title={"Fibras"}
            iconName={"ic_apple"}
            iconColor={"#77EA7E"}
            value={fiberGrams}
          />
        </Card>
        <ScreenshotView hidden={false} ref={screenshotView}>
          <Card padding={0}>
            <View style={styles.tableRow}>
              <TextCustom>Taxa Metabólica Basal (TMB):</TextCustom>
              <TextCustom>{user.tmb}</TextCustom>
            </View>
            <Divider />
            <View style={styles.tableRow}>
              <TextCustom>Gasto Energético Total (GET):</TextCustom>
              <TextCustom>{user.tdee}</TextCustom>
            </View>
            <View style={styles.row}></View>
          </Card>
        </ScreenshotView>
      </ScrollView>
      <View>
        <LinearGradient
          style={styles.fab}
          colors={colors.grayLightGradient}
          locations={[0, 0.5]}
        >
          <FabButtonCustom onPress={() => onCapture()} icon={"ic_download"} />
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
    backgroundColor: colors.grayLight,
    borderRadius: 46,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  horizontalCentered: {
    alignItems: "center",
  },
  spaceBetween: {
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  fillWidth: {
    flex: 1,
  },
  fab: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 24,
    position: "absolute",
    bottom: 0,
  },
  tableRow: {
    flex: 1,
    flexDirection: "row",
    padding: 24,
    justifyContent: "space-between",
  },
});
