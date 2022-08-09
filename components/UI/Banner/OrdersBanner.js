import { View, StyleSheet, Pressable, Image, Text } from "react-native";
import React, { useEffect, useState } from "react";
import goArrow from "../../../assets/icons/GoArrow.png";
import TextBold18 from "../Text/TextBold18";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

const OrdersBanner = ({ data }) => {
  const Navigation = useNavigation();
  const [currentData, setCurrentData] = useState(null);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      height: 100,
      borderRadius: 5,
      width: "95%",
      elevation: 8,
      flexDirection: "row",
      paddingHorizontal: 5,
      marginBottom: 10,
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
      width: "90%",
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

  useEffect(() => {
    const getItemDetails = async () => {
      try {
        const itemData = await getDoc(doc(db, "newItems/" + data.itemId));
        setCurrentData({ ...itemData.data(), id: itemData.id });
        console.log("current data", itemData.data());
      } catch (error) {}
    };
    getItemDetails();
  }, []);

  return (
    <>
      {currentData && (
        <Pressable
          style={styles.container}
          android_ripple={{ color: "#6d6d6d" }}
          onPress={() =>
            Navigation.navigate("myOrdersDetailedView", {
              itemInfo: currentData,
              orderInfo: data,
            })
          }
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: currentData.imageLinks[0] }}
              style={styles.image}
            />
          </View>
          <View style={styles.productInfoContainer}>
            <TextBold18>
              {currentData.brand
                ? currentData.brand + " " + currentData.item_name
                : currentData.item_name}
            </TextBold18>
            <Text style={styles.deliveredText}>
              Status - {data.orderStatus}
            </Text>
          </View>
          <View style={styles.goArrowContainer}>
            <Image source={goArrow} />
          </View>
        </Pressable>
      )}
    </>
  );
};

export default OrdersBanner;
