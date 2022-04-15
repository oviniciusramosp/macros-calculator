import React from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import Card from "../components/Card";
import FabButtonCustom from "../components/FabButtonCustom";
import Header from "../components/Header";
import { StatusBar } from "expo-status-bar";
import colors from "../config/colors";

function Step2({ route, navigation }) {
  const { userTMB, otherParameter } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.list}>
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
});

export default Step2;
