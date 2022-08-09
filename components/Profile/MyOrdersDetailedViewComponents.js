import { View, StyleSheet, StatusBar, Image, Text, Alert } from "react-native";
import React, { useState } from "react";
import productImageHires from "../../assets/productImageHiRes.png";
import YellowButton from "../UI/Buttons/YellowButton";
import OrangeButton from "../UI/Buttons/OrangeButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import GrayText18 from "../UI/Text/GrayText18";
import DropDownPicker from "react-native-dropdown-picker";
import "react-native-get-random-values";
import { v4 } from "uuid";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const MyOrdersDetailedViewComponents = () => {
  const Route = useRoute();
  const Navigation = useNavigation();
  const { orderInfo, itemInfo, storeAdmin } = Route.params;
  const [orderStatusToggle, setOrderStatusToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      label: "Preparing to ship",
      value: "Preparing to ship",
      key: v4(),
    },
    {
      label: "Shipping",
      value: "Shipping",
      key: v4(),
    },
    {
      label: "Delivered",
      value: "Delivered",
      key: v4(),
    },
  ]);

  const editToggle = () => {
    setOrderStatusToggle(!orderStatusToggle);
  };

  const updateHandler = async () => {
    if (value === null) {
      Alert.alert("Order status !", "Please select an order status to update");
      return;
    }
    try {
      let finalUpdate = {};
      if (value === "Delivered") {
        finalUpdate = {
          orderStatus: value,
          deliveryDate: new Date().toLocaleDateString(),
        };
      } else {
        finalUpdate = {
          orderStatus: value,
        };
      }
      await updateDoc(doc(db, "ordersNewItems/" + orderInfo.id), finalUpdate);
      Navigation.navigate("manageOrders");
    } catch (error) {
      console.log(error);
    }
  };

  const styles = StyleSheet.create({
    mainContainer: {
      marginTop: StatusBar.currentHeight,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    imageContainer: {
      height: "40%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    image: { height: "90%", resizeMode: "contain" },
    bannerContainer: {
      height: "42%",
      width: "100%",
      paddingHorizontal: 10,
    },
    actionsContainer: {
      width: "80%",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    },
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
    orderStatus: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image source={productImageHires} style={styles.image} />
      </View>
      <View style={styles.bannerContainer}>
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
            <>
              {!orderStatusToggle && (
                <GrayText18>Order Status - {orderInfo.orderStatus}</GrayText18>
              )}
              {orderStatusToggle && (
                <View style={styles.orderStatus}>
                  <GrayText18>Order Status - </GrayText18>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={{
                      backgroundColor: "transparent",
                    }}
                    dropDownContainerStyle={{
                      backgroundColor: "#ffffff",
                      height: 95,
                    }}
                    containerStyle={{
                      width: "60%",
                    }}
                    textStyle={{ fontFamily: "montserrat" }}
                  />
                </View>
              )}
            </>
          ) : (
            <GrayText18>Delivered on - {orderInfo.deliveryDate}</GrayText18>
          )}
          <GrayText18>Address - {orderInfo.address}</GrayText18>
          <GrayText18>Paid via Credit Card ending 9867</GrayText18>
          {orderInfo.orderStatus === "Delivered" && !storeAdmin && (
            <GrayText18>
              Replacement till {orderInfo.replacementTillDate}
            </GrayText18>
          )}
        </View>
      </View>
      {!storeAdmin && (
        <View style={styles.actionsContainer}>
          <YellowButton onPress={() => Navigation.navigate("home")}>
            Buy it again
          </YellowButton>
          <OrangeButton>Request Return / Replacement</OrangeButton>
        </View>
      )}
      {storeAdmin && (
        <View style={styles.actionsContainer}>
          {orderInfo.orderStatus !== "Delivered" && (
            <YellowButton onPress={editToggle}>
              {orderStatusToggle ? "Cancel" : "Change Order Status"}
            </YellowButton>
          )}
          {orderStatusToggle && (
            <YellowButton onPress={updateHandler}>
              Update Order Status
            </YellowButton>
          )}
        </View>
      )}
    </View>
  );
};

export default MyOrdersDetailedViewComponents;
