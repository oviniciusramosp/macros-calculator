import React, { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

import { UserData } from "../contexts/userdata";

function Step1({ navigation }) {
  const {
    numberWithDot,
    user,
    setUserGender,
    setUserHeight,
    setUserWeight,
    setUserAge,
    setUserTMB,
  } = useContext(UserData);

  var isNextButtonDisabled = true;

  const maleTMB = Math.round(
    //Mifflin (1990)
    10 * user.weight + 6.25 * user.height - 5 * user.age + 5
    // Harris Benedict (1919)
    //66.5 + 13.75 * weight + 5.003 * height - 6.75 * age
  );

  const femaleTMB = Math.round(
    //Mifflin (1990)
    10 * user.weight + 6.25 * user.height - 5 * user.age - 161
    // Harris Benedict (1919)
    //655.1 + 9.563 * weight + 1.85 * height - 4.676 * age
  );

  function calculate() {
    if (user.height > 0 && user.weight > 0 && user.age > 10) {
      isNextButtonDisabled = false;
      if (user.gender == "male") {
        setUserTMB(maleTMB);
      } else {
        setUserTMB(femaleTMB);
      }
      return numberWithDot(user.tmb) + " kcal";
    } else {
      setUserTMB(0);
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
                onPress={() => setUserGender("male")}
                isSelected={user.gender == "male" ? true : false}
                icon="ic_male"
              />
              <View style={styles.margin} />
              <Toggle
                onPress={() => setUserGender("female")}
                icon="ic_female"
                isSelected={user.gender == "female" ? true : false}
              />
            </View>
          </Card>
          {/* Medidas */}
          <Card>
            <Header>Suas Medidas</Header>
            <View style={styles.row}>
              <TextInputCustom
                label="Altura"
                maxLength={3}
                placeholder="000"
                keyboardType="number-pad"
                returnKeyType="done"
                textAlign="center"
                value={user.height}
                onChangeText={(value) => setUserHeight(value)}
                sufix="cm"
                icon="ic_height"
              />
              <View style={styles.margin} />
              <TextInputCustom
                label="Peso"
                maxLength={3}
                placeholder="000"
                keyboardType="number-pad"
                returnKeyType="done"
                textAlign="center"
                value={user.weight}
                onChangeText={(value) => setUserWeight(value)}
                sufix="kg"
                icon="ic_weight"
              />
            </View>
            <View style={styles.margin} />
            <View style={styles.row}>
              <TextInputCustom
                label="Idade"
                maxLength={3}
                placeholder="00"
                keyboardType="number-pad"
                returnKeyType="done"
                textAlign="center"
                value={user.age}
                onChangeText={(value) => setUserAge(value)}
                sufix="anos"
                icon="ic_cake"
              />
              <View style={styles.margin} />
              <View style={styles.whiteSpace} />
            </View>
          </Card>
          {/* Taxa Metabólica Basal */}
          <Card>
            <Header style={styles.colorPrimary}>Taxa Metabólica Basal</Header>

            {user.gender === "none" ? (
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
            ) : user.height > 250 || user.weight > 300 || user.age > 110 ? (
              <View style={styles.tbmContent}>
                <View style={styles.tbmIcon}>
                  <IconCustom name={"ic_face_serious"} size="28" />
                </View>
                <TextCustom fontWeight="Semi Bold" style={styles.tbmLabel}>
                  Eu sou uma piada para você?
                </TextCustom>
              </View>
            ) : user.height > 0 && user.weight > 0 && user.age > 10 ? (
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
                userGender: user.gender,
                userWeight: user.weight,
                userAge: user.age,
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
