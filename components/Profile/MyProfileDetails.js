import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import TextBold22 from "../UI/Text/TextBold22";
import Text20 from "../UI/Text/Text20";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import YellowButton from "../UI/Buttons/YellowButton";
import TextInputGrey from "../UI/Input/TextInputGrey";

const MyProfileDetails = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const getUserDetails = async () => {
      const userId = await AsyncStorage.getItem("token");
      console.log("userId: ", userId);
      const currentUserRef = doc(db, "users", userId);
      const userDbData = await getDoc(currentUserRef);
      if (userDbData.exists()) {
        setUserDetails(userDbData.data());
        console.log("user: ", userDbData.data());
      }
    };
    getUserDetails();
  }, []);

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
    },
  });
  return (
    <View style={styles.mainContainer}>
      <View style={styles.detailsCard}>
        <View style={styles.header}>
          <TextBold22>My Profile</TextBold22>
        </View>
        <View style={styles.alignRow}>
          <Text20>Name - </Text20>
          <Text20>{userDetails?.full_name}</Text20>
        </View>
        <View style={styles.alignRow}>
          <Text20>Email - </Text20>
          <Text20>{userDetails?.email}</Text20>
        </View>
        <Text20>Address:-</Text20>
        {userDetails?.address !== undefined && (
          <Text20>{userDetails?.address}</Text20>
        )}
        {userDetails?.address === undefined ? (
          <>
            <TextInputGrey />
            <YellowButton>Add Address</YellowButton>
          </>
        ) : null}
        <YellowButton>Modify Details</YellowButton>
      </View>
    </View>
  );
};

export default MyProfileDetails;
