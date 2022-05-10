import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from "react-native";
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
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);
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

  function calculate() {
    if (gender === "none") {
      return "Selecione um Gênero";
    }
    if (height > 0 && weight > 0 && age > 0) {
      isNextButtonDisabled = false;
      if (gender === "male") {
        tMB = maleTMB;
        return (
          maleTMB.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " kcal"
        );
      } else {
        tMB = femaleTMB;
        return (
          femaleTMB.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " kcal"
        );
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
      <ScrollView contentContainerStyle={styles.list}>
        <View>
          {/* Gender */}
          <Card>
            <Header>Selecione seu Gênero</Header>
            <View style={styles.row}>
              <Toggle
                onPress={() => setToggleGender("male")}
                isEmoji={true}
                isSelected={gender === "male" ? true : false}
              >
                👨
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
            <View style={styles.row}>
              <TextInputCustom
                placeholder="000"
                keyboardType="number-pad"
                // defaultValue={height.toString()}
                maxLength={3}
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
                placeholder="000"
                // defaultValue={weight.toString()}
                keyboardType="number-pad"
                returnKeyType="done"
                textAlign="center"
                maxLength={3}
                onChangeText={(value) => setWeight(value)}
                sufix="Kg"
                icon="ic_weight"
              >
                Peso
              </TextInputCustom>
            </View>
            <View style={styles.margin} />
            <View style={styles.row}>
              <TextInputCustom
                placeholder="00"
                // defaultValue={age.toString()}
                keyboardType="number-pad"
                returnKeyType="done"
                textAlign="center"
                maxLength={3}
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
            <Header style={styles.colorPrimary}>Taxa Metabólica Basal</Header>
            <View style={styles.tbmContent}>
              <View style={styles.tbmIcon}>
                <TextCustom style={styles.emojiIcon}>🔥</TextCustom>
              </View>
              <TextCustom fontWeight="Semi Bold" style={styles.tbmLabel}>
                {calculate()}
              </TextCustom>
            </View>
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
            isEmoji={true}
          >
            →
          </FabButtonCustom>
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
