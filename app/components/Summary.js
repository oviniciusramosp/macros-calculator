import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
// styles
import colors from "../config/colors";
// custom components
import Card from "./Card";
import FabButtonCustom from "./FabButtonCustom";
import TextCustom from "./TextCustom";

// data
import { UserData } from "../contexts/userdata";

const Summary = ({ hideTDEE, hideGoal, backFunction }) => {
  const { numberWithDot, user } = useContext(UserData);

  return (
    <Card>
      <View style={[styles.row]}>
        <FabButtonCustom
          onPress={backFunction}
          isEmoji={false}
          size="small"
          buttonStyle="outlined"
          icon="ic_arrow"
          iconRotate={180}
          style={styles.fabBack}
        />
        <View style={styles.row}>
          <View style={styles.fillWidth}>
            {/* LABELS */}
            <TextCustom
              fontWeight="Semi Bold"
              color={hideGoal ? colors.black : colors.grayDark}
              fontSize={hideGoal ? 16 : 12}
            >
              TMB
            </TextCustom>
            <TextCustom
              fontWeight="Semi Bold"
              color={hideGoal ? colors.black : colors.grayDark}
              fontSize={hideGoal ? 16 : 12}
              hidden={hideTDEE}
            >
              GET
            </TextCustom>
            <TextCustom fontWeight="Semi Bold" fontSize={16} hidden={hideGoal}>
              Objetivo
            </TextCustom>
          </View>
          {/* VALUES */}
          <View style={styles.values}>
            <TextCustom
              fontWeight={hideGoal ? "Semi Bold" : "Regular"}
              color={hideGoal ? colors.primary : colors.black}
              fontSize={hideGoal ? 16 : 12}
            >
              {numberWithDot(user.tmb)} kcal
            </TextCustom>
            <TextCustom
              fontWeight={hideGoal ? "Semi Bold" : "Regular"}
              color={hideGoal ? colors.primary : colors.black}
              fontSize={hideGoal ? 16 : 12}
              hidden={hideTDEE}
            >
              {numberWithDot(user.tdee)} kcal
            </TextCustom>
            <TextCustom
              fontWeight="Semi Bold"
              color={colors.primary}
              fontSize={16}
              hidden={hideGoal}
            >
              {numberWithDot(user.totalCalGoal)}
              <TextCustom fontWeight="Semi Bold" fontSize={12}>
                {" "}
                kcal
              </TextCustom>
            </TextCustom>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default Summary;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  fabBack: {
    marginRight: 24,
  },
  fillWidth: {
    flex: 1,
  },
  values: {
    alignItems: "flex-end",
  },
});
