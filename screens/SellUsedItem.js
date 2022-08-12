import { View, StyleSheet } from "react-native";
import React from "react";
import SellProduct from "../components/SellProduct/SellProduct";

const SellUsedItem = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
  });
  return (
    <View style={styles.container}>
      <SellProduct />
    </View>
  );
};

export default SellUsedItem;
