import React, { useState, useContext } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../config/colors";
import Card from "../components/Card";
import FabButtonCustom from "../components/FabButtonCustom";
import Header from "../components/Header";
import Toggle from "../components/ToggleItem";
import TextCustom from "../components/TextCustom";
import NumberInputCustom from "../components/NumberInputCustom";

import { UserData } from "../contexts/userdata";

function Step2({ route, navigation }) {
  const {} = route.params;
  const { numberWithDot, user, setUserTDEE } = useContext(UserData);

  const [activityLevel, setActivityLevel] = useState("exercises");
  const [exercisesPerWeek, setExercisesPerWeek] = useState(0);
  const [caloriesPerDay, setCaloriesPerDay] = useState(0);

  var isNextButtonDisabled = true;

  function calculateTDEE() {
    if (activityLevel == "exercises") {
      isNextButtonDisabled = false;
      if (exercisesPerWeek <= 1) {
        setUserTDEE(Math.floor(user.tmb * 1.2));
        return numberWithDot(user.tdee) + " kcal";
      }
      if (exercisesPerWeek >= 2 && exercisesPerWeek <= 3) {
        setUserTDEE(Math.floor(user.tmb * 1.3));
        return numberWithDot(user.tdee) + " kcal";
      }
      if (exercisesPerWeek >= 4 && exercisesPerWeek <= 6) {
        setUserTDEE(Math.floor(user.tmb * 1.42));
        return numberWithDot(user.tdee) + " kcal";
      }
      if (exercisesPerWeek >= 7 && exercisesPerWeek <= 8) {
        setUserTDEE(Math.floor(user.tmb * 1.55));
        return numberWithDot(user.tdee) + " kcal";
      }
      if (exercisesPerWeek >= 9 && exercisesPerWeek <= 10) {
        setUserTDEE(Math.floor(user.tmb * 1.8));
        return numberWithDot(user.tdee) + " kcal";
      }
      if (exercisesPerWeek >= 11 && exercisesPerWeek <= 21) {
        setUserTDEE(Math.floor(user.tmb * 2));
        return numberWithDot(user.tdee) + " kcal";
      }
      if (exercisesPerWeek >= 22) {
        isNextButtonDisabled = true;
        return "Fala sério!";
      }
    }
    if (activityLevel == "calories") {
      isNextButtonDisabled = false;
      setUserTDEE(Math.floor(user.tmb * 1.1 + caloriesPerDay * 1));
      return numberWithDot(user.tdee) + " kcal";
    } else {
      isNextButtonDisabled = true;
    }
  }

  function tdeeIcon() {
    if (exercisesPerWeek < 22) {
      if (user.gender == "male") {
        return "🧔‍♂️";
      }
      if (user.gender == "female") {
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
              {numberWithDot(user.tmb)} kcal
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
          <NumberInputCustom
            maxLength={2}
            content={exercisesPerWeek}
            onChangeContent={(value) => setExercisesPerWeek(value)}
            returnKeyType="done"
            sufix={
              exercisesPerWeek != 1 ? "exercícios/semana" : "exercício/semana"
            }
            style={[
              styles.activityInput,
              activityLevel != "exercises" ? styles.hide : null,
            ]}
          />
          <NumberInputCustom
            maxLength={4}
            content={caloriesPerDay}
            onChangeContent={(value) => setCaloriesPerDay(value)}
            returnKeyType="done"
            sufix={"kcal/dia"}
            valueToAdd={50}
            maxValue={9999}
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
            onPress={() => navigation.navigate("Step 3", {})}
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
