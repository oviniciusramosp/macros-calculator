import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import Card from "../components/Card";
import FabButtonCustom from "../components/FabButtonCustom";
import Header from "../components/Header";
import { StatusBar } from "expo-status-bar";
import colors from "../config/colors";
import Toggle from "../components/ToggleItem";

function Step2({ route, navigation }) {
  const { userTMB, userGender } = route.params;
  const [activityLevel, setActivityLevel] = useState("male");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.list}>
        {/* Taxa Metabólica Basal */}
        <Card>
          <View style={styles.tbmContent}>
            <FabButtonCustom
              onPress={() => navigation.goBack()}
              isEmoji={true}
              size="small"
            >
              ←
            </FabButtonCustom>
            <View style={styles.margin} />
            <Text style={styles.tbmLabel}>TMB </Text>
            <Text style={styles.tbmLabel}>{userTMB} Kcal</Text>
          </View>
        </Card>
        <Card>
          <Header>Nível de Atividade</Header>
          <View style={styles.row}>
            <Toggle
              onPress={() => setActivityLevel("male")}
              isEmoji={false}
              isSelected={activityLevel === "male" ? true : false}
            >
              Exercícios
            </Toggle>
            <View style={styles.margin} />
            <Toggle
              onPress={() => setActivityLevel("female")}
              isEmoji={false}
              isSelected={activityLevel === "female" ? true : false}
            >
              Calorias
            </Toggle>
          </View>
        </Card>
        <Card>
          <Header style={styles.tdeeHeader}>Gasto Calórico Diário</Header>
          <View style={styles.tdeeContent}>
            <View style={styles.tdeeIcon}>
              <Text style={styles.emojiIcon}>
                {userGender === "male" ? "🧔‍♂️" : "👩"}
              </Text>
            </View>
            <Text style={styles.tdeeLabel}>{userTMB}</Text>
          </View>
        </Card>
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
  row: {
    flex: 1,
    flexDirection: "row",
  },
  margin: {
    height: 24,
    width: 12,
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
  tbmLabel: {
    fontSize: 18,
    fontWeight: "600",
  },
  tdeeHeader: {
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
});

export default Step2;
