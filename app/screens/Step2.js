import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import Card from "../components/Card";
import FabButtonCustom from "../components/FabButtonCustom";
import Header from "../components/Header";
import { StatusBar } from "expo-status-bar";
import colors from "../config/colors";
import Toggle from "../components/ToggleItem";
import TextInputCustom from "../components/TextInputCustom";

function Step2({ route, navigation }) {
  const { userTMB, userGender } = route.params;
  const [activityLevel, setActivityLevel] = useState("exercises");
  const [exercisesPerWeek, setExercisesPerWeek] = useState(0);
  const [caloriesPerDay, setCaloriesPerDay] = useState(0);

  var tdee = 0;
  var isNextButtonEnabled = true;

  function calculateTDEE() {
    if (activityLevel == "exercises") {
      tdee = 0;
      if (exercisesPerWeek <= 1) {
        tdee = Math.round(userTMB * 1.2);
        return tdee.toString() + " kcal";
      }
      if (exercisesPerWeek >= 2 && exercisesPerWeek <= 3) {
        tdee = Math.round(userTMB * 1.3);
        return tdee.toString() + " kcal";
      }
      if (exercisesPerWeek >= 4 && exercisesPerWeek <= 6) {
        tdee = Math.round(userTMB * 1.42);
        return tdee.toString() + " kcal";
      }
      if (exercisesPerWeek >= 7 && exercisesPerWeek <= 8) {
        tdee = Math.round(userTMB * 1.55);
        return tdee.toString() + " kcal";
      }
      if (exercisesPerWeek >= 9 && exercisesPerWeek <= 10) {
        tdee = Math.round(userTMB * 1.8);
        return tdee.toString() + " kcal";
      }
      if (exercisesPerWeek >= 11 && exercisesPerWeek <= 21) {
        tdee = Math.round(userTMB * 2);
        return tdee.toString() + " kcal";
      }
      if (exercisesPerWeek >= 22) {
        return "Fala sério!";
      }
    }
    if (activityLevel == "calories") {
      tdee = Math.round(userTMB * 1.1 + caloriesPerDay * 1);
      return tdee.toString() + " kcal";
    }
  }

  function tdeeIcon() {
    if (exercisesPerWeek < 22) {
      if (userGender == "male") {
        return "🧔‍♂️";
      }
      if (userGender == "female") {
        return "👩";
      }
    } else {
      return "🤡";
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.list}>
        {/* Taxa Metabólica Basal */}
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
            <Text style={[styles.tbmLabel, styles.colorPrimary]}>TMB </Text>
            <Text style={styles.tbmLabel}>{userTMB} kcal</Text>
          </View>
        </Card>
        <Card>
          <Header>Nível de Atividade</Header>
          <View style={styles.row}>
            <Toggle
              onPress={() => setActivityLevel("exercises")}
              isEmoji={false}
              isSelected={activityLevel === "exercises" ? true : false}
            >
              Exercícios
            </Toggle>
            <View style={styles.margin} />
            <Toggle
              onPress={() => setActivityLevel("calories")}
              isEmoji={false}
              isSelected={activityLevel === "calories" ? true : false}
            >
              Calorias
            </Toggle>
          </View>
          <Text style={styles.activityLabel}>
            {activityLevel == "exercises"
              ? "Insira o número de vezes que você se exercita durante a semana."
              : "Insira a quantidade média de calorias que você queima em atividade por dia."}
          </Text>
          <TextInputCustom
            placeholder="0"
            keyboardType="number-pad"
            maxLength={2}
            returnKeyType="done"
            textAlign="center"
            icon={require("../assets/icons/ic_fire.png")}
            onChangeText={(value) => setExercisesPerWeek(value)}
            sufix={exercisesPerWeek != 1 ? "exercícios" : "exercício"}
            style={[
              styles.activityInput,
              activityLevel != "exercises" ? styles.hide : null,
            ]}
          />
          <TextInputCustom
            placeholder="0"
            keyboardType="number-pad"
            maxLength={4}
            returnKeyType="done"
            textAlign="center"
            icon={require("../assets/icons/ic_fire.png")}
            onChangeText={(value) => setCaloriesPerDay(value)}
            sufix="kcal/dia"
            style={[
              styles.activityInput,
              activityLevel == "exercises" ? styles.hide : null,
            ]}
          />
        </Card>
        <Card>
          <Header style={styles.colorPrimary}>Gasto Calórico Diário</Header>
          <View style={styles.tdeeContent}>
            <View style={styles.tdeeIcon}>
              <Text style={styles.emojiIcon}>{tdeeIcon()}</Text>
            </View>
            <Text style={styles.tdeeLabel}>{calculateTDEE()}</Text>
          </View>
        </Card>
        <View style={styles.fab}>
          <FabButtonCustom
            disabled={isNextButtonEnabled}
            onPress={() => navigation.navigate("Step 2", {})}
            isEmoji={true}
          >
            →
          </FabButtonCustom>
        </View>
        <View style={styles.margin} />
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
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  margin: {
    height: 24,
    width: 12,
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
  activityLabel: {
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  activityInput: {
    width: 152,
    alignSelf: "center",
  },
  fab: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginBottom: 24,
  },
  hide: {
    display: "none",
  },
});

export default Step2;
