import React from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import FabButtonCustom from "../components/FabButtonCustom";
import TextCustom from "../components/TextCustom";
import Card from "../components/Card";
import Header from "../components/Header";
import { StatusBar } from "expo-status-bar";
import colors from "../config/colors";
import IconCustom from "../components/IconCustom";
import Divider from "../components/Divider";

export default function Step4({ route, navigation }) {
  const {
    userTDEE,
    userTMB,
    userGender,
    userStatus,
    userGoal,
    calories,
    userWeight,
    userAge,
  } = route.params;

  function caloriesWithDot(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  var totalGoalCalories = Math.round(userGoalCalories());

  function userGoalCalories() {
    if (userGoal === 1) return userTDEE * 1 + calories * 1; // Superávit Específico
    if (userGoal === 2) return userTDEE * 1.15; // Ganhar Peso Rápido
    if (userGoal === 3) return userTDEE * 1.07; // Ganhar Peso
    if (userGoal === 4) return userTDEE; // Manter Peso
    if (userGoal === 5) return userTDEE * 0.85; // Perder Peso
    if (userGoal === 6) return userTDEE * 0.7; // Perder Peso Rápido
    if (userGoal === 7) return userTDEE * 1 - calories * 1; // Deficit Específico
  }

  var proteinGrams = Math.round(pronteinInGrams());
  var proteinCalories = proteinGrams * 4;
  var proteinPercentage = (proteinCalories * 100) / totalGoalCalories;
  function pronteinInGrams() {
    switch (userStatus) {
      case 1:
        // Magro
        return userGender === "female" ? userWeight * 1.8 : userWeight * 2;
      case 2:
        // Falso Magro
        console.log("chegou no 2");
        return userGender === "female" ? userWeight * 2 : userWeight * 2.2;
      case 3:
        // Em Forma
        return userGender === "female" ? userWeight * 2.2 : userWeight * 2.6;
      case 4:
        // Sobrepeso
        return userWeight * 1.8;
      default:
        break;
    }
  }

  var fatGrams = Math.round(userWeight * 0.8);
  var fatCalories = fatGrams * 9;
  var fatPercentage = (fatCalories * 100) / totalGoalCalories;

  var carbGrams = Math.round(
    (totalGoalCalories - fatCalories - proteinCalories) / 4
  );
  var carbsCalories = carbGrams * 4;
  var carbsPercentage = 100 - fatPercentage - proteinPercentage;

  function waterGrams() {
    if (userAge <= 17) return userWeight * 40;
    if (userAge >= 18 && userAge < 55) return userWeight * 35;
    if (userAge >= 55 && userAge < 65) return userWeight * 30;
    if (userAge >= 65) return userWeight * 25;
  }

  const finalCaloriesCount = proteinCalories + fatCalories + carbsCalories;

  const fiberGrams = Math.round(totalGoalCalories / 100);

  function MacroRow({
    title,
    grams,
    kcal,
    percentage,
    ml,
    iconName = "ic_placeholder",
    iconColor = colors.primary,
  }) {
    return (
      <View style={[styles.row, styles.horizontalCentered, styles.macrosBox]}>
        <IconCustom
          size={28}
          name={iconName}
          style={styles.macrosIcons}
          color={iconColor}
        />
        <View style={styles.fullWidth}>
          <View style={[styles.row, styles.spaceBetween]}>
            <TextCustom fontWeight="Semi Bold" style={styles.macrosTitle}>
              {title}
            </TextCustom>
            {grams && <TextCustom>{grams} g</TextCustom>}
            {ml && (
              <TextCustom>{caloriesWithDot(waterGrams(ml))} ml</TextCustom>
            )}
          </View>
          {kcal && percentage && (
            <View style={[styles.row, styles.spaceBetween]}>
              <TextCustom style={styles.macrosSubtitle}>
                {caloriesWithDot(kcal)} kcal
              </TextCustom>
              <TextCustom style={styles.macrosSubtitle}>
                {Math.round(percentage)} %
              </TextCustom>
            </View>
          )}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.list}>
        {/* SUMMARY */}
        <Card>
          <View style={[styles.row, styles.horizontalCentered]}>
            <FabButtonCustom
              onPress={() => navigation.goBack()}
              isEmoji={false}
              size="small"
              buttonStyle="outlined"
              icon="ic_arrow"
              iconRotate={180}
              style={styles.fabBack}
            />
            <View style={styles.row}>
              <View style={styles.fullWidth}>
                <TextCustom
                  fontWeight="Semi Bold"
                  color={colors.grayDark}
                  fontSize={12}
                >
                  TMB
                  {"\n"}
                  GET
                </TextCustom>
                <TextCustom fontWeight="Semi Bold" fontSize={16}>
                  Objetivo
                </TextCustom>
              </View>
              <View style={styles.caloriesHeader}>
                <TextCustom fontSize={12}>
                  {caloriesWithDot(userTMB)} kcal
                  {"\n"}
                  {caloriesWithDot(userTDEE)} kcal
                </TextCustom>
                <TextCustom
                  fontWeight="Semi Bold"
                  color={colors.primary}
                  fontSize={16}
                >
                  {caloriesWithDot(finalCaloriesCount)}
                  <TextCustom fontWeight="Semi Bold" fontSize={12}>
                    {" "}
                    kcal
                  </TextCustom>
                </TextCustom>
              </View>
            </View>
          </View>
        </Card>
        {/* MACROS */}
        <Card padding={0}>
          <MacroRow
            title={"Proteínas"}
            iconName={"ic_chicken"}
            iconColor={"#FD7036"}
            grams={proteinGrams}
            kcal={proteinCalories}
            percentage={proteinPercentage}
          />
          <Divider />
          <MacroRow
            title={"Gorduras"}
            iconName={"ic_peanuts"}
            iconColor={"#CA6F59"}
            grams={fatGrams}
            kcal={fatCalories}
            percentage={fatPercentage}
          />
          <Divider />
          <MacroRow
            title={"Carboidratos"}
            iconName={"ic_croissant"}
            iconColor={"#CC996D"}
            grams={carbGrams}
            kcal={carbsCalories}
            percentage={carbsPercentage}
          />
        </Card>
        <Card padding={0}>
          {/* AGUA */}
          <MacroRow
            title={"Água"}
            iconName={"ic_water_cup"}
            iconColor={"#1EA5FC"}
            ml={waterGrams()}
          />
          <Divider />
          {/* FIBRAS */}
          <MacroRow
            title={"Fibras"}
            iconName={"ic_apple"}
            iconColor={"#77EA7E"}
            grams={fiberGrams}
          />
        </Card>
      </ScrollView>
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
  fabBack: {
    marginRight: 24,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  caloriesHeader: {
    alignItems: "flex-end",
  },
  horizontalCentered: {
    alignItems: "center",
  },
  spaceBetween: {
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  margin: {
    height: 24,
    width: 12,
  },
  macrosBox: {
    padding: 24,
    paddingLeft: 35,
  },
  fullWidth: {
    flex: 1,
  },
  macrosIcons: {
    marginRight: 35,
  },
  macrosTitle: {
    fontSize: 20,
  },
  macrosSubtitle: {
    fontSize: 14,
    color: colors.grayDark,
    marginTop: 4,
    lineHeight: 16,
  },
});
