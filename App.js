import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";

import colors from "./app/config/colors";
import Step1 from "./app/screens/Step1";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.list}>
        <Step1 />
      </ScrollView>
      <StatusBar style="auto" />
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
  },
});
