import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
// styles
// custom components
import TextCustom from "./TextCustom";
import IconCustom from "./IconCustom";
// data
import Divider from "./Divider";
import Header from "./Header";

export default function TableRow({ item }) {
  return (
    <View>
      <View style={[styles.tableRow, item.title && styles.header]}>
        {/* HEADER */}
        {item.title && <Header style={[styles.header]}>{item.title}</Header>}
        {/* ICON + LABEL */}
        {item.icon || item.label ? (
          <View style={styles.row}>
            {item.icon ? (
              <IconCustom name={item.icon} style={styles.icon} size={24} />
            ) : null}
            <TextCustom>{item.label}</TextCustom>
          </View>
        ) : null}
        {/* VALUE */}
        {item.value && <TextCustom>{item.value}</TextCustom>}
        {/* HAS 2 ITEMS */}
        {item.item1 && item.item2 ? (
          <>
            {/* ICON 1 + LABEL 1 */}
            <View style={[styles.spaceBetween, styles.row, styles.fillWidth]}>
              {item.item1.icon || item.item1.label ? (
                <View style={styles.row}>
                  {item.item1.icon ? (
                    <IconCustom
                      name={item.item1.icon}
                      style={styles.icon}
                      size={24}
                    />
                  ) : null}
                  <TextCustom>{item.item1.label}</TextCustom>
                </View>
              ) : null}
              {/* VALUE 1 */}
              {item.item1.value && <TextCustom>{item.item1.value}</TextCustom>}
            </View>
            <View style={styles.betweenColumns} />
            <View style={[styles.spaceBetween, styles.row, styles.fillWidth]}>
              {/* ICON 2 + LABEL 2 */}
              {item.item2.icon || item.item2.label ? (
                <View style={styles.row}>
                  {item.item2.icon ? (
                    <IconCustom
                      name={item.item2.icon}
                      style={styles.icon}
                      size={24}
                    />
                  ) : null}
                  <TextCustom>{item.item2.label}</TextCustom>
                </View>
              ) : null}
              {/* VALUE 2*/}
              {item.item2.value && <TextCustom>{item.item2.value}</TextCustom>}
            </View>
          </>
        ) : null}
      </View>
      {/* DIVIDER */}
      {item.divider && (
        <Divider
          style={
            item.divider == "double"
              ? styles.dividerDouble
              : styles.dividerSimple
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  fillWidth: {
    flex: 1,
  },
  spaceBetween: {
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  tableRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: "space-between",
  },
  header: {
    marginBottom: 0,
    paddingBottom: 0,
  },
  icon: {
    marginRight: 12,
  },
  betweenColumns: {
    width: 24,
  },
  dividerSimple: {
    marginLeft: 24,
  },
  dividerDouble: {
    height: 3,
  },
});
