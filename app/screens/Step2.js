import React from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import Card from "../components/Card";
import FabButtonCustom from "../components/FabButtonCustom";
import Header from "../components/Header";
import { StatusBar } from "expo-status-bar";
import colors from "../config/colors";

function Step2({ route, navigation }) {
  const { userTMB, userGender } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.list}>
        {/* Taxa Metabólica Basal */}
        <Card>
          <View style={styles.tbmContent}>
            <View style={styles.tbmIcon}>
              <Text style={styles.emojiIcon}>
                {userGender === "male" ? "🧔‍♂️" : "👩"}
              </Text>
            </View>
            <Text style={styles.tbmLabel}>TMB {userTMB} Kcal</Text>
          </View>
        </Card>
        <Card>
          <Header>Nível de Atividade</Header>
          <Text>{userTMB}</Text>
        </Card>
        <Card>
          <Header style={styles.tdeeHeader}>Gasto Calórico Diário</Header>
          <View style={styles.tdeeContent}>
            <View style={styles.tdeeIcon}>
              <Text style={styles.emojiIcon}>🔥</Text>
            </View>
            <Text style={styles.tdeeLabel}>aaa</Text>
          </View>
        </Card>
        <FabButtonCustom onPress={() => navigation.goBack()} isEmoji={true}>
          ←
        </FabButtonCustom>
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
