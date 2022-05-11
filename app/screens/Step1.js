import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
// expo libraries
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
// styles
import colors from "../config/colors";
// custom components
import Card from "../components/Card";
import Toggle from "../components/ToggleItem";
import TextInputCustom from "../components/TextInputCustom";
import Header from "../components/Header";
import FabButtonCustom from "../components/FabButtonCustom";
import TextCustom from "../components/TextCustom";
import IconCustom from "../components/IconCustom";

function Step1({ navigation }) {
  const [gender, setGender] = useState("none");
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [age, setAge] = useState();
  var tMB = 0;
  var isNextButtonDisabled = true;

  const maleTMB = Math.round(
    66.5 + 13.75 * weight + 5.003 * height - 6.75 * age
  );

  const femaleTMB = Math.round(
    655.1 + 9.563 * weight + 1.85 * height - 4.676 * age
  );

  const setToggleGender = function (genderValue) {
    if (gender === genderValue) {
      setGender("none");
    } else {
      setGender(genderValue);
    }
  };

  function caloriesWithDot(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function calculate() {
    if (height > 0 && weight > 0 && age > 10) {
      isNextButtonDisabled = false;
      if (gender === "male") {
        tMB = maleTMB;
        return caloriesWithDot(maleTMB) + " kcal";
      } else {
        tMB = femaleTMB;
        return caloriesWithDot(femaleTMB) + " kcal";
      }
    } else {
      tMB = 0;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.list}>
        <View>
          {/* Gender */}
          <Card>
            <Header>Selecione seu Gênero</Header>
            <View style={styles.row}>
              <Toggle
                onPress={() => setToggleGender("male")}
                isSelected={gender === "male" ? true : false}
                icon="ic_male"
              />
              <View style={styles.margin} />
              <Toggle
                onPress={() => setToggleGender("female")}
                // emoji="👩"
                // label="test"
                icon="ic_female"
                isSelected={gender === "female" ? true : false}
              />
            </View>
          </Card>
          {/* Medidas */}
          <Card>
            <Header>Suas Medidas</Header>
            <View style={styles.row}>
              <TextInputCustom
                maxLength={3}
                placeholder="000"
                keyboardType="number-pad"
                returnKeyType="done"
                textAlign="center"
                onChangeText={(value) => setHeight(value)}
                sufix="cm"
                icon="ic_height"
              >
                Altura
              </TextInputCustom>
              <View style={styles.margin} />
              <TextInputCustom
                maxLength={3}
                placeholder="000"
                keyboardType="number-pad"
                returnKeyType="done"
                textAlign="center"
                onChangeText={(value) => setWeight(value)}
                sufix="kg"
                icon="ic_weight"
              >
                Peso
              </TextInputCustom>
            </View>
            <View style={styles.margin} />
            <View style={styles.row}>
              <TextInputCustom
                maxLength={3}
                placeholder="00"
                keyboardType="number-pad"
                returnKeyType="done"
                textAlign="center"
                onChangeText={(value) => setAge(value)}
                sufix="anos"
                icon="ic_cake"
              >
                Idade
              </TextInputCustom>
              <View style={styles.margin} />
              <View style={styles.whiteSpace} />
            </View>
          </Card>
          {/* Taxa Metabólica Basal */}
          <Card>
            <Header style={styles.colorPrimary}>Taxa Metabólica Basal</Header>

            {gender === "none" ? (
              <View style={styles.tbmContent}>
                <View style={styles.tbmIcon}>
                  <IconCustom
                    name={"ic_gender"}
                    color={colors.grayDark}
                    size="28"
                  />
                </View>
                <TextCustom fontWeight="Semi Bold" style={styles.tbmLabel}>
                  Selecione um Gênero
                </TextCustom>
              </View>
            ) : height > 250 || weight > 300 || age > 110 ? (
              <View style={styles.tbmContent}>
                <View style={styles.tbmIcon}>
                  <IconCustom name={"ic_face_serious"} size="28" />
                </View>
                <TextCustom fontWeight="Semi Bold" style={styles.tbmLabel}>
                  Eu sou uma piada para você?
                </TextCustom>
              </View>
            ) : height > 0 && weight > 0 && age > 10 ? (
              <View style={styles.tbmContent}>
                <View style={styles.tbmIcon}>
                  <IconCustom name={"ic_fire"} size="28" />
                </View>
                <TextCustom fontWeight="Semi Bold" style={styles.tbmLabel}>
                  {calculate()}
                </TextCustom>
              </View>
            ) : (
              <View style={styles.tbmContent}>
                <View style={styles.tbmIcon}>
                  <TextCustom style={styles.emojiIcon}>🔥</TextCustom>
                </View>
                <TextCustom fontWeight="Semi Bold" style={styles.tbmLabel}>
                  Preencha todos os Campos
                </TextCustom>
              </View>
            )}
          </Card>
        </View>
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
              navigation.navigate("Step 2", {
                userTMB: tMB,
                userGender: gender,
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
  whiteSpace: {
    flex: 1,
  },
  fab: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 24,
    position: "absolute",
    bottom: 0,
  },
  colorPrimary: {
    color: colors.primary,
  },
  tbmContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  tbmIcon: {
    borderColor: colors.fadedGrayLight,
    borderWidth: 1,
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
    flex: 1,
  },
});

export default Step1;
