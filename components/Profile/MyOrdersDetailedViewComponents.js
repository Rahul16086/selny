import { View, StyleSheet, StatusBar, Image } from "react-native";
import React from "react";
import productImageHires from "../../assets/productImageHiRes.png";
import OrderDetailedBanner from "../UI/Banner/OrderDetailedBanner";
import YellowButton from "../UI/Buttons/YellowButton";
import OrangeButton from "../UI/Buttons/OrangeButton";
import { useNavigation, useRoute } from "@react-navigation/native";

const productInfo = {
  name: "Apple iPhone 13 Pro (128GB)",
  price: "1049.00",
  deliveryDate: "25 June 2022",
  orderDate: "24 June 2022",
  paymentInfo: "Visa Credit Card 13xx",
  replacementTillDate: "09 July 2022",
};

const MyOrdersDetailedViewComponents = () => {
  const Route = useRoute();
  const Navigation = useNavigation();
  const { orderInfo, itemInfo } = Route.params;
  console.log("orderInfo", orderInfo, "itemInfo", itemInfo);

  const styles = StyleSheet.create({
    container: {
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
      paddingHorizontal: 10,
      height: "35%",
      width: "100%",
    },
    actionsContainer: {
      width: "80%",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={productImageHires} style={styles.image} />
      </View>
      <View style={styles.bannerContainer}>
        <OrderDetailedBanner itemInfo={itemInfo} orderInfo={orderInfo} />
      </View>
      <View style={styles.actionsContainer}>
        <YellowButton onPress={() => Navigation.navigate("home")}>
          Buy it again
        </YellowButton>
        <OrangeButton>Request Return / Replacement</OrangeButton>
      </View>
    </View>
  );
};

export default MyOrdersDetailedViewComponents;
