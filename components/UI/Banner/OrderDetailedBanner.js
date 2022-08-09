import { View, Text, StyleSheet } from "react-native";
import React from "react";
import GrayText18 from "../Text/GrayText18";
import TextBold22 from "../Text/TextBold22";

const OrderDetailedBanner = ({ itemInfo, orderInfo }) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
      height: "100%",
      borderRadius: 5,
      elevation: 8,
      paddingHorizontal: 20,
      paddingVertical: 10,
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    productName: {
      fontSize: 28,
      fontFamily: "montserrat",
    },
    priceContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    productPrice: {
      fontSize: 30,
      fontFamily: "montserratBold",
    },
    priceSymbol: {
      fontSize: 24,
      marginRight: 5,
      fontFamily: "montserrat",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.productName}>
        {itemInfo.brand
          ? itemInfo.brand + " " + itemInfo.item_name
          : itemInfo.item_name}
      </Text>
      <GrayText18>Quantity - {orderInfo.quantity}</GrayText18>
      <View style={styles.priceContainer}>
        <Text style={styles.priceSymbol}>£</Text>
        <Text style={styles.productPrice}>
          {itemInfo.price * orderInfo.quantity}
        </Text>
      </View>

      {orderInfo.orderStatus !== "Delivered" ? (
        <GrayText18>Order Status - {orderInfo.orderStatus}</GrayText18>
      ) : (
        <GrayText18>Delivered on - {orderInfo.orderStatus}</GrayText18>
      )}
      <GrayText18>Address - {orderInfo.address}</GrayText18>
      <GrayText18>Paid via Credit Card ending 9867</GrayText18>
      {orderInfo.orderStatus === "Delivered" && (
        <GrayText18>
          Replacement till {orderInfo.replacementTillDate}
        </GrayText18>
      )}
    </View>
  );
};

export default OrderDetailedBanner;
