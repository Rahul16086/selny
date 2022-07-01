import { Text, StyleSheet } from "react-native";
import React from "react";

const GrayText18 = ({ children }) => {
  const style = StyleSheet.create({
    font: {
      fontSize: 18,
      fontFamily: "montserrat",
      color: "#6d6d6d",
    },
  });
  return <Text style={style.font}>{children}</Text>;
};

export default GrayText18;
