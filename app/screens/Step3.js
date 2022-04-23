import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import Card from "../components/Card";
import FabButtonCustom from "../components/FabButtonCustom";
import Header from "../components/Header";
import { StatusBar } from "expo-status-bar";
import colors from "../config/colors";
import TextInputCustom from "../components/TextInputCustom";
import TextCustom from "../components/TextCustom";

function Step3({ route, navigation }) {
  const { userTDEE, userTMB } = route.params;

  var isNextButtonDisabled = true;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.list}>
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
            <View>
              <View style={styles.row}>
                <TextCustom
                  fontWeight="Semi Bold"
                  style={[styles.tbmLabel, styles.colorPrimary]}
                >
                  TMB{" "}
                </TextCustom>
                <TextCustom fontWeight="Semi Bold" style={styles.tbmLabel}>
                  {userTMB} kcal
                </TextCustom>
              </View>
              <View style={styles.row}>
                <TextCustom
                  fontWeight="Semi Bold"
                  style={[styles.tbmLabel, styles.colorPrimary]}
                >
                  GET{" "}
                </TextCustom>
                <TextCustom fontWeight="Semi Bold" style={styles.tbmLabel}>
                  {userTDEE} kcal
                </TextCustom>
              </View>
            </View>
          </View>
        </Card>
        <Card>
          <Header>Estado Atual</Header>
        </Card>
        <View style={styles.fab}>
          <FabButtonCustom
            disabled={isNextButtonDisabled}
            onPress={() => navigation.navigate("Step 2", {})}
            isEmoji={true}
          >
            →
          </FabButtonCustom>
        </View>
        <View style={styles.margin} />
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
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  margin: {
    height: 24,
    width: 12,
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
  colorPrimary: {
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
  activityLabel: {
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  activityInput: {
    width: 152,
    alignSelf: "center",
  },
  fab: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginBottom: 24,
  },
  hide: {
    display: "none",
  },
});

export default Step3;
