// react
import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
// expo libraries
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
// styles
import colors from "../config/colors";
// custom components
import Card from "../components/Card";
import FabButtonCustom from "../components/FabButtonCustom";
import Header from "../components/Header";
import ToggleItem from "../components/ToggleItem";
import TextCustom from "../components/TextCustom";
import NumberInputCustom from "../components/NumberInputCustom";
// data
import { UserData } from "../contexts/userdata";
import Summary from "../components/Summary";

function Step2({ navigation }) {
  const { numberWithDot, user, setUserTDEE } = useContext(UserData);

  const [activityLevel, setActivityLevel] = useState("exercises");
  const [exercisesPerWeek, setExercisesPerWeek] = useState(0);
  const [caloriesPerDay, setCaloriesPerDay] = useState(0);

  var isNextButtonDisabled = true;

  useEffect(() => {
    if (activityLevel == "exercises") {
      if (exercisesPerWeek <= 1) {
        setUserTDEE(Math.floor(user.tmb * 1.2));
      }
      if (exercisesPerWeek >= 2 && exercisesPerWeek <= 3) {
        setUserTDEE(Math.floor(user.tmb * 1.3));
      }
      if (exercisesPerWeek >= 4 && exercisesPerWeek <= 6) {
        setUserTDEE(Math.floor(user.tmb * 1.42));
      }
      if (exercisesPerWeek >= 7 && exercisesPerWeek <= 8) {
        setUserTDEE(Math.floor(user.tmb * 1.55));
      }
      if (exercisesPerWeek >= 9 && exercisesPerWeek <= 10) {
        setUserTDEE(Math.floor(user.tmb * 1.8));
      }
      if (exercisesPerWeek >= 11 && exercisesPerWeek <= 21) {
        setUserTDEE(Math.floor(user.tmb * 2));
      }
      if (exercisesPerWeek >= 22) {
        setUserTDEE(0);
      }
    }
    if (activityLevel == "calories") {
      setUserTDEE(Math.floor(user.tmb * 1.1 + caloriesPerDay * 1));
    }
  }, [user.tmb, activityLevel, caloriesPerDay, exercisesPerWeek]);

  function response() {
    const joke = "Fala Sério!";
    if (exercisesPerWeek > 22) {
      isNextButtonDisabled = true;
      return joke;
    } else {
      isNextButtonDisabled = false;
      return numberWithDot(user.tdee) + " kcal";
    }
  }

  function tdeeIcon() {
    if (activityLevel === "exercises" && exercisesPerWeek > 22) {
      return "🤡";
    }
    if (user.gender == "male") {
      return "🧔‍♂️";
    }
    if (user.gender == "female") {
      return "👩";
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.list}>
        {/* SUMMARY */}
        <Summary
          backFunction={() => navigation.goBack()}
          hideGoal={true}
          hideTDEE={true}
        />
        {/* ACTIVITY LEVEL */}
        <Card>
          <Header>Nível de Atividade</Header>
          <View style={styles.row}>
            <ToggleItem
              onPress={() => setActivityLevel("exercises")}
              isSelected={activityLevel === "exercises" ? true : false}
              label="Exercícios"
              margin={true}
            />
            <ToggleItem
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
            style={[activityLevel != "exercises" ? styles.hide : null]}
          />
          <NumberInputCustom
            maxLength={4}
            content={caloriesPerDay}
            onChangeContent={(value) => setCaloriesPerDay(value)}
            returnKeyType="done"
            sufix={"kcal/dia"}
            valueToAdd={50}
            maxValue={9999}
            style={[activityLevel == "exercises" ? styles.hide : null]}
          />
        </Card>
        <Card>
          <Header color={colors.primary}>Gasto Energético Diário</Header>
          <View style={styles.tdeeContent}>
            <View style={styles.tdeeIcon}>
              <TextCustom style={styles.emojiIcon}>{tdeeIcon()}</TextCustom>
            </View>
            <TextCustom fontWeight="Semi Bold" style={styles.tdeeLabel}>
              {response()}
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
