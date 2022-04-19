import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Alert,
} from "react-native";

import Card from "../components/Card";
import Toggle from "../components/ToggleItem";
import TextInputCustom from "../components/TextInputCustom";
import Header from "../components/Header";
import FabButtonCustom from "../components/FabButtonCustom";
import colors from "../config/colors";
import { StatusBar } from "expo-status-bar";

function Step1({ navigation }) {
  const [gender, setGender] = useState("none");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);

  const maleTMB = Math.round(
    66.5 + 13.75 * weight + 5.003 * height - 6.75 * age
  );

  const femaleTMB = Math.round(
    655.1 + 9.563 * weight + 1.85 * height - 4.676 * age
  );

  var tMB = 0;
  var nextButton = true;

  const setToggleGender = function (genderValue) {
    if (gender === genderValue) {
      setGender("none");
    } else {
      setGender(genderValue);
    }
  };

  function calculate() {
    if (gender === "none") {
      return "Selecione um Gênero";
    }
    if (height > 0 && weight > 0 && age > 0) {
      nextButton = false;
      if (gender === "male") {
        tMB = maleTMB;
        return maleTMB.toString() + " Kcal";
      } else {
        tMB = femaleTMB;
        return femaleTMB.toString() + " Kcal";
      }
    }
    tMB = 0;
    return "Preencha os Campos";
  }

  function showAlert(content, navigation) {
    Alert.alert(content);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.list}>
        <View>
          {/* Gender */}
          <Card>
            <Header>Selecione seu Gênero</Header>
            <View style={styles.toggles}>
              <Toggle
                onPress={() => setToggleGender("male")}
                isEmoji={true}
                isSelected={gender === "male" ? true : false}
              >
                🧔‍♂️
              </Toggle>
              <View style={styles.margin} />
              <Toggle
                onPress={() => setToggleGender("female")}
                isEmoji={true}
                isSelected={gender === "female" ? true : false}
              >
                👩
              </Toggle>
            </View>
          </Card>
          {/* Medidas */}
          <Card>
            <Header>Suas Medidas</Header>
            <View style={styles.toggles}>
              <TextInputCustom
                placeholder="000"
                keyboardType="numeric"
                // defaultValue={height.toString()}
                maxLength={3}
                returnKeyType="done"
                textAlign="center"
                icon={require("../assets/icons/ic_height.png")}
                onChangeText={(value) => setHeight(value)}
                sufix="cm"
              >
                Altura
              </TextInputCustom>
              <View style={styles.margin} />
              <TextInputCustom
                placeholder="000"
                // defaultValue={weight.toString()}
                keyboardType="numeric"
                returnKeyType="done"
                textAlign="center"
                maxLength={3}
                icon={require("../assets/icons/ic_weight.png")}
                onChangeText={(value) => setWeight(value)}
                sufix="Kg"
              >
                Peso
              </TextInputCustom>
            </View>
            <View style={styles.margin} />
            <View style={styles.toggles}>
              <TextInputCustom
                placeholder="00"
                // defaultValue={age.toString()}
                keyboardType="numeric"
                returnKeyType="done"
                textAlign="center"
                maxLength={3}
                icon={require("../assets/icons/ic_cake.png")}
                onChangeText={(value) => setAge(value)}
                sufix="anos"
              >
                Idade
              </TextInputCustom>
              <View style={styles.margin} />
              <View style={styles.whiteSpace} />
            </View>
          </Card>
          {/* Taxa Metabólica Basal */}
          <Card>
            <Header style={styles.tmbHeader}>Taxa Metabólica Basal</Header>
            <View style={styles.tbmContent}>
              <View style={styles.tbmIcon}>
                <Text style={styles.emojiIcon}>🔥</Text>
              </View>
              <Text style={styles.tbmLabel}>{calculate()}</Text>
            </View>
          </Card>
          <View style={styles.fab}>
            <FabButtonCustom
              disabled={nextButton}
              onPress={() =>
                navigation.navigate("Step 2", {
                  userTMB: tMB,
                  userGender: gender,
                })
              }
              isEmoji={true}
            >
              →
            </FabButtonCustom>
          </View>
          <View style={styles.margin} />
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayLight,
    padding: 24,
  },
  list: {
    padding: 24,
  },
  toggles: {
    flex: 1,
    flexDirection: "row",
  },
  margin: {
    height: 24,
    width: 24,
  },
  whiteSpace: {
    flex: 1,
  },
  fab: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginBottom: 24,
  },
  tmbHeader: {
    color: colors.primary,
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
  emojiIcon: {
    fontSize: 24,
  },
  tbmLabel: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Step1;
