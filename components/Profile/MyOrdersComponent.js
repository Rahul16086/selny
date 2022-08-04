import { StyleSheet, StatusBar, ScrollView } from "react-native";
import React from "react";
import OrdersBanner from "../UI/Banner/OrdersBanner";

const MyOrdersComponent = () => {
  const styles = StyleSheet.create({
    container: {
      marginTop: StatusBar.currentHeight,
    },
  });
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <OrdersBanner />
      <OrdersBanner />
      <OrdersBanner />
      <OrdersBanner />
      <OrdersBanner />
      <OrdersBanner />
      <OrdersBanner />
      <OrdersBanner />
    </ScrollView>
  );
};

export default MyOrdersComponent;
