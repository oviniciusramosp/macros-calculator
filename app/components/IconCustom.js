import * as React from "react";
import colors from "../config/colors";
import { View } from "react-native";
// Icons Available
import IconWeight from "../assets/icons/IconWeight";
import IconHeight from "../assets/icons/IconHeight";
import IconCake from "../assets/icons/IconCake";
import IconGenderMale from "../assets/icons/IconGenderMale";
import IconGenderFemale from "../assets/icons/IconGenderFemale";

export default function IconCustom({
  color = colors.primary,
  size = "24",
  name,
  filled = false,
}) {
  return (
    <View>
      {/* {render: function() {
              switch({name}) {
                  case "ic_weight":
                      return (<IconWeight color={color} size={size} filled={filled} />)
                      break;
                  case "ic_height":
                      break;
          } */}

      {(() => {
        switch (name) {
          case "ic_placeholder":
            return <IconWeight color={color} size={size} filled={filled} />;
          case "ic_weight":
            return <IconWeight color={color} size={size} filled={filled} />;
          case "ic_height":
            return <IconHeight color={color} size={size} filled={filled} />;
          case "ic_cake":
            return <IconCake color={color} size={size} filled={filled} />;
          case "ic_male":
            return <IconGenderMale color={color} size={size} filled={filled} />;
          case "ic_female":
            return (
              <IconGenderFemale color={color} size={size} filled={filled} />
            );
          default:
            return null;
        }
      })()}
    </View>
  );
}