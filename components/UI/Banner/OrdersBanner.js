import { View, StyleSheet, Pressable, Image, Text } from "react-native";
import React from "react";
import productImage from "../../../assets/productImage4.png";
import goArrow from "../../../assets/icons/GoArrow.png";
import TextBold18 from "../Text/TextBold18";
import { useNavigation } from "@react-navigation/native";

const OrdersBanner = ({
  productName = "Apple iPhone 13 Pro (128GB)",
  deliveryDate = "25 June 2022",
}) => {
  const Navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      height: 100,
      marginBottom: 10,
      borderRadius: 5,
      width: "95%",
      elevation: 8,
      flexDirection: "row",
      paddingHorizontal: 5,
    },
    imageContainer: {
      width: "30%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      height: "90%",
      resizeMode: "contain",
    },
    productInfoContainer: {
      width: "60%",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 5,
    },
    deliveredText: {
      fontFamily: "montserrat",
    },
    goArrowContainer: {
      width: "10%",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return (
    <Pressable
      style={styles.container}
      android_ripple={{ color: "#6d6d6d" }}
      onPress={() => Navigation.navigate("myOrdersDetailedView")}
    >
      <View style={styles.imageContainer}>
        <Image source={productImage} style={styles.image} />
      </View>
      <View style={styles.productInfoContainer}>
        <TextBold18>{productName}</TextBold18>
        <Text style={styles.deliveredText}>Delivered on {deliveryDate}</Text>
      </View>
      <View style={styles.goArrowContainer}>
        <Image source={goArrow} />
      </View>
    </Pressable>
  );
};

export default OrdersBanner;
