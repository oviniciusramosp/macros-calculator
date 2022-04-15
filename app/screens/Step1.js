import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import Card from "../components/Card";
import Toggle from "../components/ToggleItem";
import TextInputCustom from "../components/TextInputCustom";
import Header from "../components/Header";
import FabButtonCustom from "../components/FabButtonCustom";
import colors from "../config/colors";

function Step1(props) {
  const [gender, setGender] = useState("none");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);

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
      if (gender === "male") {
        return (
          Math.round(
            66.5 + 13.75 * weight + 5.003 * height - 6.75 * age
          ).toString() + " Kcal"
        );
      } else {
        return (
          Math.round(
            655.1 + 9.563 * weight + 1.85 * height - 4.676 * age
          ).toString() + " Kcal"
        );
      }
    }
    return "Preencha os Campos";
  }

  function showAlert(content) {
    Alert.alert(content);
  }

  return (
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
        <FabButtonCustom onPress={() => showAlert("Fab Click")} isEmoji={true}>
          →
        </FabButtonCustom>
      </View>
      <View style={styles.margin} />
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 16,
  },
});

export default Step1;
