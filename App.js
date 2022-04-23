import React from "react";
import { StyleSheet, View } from "react-native";

import Step1 from "./app/screens/Step1";
import Step2 from "./app/screens/Step2";
import Step3 from "./app/screens/Step3";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Step 1"
          component={Step1}
          options={{
            headerShown: false,
            headerBlurEffect: true,
          }}
        />
        <Stack.Screen
          name="Step 2"
          component={Step2}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Step 3"
          component={Step3}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
