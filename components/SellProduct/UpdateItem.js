import { View, StyleSheet, ScrollView, StatusBar, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import TextBold18 from "../UI/Text/TextBold18";
import TextInputGrey from "../UI/Input/TextInputGrey";
import YellowButton from "../UI/Buttons/YellowButton";
import Spinner from "react-native-loading-spinner-overlay";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useSelector } from "react-redux";

const UpdateItem = () => {
  const Route = useRoute();
  const Navigation = useNavigation();
  const { item, usedItem } = Route.params;
  const [itemInfo, setItemInfo] = useState(item);
  const [loading, setLoading] = useState(false);
  const storeAdmin = useSelector((state) => state.user.storeAdmin);

  const inputChangeHandler = (input, value) => {
    setItemInfo({ ...itemInfo, [input]: value });
  };

  const updateHandler = async () => {
    try {
      setLoading(true);
      await updateDoc(
        doc(db, `${usedItem ? "itemsToSell" : "newItems"}`, itemInfo.id),
        { ...itemInfo }
      );
      Navigation.navigate("profile");
      Navigation.navigate("home");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert("Error", "DB Error occurred while updating");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      marginTop: StatusBar.currentHeight,
      padding: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      {!loading && (
        <ScrollView>
          {itemInfo?.brand && (
            <>
              <TextBold18>Brand</TextBold18>
              <TextInputGrey
                onChangeText={inputChangeHandler.bind(this, "brand")}
                value={itemInfo.brand}
              />
            </>
          )}
          <TextBold18>Item name</TextBold18>
          <TextInputGrey
            onChangeText={inputChangeHandler.bind(this, "item_name")}
            value={itemInfo.item_name}
          />
          <TextBold18>Description</TextBold18>
          <TextInputGrey
            onChangeText={inputChangeHandler.bind(this, "description")}
            value={itemInfo.description}
          />
          <TextBold18>Price</TextBold18>
          <TextInputGrey
            onChangeText={inputChangeHandler.bind(this, "price")}
            value={itemInfo.price.toString()}
          />
          {itemInfo?.quantity_left && (
            <>
              <TextBold18>Quantity Left</TextBold18>
              <TextInputGrey
                onChangeText={inputChangeHandler.bind(this, "quantity_left")}
                value={itemInfo?.quantity_left.toString()}
              />
            </>
          )}
          <YellowButton
            onPress={() =>
              Navigation.navigate(storeAdmin ? "manageStores" : "managePost")
            }
          >
            Cancel
          </YellowButton>
          <YellowButton onPress={updateHandler}>Update</YellowButton>
        </ScrollView>
      )}
    </View>
  );
};

export default UpdateItem;
