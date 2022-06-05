import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";

const ScreenshotView = React.forwardRef((props, ref) => (
  <ScrollView
    ref={ref}
    style={[props.hidden && styles.view, props.hidden && styles.hidden]}
  >
    {props.children}
  </ScrollView>
));

const styles = StyleSheet.create({
  view: {
    position: "absolute",
    top: 0,
    height: 0,
    width: 400,
    maxWidth: 400,
  },
  hidden: {
    opacity: 0,
  },
});

export default ScreenshotView;
