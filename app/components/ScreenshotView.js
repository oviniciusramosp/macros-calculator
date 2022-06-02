import React from "react";
import { StyleSheet, ScrollView } from "react-native";

const ScreenshotView = React.forwardRef((props, ref) => (
  <ScrollView ref={ref} style={props.hidden && styles.hidden}>
    {props.children}
  </ScrollView>
));

const styles = StyleSheet.create({
  view: {
    position: "absolute",
  },
  hidden: {
    opacity: 0,
  },
});

export default ScreenshotView;
