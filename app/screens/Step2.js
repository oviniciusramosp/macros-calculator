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
          <Header>Step 2</Header>
          <Text>{userTMB}</Text>
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

export default Step2;
