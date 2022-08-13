import { View, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import TextBold22 from "../UI/Text/TextBold22";
import Text20 from "../UI/Text/Text20";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import YellowButton from "../UI/Buttons/YellowButton";
import TextInputGrey from "../UI/Input/TextInputGrey";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const MyProfileDetails = () => {
  const [userDetails, setUserDetails] = useState({
    full_name: "",
    email: "",
    address: "",
  });
  const [addressInputValues, setAddressInputValues] = useState(
    userDetails?.address
  );
  const [modifyInputValues, setModifyInputValues] = useState({
    full_name: "",
    address: "",
  });
  const [updated, setUpdated] = useState(false);
  const [modifyMode, setModifyMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const Navigation = useNavigation();

  useEffect(() => {
    const getUserDetails = async () => {
      setLoading(true);
      const userId = await AsyncStorage.getItem("token");
      console.log("userId: ", userId);
      const currentUserRef = doc(db, "users", userId);
      const userDbData = await getDoc(currentUserRef);
      if (userDbData.exists()) {
        setUserDetails({ address: "", ...userDbData.data() });
        setLoading(false);
      }
    };
    getUserDetails();
  }, [updated]);

  const addAddressHandler = async () => {
    try {
      if (addressInputValues.length < 5) {
        Alert.alert("Invalid Address", "Please enter a valid address");
      } else {
        const userId = await AsyncStorage.getItem("token");
        const currentUserRef = doc(db, "users", userId);
        await updateDoc(currentUserRef, {
          address: addressInputValues,
        });
        setUpdated((prev) => !prev);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong " + error?.message);
    }
  };

  const modifyModeToggle = () => {
    setModifyInputValues({
      full_name: userDetails.full_name,
      address: userDetails.address,
    });
    setModifyMode((prev) => !prev);
  };

  const modifyChangedHandler = (inputIdentifier, enteredValue) => {
    setModifyInputValues((currentInputValue) => {
      return {
        ...currentInputValue,
        [inputIdentifier]: enteredValue,
      };
    });
  };

  const modifySubmitHandler = async () => {
    try {
      if (
        modifyInputValues.full_name.length < 3 ||
        modifyInputValues.address.length < 5
      ) {
        Alert.alert("Invalid Details", "Please check the details entered");
      } else {
        const userId = auth.currentUser.uid;
        const currentUserRef = doc(db, "users", userId);
        await updateDoc(currentUserRef, {
          full_name: modifyInputValues.full_name,
          address: modifyInputValues.address,
        });
        setUpdated((prev) => !prev);
        setModifyMode(false);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Something went wrong while updating the details. Please try again"
      );
    }
  };

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    detailsCard: {
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
    header: {
      width: "100%",
      alignItems: "center",
    },
    alignRow: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      marginVertical: 5,
      overflow: "hidden",
    },
    nameTextInput: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#6D6D6D",
      paddingHorizontal: 8,
      height: 40,
      width: "75%",
      fontSize: 18,
      fontFamily: "montserrat",
    },
    actions: {
      width: "100%",
      marginTop: 10,
    },
  });
  return (
    <View style={styles.mainContainer}>
      <Spinner visible={loading} />
      {!loading && (
        <>
          <View style={styles.detailsCard}>
            <View style={styles.header}>
              <TextBold22>My Profile</TextBold22>
            </View>
            <View style={styles.alignRow}>
              <Text20>Name - </Text20>
              {!modifyMode && <Text20>{userDetails?.full_name}</Text20>}
              {modifyMode && (
                <TextInputGrey
                  value={modifyInputValues.full_name}
                  onChangeText={modifyChangedHandler.bind(this, "full_name")}
                  style={styles.nameTextInput}
                />
              )}
            </View>
            <View style={styles.alignRow}>
              <Text20>Email - </Text20>
              <Text20>{userDetails?.email}</Text20>
            </View>
            <Text20>Address:-</Text20>
            {userDetails?.address.length > 1 && !modifyMode && (
              <Text20>{userDetails?.address}</Text20>
            )}
            {modifyMode && userDetails?.address.length > 1 && (
              <TextInputGrey
                value={modifyInputValues.address}
                onChangeText={modifyChangedHandler.bind(this, "address")}
              />
            )}
            {userDetails?.address.length < 1 && !modifyMode ? (
              <>
                <TextInputGrey
                  onChangeText={(text) => setAddressInputValues(text)}
                />
                <YellowButton onPress={addAddressHandler}>
                  Add Address
                </YellowButton>
              </>
            ) : null}
            {userDetails.storeProof && <Text20>Store Proof - Yes</Text20>}
            <View style={styles.actions}>
              <YellowButton onPress={modifyModeToggle}>
                {modifyMode ? "Cancel" : "Modify Details"}
              </YellowButton>
              {modifyMode && (
                <YellowButton onPress={modifySubmitHandler}>
                  Update Details
                </YellowButton>
              )}
              {!modifyMode && (
                <YellowButton
                  onPress={() => Navigation.navigate("changePassword")}
                >
                  Change Password
                </YellowButton>
              )}
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default MyProfileDetails;
