import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import Card from "../components/Card";
import FabButtonCustom from "../components/FabButtonCustom";
import Header from "../components/Header";
import { StatusBar } from "expo-status-bar";
import colors from "../config/colors";
import Toggle from "../components/ToggleItem";
import TextInputCustom from "../components/TextInputCustom";
import TextCustom from "../components/TextCustom";
import { LinearGradient } from "expo-linear-gradient";

function Step2({ route, navigation }) {
  const { userTMB, userGender } = route.params;
  const [activityLevel, setActivityLevel] = useState("exercises");
  const [exercisesPerWeek, setExercisesPerWeek] = useState(0);
  const [caloriesPerDay, setCaloriesPerDay] = useState(0);

  var tdee = 0;
  var isNextButtonDisabled = true;

  function caloriesWithDot(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function calculateTDEE() {
    if (activityLevel == "exercises") {
      isNextButtonDisabled = false;
      if (exercisesPerWeek <= 1) {
        tdee = Math.round(userTMB * 1.2);
        return caloriesWithDot(tdee) + " kcal";
      }
      if (exercisesPerWeek >= 2 && exercisesPerWeek <= 3) {
        tdee = Math.round(userTMB * 1.3);
        return caloriesWithDot(tdee) + " kcal";
      }
      if (exercisesPerWeek >= 4 && exercisesPerWeek <= 6) {
        tdee = Math.round(userTMB * 1.42);
        return caloriesWithDot(tdee) + " kcal";
      }
      if (exercisesPerWeek >= 7 && exercisesPerWeek <= 8) {
        tdee = Math.round(userTMB * 1.55);
        return caloriesWithDot(tdee) + " kcal";
      }
      if (exercisesPerWeek >= 9 && exercisesPerWeek <= 10) {
        tdee = Math.round(userTMB * 1.8);
        return caloriesWithDot(tdee) + " kcal";
      }
      if (exercisesPerWeek >= 11 && exercisesPerWeek <= 21) {
        tdee = Math.round(userTMB * 2);
        return caloriesWithDot(tdee) + " kcal";
      }
      if (exercisesPerWeek >= 22) {
        isNextButtonDisabled = true;
        return "Fala sério!";
      }
    }
    if (activityLevel == "calories") {
      isNextButtonDisabled = false;
      tdee = Math.round(userTMB * 1.1 + caloriesPerDay * 1);
      return caloriesWithDot(tdee) + " kcal";
    } else {
      isNextButtonDisabled = true;
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
      <ScrollView contentContainerStyle={styles.list}>
        {/* Taxa Metabólica Basal */}
        <Card>
          <View style={styles.tbmContent}>
            <FabButtonCustom
              onPress={() => navigation.goBack()}
              isEmoji={false}
              size="small"
              buttonStyle="outlined"
              icon="ic_arrow"
              iconRotate={180}
            />
            <View style={styles.margin} />
            <View style={styles.margin} />
            <TextCustom
              fontWeight="Semi Bold"
              style={[styles.tbmLabel, styles.colorPrimary]}
            >
              TMB{" "}
            </TextCustom>
            <TextCustom fontWeight="Semi Bold" style={styles.tbmLabel}>
              {userTMB.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} kcal
            </TextCustom>
          </View>
        </Card>
        <Card>
          <Header>Nível de Atividade</Header>
          <View style={styles.row}>
            <Toggle
              onPress={() => setActivityLevel("exercises")}
              isSelected={activityLevel === "exercises" ? true : false}
              label="Exercícios"
            />
            <View style={styles.margin} />
            <Toggle
              onPress={() => setActivityLevel("calories")}
              isSelected={activityLevel === "calories" ? true : false}
              label="Calorias"
            />
          </View>
          <TextCustom style={styles.activityLabel}>
            {activityLevel == "exercises"
              ? "Insira o número de vezes que você se exercita durante a semana."
              : "Insira a quantidade média de calorias que você queima em atividade por dia."}
          </TextCustom>
          <TextInputCustom
            placeholder="0"
            keyboardType="number-pad"
            maxLength={2}
            returnKeyType="done"
            textAlign="center"
            icon={"ic_weight"}
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
            icon={"ic_placeholder"}
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
              <TextCustom style={styles.emojiIcon}>{tdeeIcon()}</TextCustom>
            </View>
            <TextCustom fontWeight="Semi Bold" style={styles.tdeeLabel}>
              {calculateTDEE()}
            </TextCustom>
          </View>
        </Card>
      </ScrollView>
      <View>
        <LinearGradient
          style={styles.fab}
          colors={colors.grayLightGradient}
          locations={[0, 0.5]}
        >
          <FabButtonCustom
            disabled={isNextButtonDisabled}
            onPress={() =>
              navigation.navigate("Step 3", {
                userTDEE: tdee,
                userTMB: userTMB,
                userGender: userGender,
              })
            }
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
    // width: 152,
    // alignSelf: "center",
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

export default Step2;
