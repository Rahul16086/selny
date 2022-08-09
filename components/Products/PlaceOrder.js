import { View, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import TextBold18 from "../UI/Text/TextBold18";
import TextInputGrey from "../UI/Input/TextInputGrey";
import { styles } from "../Auth/Login";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import "react-native-get-random-values";
import { v4 } from "uuid";
import Text20 from "../UI/Text/Text20";
import TextBold22 from "../UI/Text/TextBold22";
import YellowButton from "../UI/Buttons/YellowButton";
import OrangeButton from "../UI/Buttons/OrangeButton";

const PlaceOrder = () => {
  const Route = useRoute();
  const Navigation = useNavigation();
  const { itemId, itemName, itemQuantity, itemPrice } = Route.params;

  const [userDetails, setUserDetails] = useState({});
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const isFocused = useIsFocused();
  const [quantity, setQuantity] = useState(0);

  const style = StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    itemName: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "center",
      marginBottom: 10,
    },
    actions: {
      flexDirection: "row",
      width: "100%",
      marginTop: 10,
      justifyContent: "space-between",
      alignItems: "center",
    },
    priceContainer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-evenly",
      marginTop: 10,
    },
  });

  useEffect(() => {
    const getAddress = async () => {
      try {
        const userId = auth.currentUser.uid;
        const data = await getDoc(doc(db, "users/" + userId));
        if (data) {
          console.log("user details", data.data());
          setUserDetails({ ...data.data(), id: data.id });
          setItems([
            {
              label: data.data().address,
              value: data.data().address,
              key: v4(),
            },
          ]);
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Something went wrong while gathering user data");
      }
    };
    getAddress();
  }, [isFocused]);

  const validateInput = () => {
    if (quantity === 0 || quantity < 0 || quantity > itemQuantity) {
      Alert.alert("Error", "Please enter a valid quantity");
      return false;
    }
    if (!value) {
      Alert.alert("Error", "Please select an address");
      return false;
    }
  };

  const submitHandler = () => {
    if (validateInput()) {
      console.log("Submit");
    }
  };

  return (
    <View style={style.mainContainer}>
      <TextBold22>Please Confirm Order</TextBold22>
      <View style={styles.formContainer}>
        <View style={style.itemName}>
          <Text20>{itemName}</Text20>
        </View>
        <TextBold18>Quantity</TextBold18>
        <TextInputGrey onChangeText={setQuantity} keyboardType={"numeric"} />
        <TextBold18>Select Address</TextBold18>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{
            backgroundColor: "transparent",
            borderColor: "#6D6D6D",
          }}
          textStyle={{ fontFamily: "montserrat" }}
        />
        <View style={style.priceContainer}>
          <TextBold22>Price</TextBold22>
          <TextBold22>£ {+itemPrice * quantity}</TextBold22>
        </View>
        <View style={style.actions}>
          <YellowButton
            width={"45%"}
            onPress={() => {
              Navigation.goBack();
            }}
          >
            Cancel
          </YellowButton>
          <OrangeButton width={"45%"} onPress={submitHandler}>
            Place Order
          </OrangeButton>
        </View>
      </View>
    </View>
  );
};

export default PlaceOrder;
