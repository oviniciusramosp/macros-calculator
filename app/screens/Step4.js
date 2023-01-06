// react
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { captureRef } from "react-native-view-shot";
// expo libraries
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import * as MediaLibrary from "expo-media-library";
// styles
import colors from "../config/colors";
// custom components
import Card from "../components/Card";
import Divider from "../components/Divider";
import TextCustom from "../components/TextCustom";
import ScreenshotView from "../components/ScreenshotView";
import MacroRow from "../components/MacroRow";
import TableRow from "../components/TableRow";
import FabButtonCustom from "../components/FabButtonCustom";
import Summary from "../components/Summary";
// data
import { UserData } from "../contexts/userdata";
import Header from "../components/Header";
import ModalCustom from "../components/ModalCustom";
import ButtonLarge from "../components/ButtonLarge";

export default function Step4({ navigation }) {
  const { numberWithDot, user, setTotalCalGoal } = useContext(UserData);

  // Modals
  const [isMacroModalVisible, setIsMacroModalVisible] = useState(false);
  const [isCarbModalVisible, setIsCarbModalVisible] = useState(false);
  const [isProteinModalVisible, setisProteinModalVisible] = useState(false);
  const [isFatModalVisible, setIsFatModalVisible] = useState(false);

  function CarbModal() {
    return (
      <ModalCustom
        visible={isCarbModalVisible}
        closeButton={true}
        onRequestClose={() => setIsCarbModalVisible(false)}
        closeButtonFunction={() => setIsCarbModalVisible(false)}
        header={"Carboidratos"}
      >
        <ScrollView style={styles.modalContent}>
          <TextCustom marginBottom={24}>
            A Taxa Metabólica Basal (
            <TextCustom fontWeight="Semi Bold" color={colors.primary}>
              TMB
            </TextCustom>
            ) é a quantidade de energia necessária para a manutenção das funções
            vitais do organismo, como respiração, batimentos cardíacos e
            controle da temperatura corporal.
          </TextCustom>
          <TextCustom marginBottom={24}>
            O valor estima o gasto energético de um dia em total repouso.
          </TextCustom>
        </ScrollView>
        <ButtonLarge onPress={() => setIsCarbModalVisible(false)}>
          Fechar
        </ButtonLarge>
      </ModalCustom>
    );
  }

  // Calculate Total Calories
  function totalGoalCalories() {
    if (user.goal.id == 0) return user.tdee * 1 + user.goalCalDifference * 1; // Superávit Específico
    if (user.goal.id == 1) return user.tdee * 1.15; // Ganhar Peso Rápido
    if (user.goal.id == 2) return user.tdee * 1.07; // Ganhar Peso
    if (user.goal.id == 3) return user.tdee * 1; // Manter Peso
    if (user.goal.id == 4) return user.tdee * 0.85; // Perder Peso
    if (user.goal.id == 5) return user.tdee * 0.7; // Perder Peso Rápido
    if (user.goal.id == 6) return user.tdee * 1 - user.goalCalDifference * 1; // Deficit Específico
  }
  useEffect(() => {
    setTotalCalGoal(Math.round(totalGoalCalories()));
  }, [user.goal, user.tdee, user.goalCalDifference]);

  // Calculate Proteins
  let proteinFactor = 0;
  function calculateProteinGrams() {
    // Magro
    if (user.status == 0) {
      user.gender == "female" ? (proteinFactor = 1.8) : (proteinFactor = 2);
    }
    // Falso Magro
    if (user.status == 1) {
      user.gender == "female" ? (proteinFactor = 2) : (proteinFactor = 2.2);
    }
    // Em Forma
    if (user.status == 2) {
      user.gender == "female" ? (proteinFactor = 2.2) : (proteinFactor = 2.6);
    }
    // Sobrepeso
    if (user.status == 3) proteinFactor = 1.8;
    // Calcular
    return user.weight * proteinFactor;
  }

  const proteinGrams = Math.round(calculateProteinGrams());
  const proteinCalories = proteinGrams * 4;
  const proteinPercentage = Math.round(
    (proteinCalories * 100) / user.totalCalGoal
  );

  // Calculate Fat
  const fatFactor =
    user.weight * 0.8 * 9 >= (user.totalCalGoal - proteinCalories) / 2
      ? (user.totalCalGoal - proteinCalories) / 18 / user.weight
      : 0.8;
  const fatGrams = Math.round(user.weight * fatFactor);
  const fatCalories = fatGrams * 9;
  const fatPercentage = Math.round((fatCalories * 100) / user.totalCalGoal);

  // Calculate Carbs
  const carbGrams =
    user.totalCalGoal - fatCalories - proteinCalories > 0
      ? Math.round((user.totalCalGoal - fatCalories - proteinCalories) / 4)
      : "0";
  const carbsCalories =
    user.totalCalGoal - fatCalories - proteinCalories > 0
      ? Math.round(user.totalCalGoal - fatCalories - proteinCalories)
      : "0";
  const carbsPercentage =
    100 - fatPercentage - proteinPercentage > 0
      ? 100 - fatPercentage - proteinPercentage
      : "0";
  const carbsFactor = Math.round((carbGrams / user.weight) * 10) / 10;

  // Calculate Water
  let waterFactor = 0;
  function waterGrams() {
    if (user.age <= 17) waterFactor = 40;
    if (user.age >= 18 && user.age < 55) waterFactor = 35;
    if (user.age >= 55 && user.age < 65) waterFactor = 30;
    if (user.age >= 65) waterFactor = 25;
    return user.weight * waterFactor;
  }
  const waterLitters = Math.ceil(waterGrams() / 100) / 10;

  // Calculate Fibers
  const fiberGrams = Math.round(user.totalCalGoal / 100);

  // Check Data
  console.log(
    "USER DATA: \n",
    "user goal = " + user.goal + "\n",
    "user tdee = " + user.tdee + "\n",
    "user calories = " + totalGoalCalories() + "\n",
    "user calories rounded = " + user.totalCalGoal + "\n" + "\n",
    "user protein in grams = " + calculateProteinGrams() + "\n",
    "user protein in grams rounded = " + proteinGrams + "\n"
  );

  // To Generate Screenshot
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  const fullDate = dd + "/" + mm + "/" + yyyy;
  const imageData = [
    {
      id: 0,
      item1: {
        label: "Data:",
        value: fullDate,
        icon: "ic_calendar",
      },
      item2: {
        label: "Idade:",
        value: numberWithDot(user.age) + " anos",
        icon: "ic_cake",
      },
      divider: "simple",
    },
    {
      id: 1,
      item1: {
        label: "Altura:",
        value: numberWithDot(user.height) + " cm",
        icon: "ic_height",
      },
      item2: {
        label: "Peso:",
        value: numberWithDot(user.weight) + " kg",
        icon: "ic_weight",
      },
      divider: "double",
    },
    {
      id: 2,
      title: "Calorias",
    },
    {
      id: 3,
      label: "Taxa Metabólica Basal:",
      value: numberWithDot(user.tmb) + " kcal",
      icon: "ic_fire",
      divider: "simple",
    },
    {
      id: 4,
      label: "Gasto Energético Total:",
      value: numberWithDot(user.tdee) + " kcal",
      icon: "ic_fire",
      divider: "simple",
    },
    {
      id: 5,
      label: "Meta de Consumo Calórico:",
      value: numberWithDot(user.totalCalGoal) + " kcal",
      icon: "ic_fire",
      divider: "simple",
    },
    {
      id: 6,
      label: "Objetivo:",
      value: user.goal.label,
      icon: user.goal.icon,
      divider: "double",
    },
    {
      id: 7,
      title: "Macronutrientes",
    },
    {
      id: 8,
      label: "Carboidratos:",
      value: numberWithDot(carbGrams) + " g",
      icon: "ic_bread",
      divider: "simple",
    },
    {
      id: 9,
      label: "Proteínas:",
      value: numberWithDot(proteinGrams) + " g",
      icon: "ic_chicken",
      divider: "simple",
    },
    {
      id: 10,
      label: "Gorduras:",
      value: numberWithDot(fatGrams) + " g",
      icon: "ic_peanuts",
      divider: "double",
    },
    {
      id: 11,
      label: "Água:",
      value: numberWithDot(waterLitters) + " L",
      icon: "ic_water_cup",
      divider: "simple",
    },
    {
      id: 12,
      label: "Fibras:",
      value: fiberGrams + " g",
      icon: "ic_apple",
    },
  ];
  const screenshotView = useRef();
  function onCapture() {
    captureRef(screenshotView, {
      format: "png",
      quality: 1,
      snapshotContentContainer: true,
    }).then(
      (uri) => MediaLibrary.saveToLibraryAsync(uri),
      alert("Imagem Salva"),
      (error) => alert("Ops, Sua Imagem Não Foi Salva", error)
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.list}>
        <Summary backFunction={() => navigation.goBack()} />
        <Card padding={0} cardList={true}>
          <Header marginBottom={4} marginTop={24}>
            Macronutrientes
          </Header>
          <TouchableOpacity>
            <MacroRow
              title={"Proteínas"}
              iconName={"ic_chicken"}
              // iconColor={"#FD7036"}
              value={proteinGrams}
              kcal={proteinCalories}
              percentage={proteinPercentage}
              composition={[proteinFactor, "g/kg"]}
            />
          </TouchableOpacity>
          <Divider />
          <MacroRow
            title={"Gorduras"}
            iconName={"ic_peanuts"}
            // iconColor={"#CA6F59"}
            value={fatGrams}
            kcal={fatCalories}
            percentage={fatPercentage}
            composition={[fatFactor, "g/kg"]}
          />
          <Divider />
          <TouchableOpacity onPress={() => setIsCarbModalVisible(true)}>
            <MacroRow
              title={"Carboidratos"}
              iconName={"ic_bread"}
              // iconColor={"#CC996D"}
              value={carbGrams}
              kcal={carbsCalories}
              percentage={carbsPercentage}
              composition={[carbsFactor, "g/kg"]}
              preciseFactor={carbGrams / user.weight}
            />
            <CarbModal />
          </TouchableOpacity>
        </Card>
        <Card padding={0} cardList={true} marginBottom={false}>
          <MacroRow
            title={"Água"}
            iconName={"ic_water_cup"}
            // iconColor={"#1EA5FC"}
            value={waterLitters}
            unit={"L"}
            // composition={[waterFactor, "ml/kg"]}
          />
          <Divider />
          <MacroRow
            title={"Fibras"}
            iconName={"ic_apple"}
            // iconColor={"#77EA7E"}
            value={fiberGrams}
          />
        </Card>
        <ScreenshotView hidden={true} ref={screenshotView}>
          <Card padding={0} marginBottom={false}>
            {imageData.map((item) => {
              return <TableRow key={item.id} item={item} />;
            })}
          </Card>
        </ScreenshotView>
      </ScrollView>
      <View>
        <LinearGradient
          style={styles.fab}
          colors={colors.grayLightGradient}
          locations={[0, 0.5]}
        >
          <FabButtonCustom onPress={() => onCapture()} icon={"ic_download"} />
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
    backgroundColor: colors.grayLight,
    borderRadius: 46,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  horizontalCentered: {
    alignItems: "center",
  },
  spaceBetween: {
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  fillWidth: {
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
  modalContent: {
    padding: 24,
  },
});
