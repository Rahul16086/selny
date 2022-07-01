import { View, Text, StyleSheet } from "react-native";
import React from "react";
import GrayText18 from "../Text/GrayText18";

const OrderDetailedBanner = ({ productInfo }) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
      height: "100%",
      borderRadius: 5,
      elevation: 8,
      paddingHorizontal: 20,
      alignItems: "flex-start",
      justifyContent: "center",
    },
    productName: {
      fontSize: 28,
      fontWeight: "500",
    },
    priceContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    productPrice: {
      fontSize: 30,
      fontWeight: "700",
    },
    priceSymbol: {
      fontSize: 24,
      marginRight: 5,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.productName}>{productInfo.name}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.priceSymbol}>£</Text>
        <Text style={styles.productPrice}>{productInfo.price}</Text>
      </View>
      <GrayText18>Delivered On {productInfo.deliveryDate}</GrayText18>
      <GrayText18>Ordered On {productInfo.orderDate}</GrayText18>
      <GrayText18>Paid via {productInfo.paymentInfo}</GrayText18>
      <GrayText18>
        Replacement till {productInfo.replacementTillDate}
      </GrayText18>
    </View>
  );
};

export default OrderDetailedBanner;
