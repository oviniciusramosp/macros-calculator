import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import * as Haptics from "expo-haptics";

import Card from "../components/Card";
import ButtonLarge from "../components/ButtonLarge";
import Toggle from "../components/ToggleItem";
import TextInputCustom from "../components/TextInputCustom";
import Header from "../components/Header";

function Step1(props) {
  const [gender, setGender] = useState("none");

  const setToggleGender = function (genderValue) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    gender === genderValue ? setGender("none") : setGender(genderValue);
  };

  const onPress = function () {
    console.log("2");
  };

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
            placeholder="000 cm"
            keyboardType="numeric"
            returnKeyType="done"
            textAlign="center"
            icon={require("../assets/icons/ic_height.png")}
          >
            Altura
          </TextInputCustom>
          <View style={styles.margin} />
          <TextInputCustom
            placeholder="000 Kg"
            keyboardType="numeric"
            returnKeyType="done"
            textAlign="center"
          >
            Peso
          </TextInputCustom>
        </View>
        <View style={styles.margin} />
        <View style={styles.toggles}>
          <TextInputCustom
            placeholder="00 anos"
            keyboardType="numeric"
            returnKeyType="done"
            textAlign="center"
          >
            Idade
          </TextInputCustom>
          <View style={styles.margin} />
          <TextInputCustom></TextInputCustom>
        </View>
      </Card>
      {/* Taxa Metabólica Basal */}
      <Card>
        <Header>Taxa Metabólica Basal</Header>
      </Card>
      <ButtonLarge onPress={onPress} isEmoji={true}>
        Calcular
      </ButtonLarge>
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
});

export default Step1;
