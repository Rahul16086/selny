import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React from "react";
import TextBold18 from "../Text/TextBold18";
import goArrow from "../../../assets/icons/GoArrow.png";
import Text12 from "../Text/Text12";
import Text20 from "../Text/Text20";

const ItemBanner = ({ item }) => {
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
      width: "100%",
      borderWidth: 5,
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
    <Pressable style={styles.container} android_ripple={{ color: "#6d6d6d" }}>
      {item.imageLinks && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: item?.imageLinks[0] }} style={styles.image} />
        </View>
      )}
      <View style={styles.productInfoContainer}>
        {item?.item_name && <TextBold18>{item?.item_name}</TextBold18>}
        {item?.name && <TextBold18>{item.name}</TextBold18>}
        {item?.category && <Text20>{item.category}</Text20>}
        {item?.status && <Text12>Status - {item?.status}</Text12>}
        {item?.datePosted && (
          <Text style={styles.deliveredText}>
            Posted on {item?.datePosted?.toString()}
          </Text>
        )}
      </View>
      <View style={styles.goArrowContainer}>
        <Image source={goArrow} />
      </View>
    </Pressable>
  );
};

export default ItemBanner;
