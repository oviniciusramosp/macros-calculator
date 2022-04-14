import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import * as Haptics from "expo-haptics";

import Card from "../components/Card";
import ButtonLarge from "../components/ButtonLarge";
import Toggle from "../components/ToggleItem";
import TextInputCustom from "../components/TextInputCustom";
import Header from "../components/Header";

function Step1(props) {
  const [gender, setGender] = useState("none");
  const [height, setHeight] = useState(160);
  const [weight, setWeight] = useState(70);
  const [age, setAge] = useState(25);

  const setToggleGender = function (genderValue) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (gender === genderValue) {
      setGender("none");
    } else {
      setGender(genderValue);
    }
  };

  function hapticFeedback() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }

  const onPress = function () {};
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
            defaultValue={height.toString()}
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
            defaultValue={weight.toString()}
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
            defaultValue={age.toString()}
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
        <Header>Taxa Metabólica Basal</Header>
        <Text>
          {gender === "female"
            ? Math.round(655.1 + 9.563 * weight + 1.85 * height - 4.676 * age)
            : gender === "male"
            ? Math.round(66.5 + 13.75 * weight + 5.003 * height - 6.75 * age)
            : "Selecione um Gênero"}
        </Text>
      </Card>
      <ButtonLarge onPress={onPress()} isEmoji={true}>
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
  whiteSpace: {
    flex: 1,
  },
});

export default Step1;
