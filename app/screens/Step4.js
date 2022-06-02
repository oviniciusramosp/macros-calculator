// react
import React, { useContext, useEffect } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
// expo libraries
import { StatusBar } from "expo-status-bar";
// styles
import colors from "../config/colors";
// custom components
import Card from "../components/Card";
import Divider from "../components/Divider";
import IconCustom from "../components/IconCustom";
import TextCustom from "../components/TextCustom";
// data
import { UserData } from "../contexts/userdata";
import Summary from "../components/Summary";

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
        <View style={styles.fillWidth}>
          <View style={[styles.row, styles.spaceBetween]}>
            <TextCustom fontWeight="Semi Bold" style={styles.macrosTitle}>
              {title}
            </TextCustom>
            {grams && <TextCustom>{grams} g</TextCustom>}
            {ml && <TextCustom>{numberWithDot(waterGrams(ml))} ml</TextCustom>}
          </View>
          {kcal && percentage && (
            <View style={[styles.row, styles.spaceBetween]}>
              <TextCustom style={styles.macrosSubtitle}>
                {numberWithDot(kcal)} kcal
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
        <Summary backFunction={() => navigation.goBack()} />
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
  macrosBox: {
    padding: 24,
    paddingLeft: 35,
  },
  fillWidth: {
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
