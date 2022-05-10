import React from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import FabButtonCustom from "../components/FabButtonCustom";
import TextCustom from "../components/TextCustom";
import Card from "../components/Card";
import Header from "../components/Header";
import { StatusBar } from "expo-status-bar";
import colors from "../config/colors";

export default function Step4({ route, navigation }) {
  function caloriesWithDot(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.list}>
        <Card>
          <View style={styles.tbmContent}>
            <FabButtonCustom
              onPress={() => navigation.goBack()}
              isEmoji={false}
              size="small"
              backgroundColor="gray"
            >
              ←
            </FabButtonCustom>
            <View style={styles.margin} />
            <View style={styles.margin} />
            <View style={styles.row}>
              <View style={styles.column}>
                <TextCustom
                  fontWeight="Semi Bold"
                  style={[styles.tbmLabel, styles.colorPrimary]}
                >
                  TMB
                </TextCustom>
                <TextCustom
                  fontWeight="Semi Bold"
                  style={[styles.tbmLabel, styles.colorPrimary]}
                >
                  GET
                </TextCustom>
              </View>
              <View style={styles.margin} />
              <View style={styles.caloriesHeader}>
                <TextCustom fontWeight="Semi Bold" style={styles.tbmLabel}>
                  {caloriesWithDot(2000)} kcal
                </TextCustom>
                <TextCustom fontWeight="Semi Bold" style={styles.tbmLabel}>
                  {caloriesWithDot(2000)} kcal
                </TextCustom>
              </View>
            </View>
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
});
