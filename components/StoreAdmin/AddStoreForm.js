import { View, StyleSheet, StatusBar, Alert } from "react-native";
import React, { useState } from "react";
import TextBold18 from "../UI/Text/TextBold18";
import TextInputGrey from "../UI/Input/TextInputGrey";
import YellowButton from "../UI/Buttons/YellowButton";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import "react-native-get-random-values";
import { v4 } from "uuid";
import Spinner from "react-native-loading-spinner-overlay";

const AddStoreForm = () => {
  const [inputValues, setInputValues] = useState({ name: "", category: "" });
  const Navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const inputChangeHandler = (inputIdentifier, inputValue) => {
    setInputValues({ ...inputValues, [inputIdentifier]: inputValue });
  };

  const submitHandler = async () => {
    setLoading(true);
    if (inputValues.name.length === 0) {
      Alert.alert("Invalid details", "Store name is required");
      return;
    } else if (inputValues.category.length === 0) {
      Alert.alert("Invalid details", "Store category is required");
      return;
    }
    try {
      const userId = auth.currentUser.uid;
      if (userId) {
        await setDoc(doc(db, "users/" + userId + "/stores", v4()), {
          ...inputValues,
        });
        Navigation.navigate("manageStores");
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    formContainer: {
      borderRadius: 10,
      paddingVertical: 20,
      paddingHorizontal: 15,
      width: "100%",
      marginVertical: 10,
      elevation: 10,
      backgroundColor: "white",
      //ios
      shadowColor: "#171717",
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      justifyContent: "center",
      alignItems: "flex-start",
    },
  });
  return (
    <>
      <Spinner visible={loading} />
      {!loading && (
        <View style={styles.mainContainer}>
          <TextBold18>Add Store</TextBold18>
          <View style={styles.formContainer}>
            <TextBold18>Name</TextBold18>
            <TextInputGrey
              onChangeText={inputChangeHandler.bind(this, "name")}
            />
            <TextBold18>Category</TextBold18>
            <TextInputGrey
              onChangeText={inputChangeHandler.bind(this, "category")}
            />
            <YellowButton onPress={submitHandler}>Submit</YellowButton>
          </View>
        </View>
      )}
    </>
  );
};

export default AddStoreForm;
