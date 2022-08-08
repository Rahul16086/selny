import { View, StyleSheet, Alert } from "react-native";
import React from "react";
import { styles } from "./Login";
import TextBold18 from "../UI/Text/TextBold18";
import TextInputGrey from "../UI/Input/TextInputGrey";
import YellowButton from "../UI/Buttons/YellowButton";
import { useState } from "react";
import { auth } from "../../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const Navigation = useNavigation();

  const style = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    titleContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    },
  });

  const resetPasswordHandler = async () => {
    if (email.length < 3) {
      Alert.alert("EMail cannot be empty", "Please enter a valid email");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Password Reset", "Password reset email sent");
      Navigation.navigate("login");
    } catch (error) {
      console.log("error: ", error);
      Alert.alert(
        "Error occured",
        "Something went wrong, Password reset failed"
      );
    }
  };

  return (
    <View style={style.container}>
      <View style={styles.formContainer}>
        <View style={style.titleContainer}>
          <TextBold18>Forgot Password</TextBold18>
        </View>
        <TextBold18>Enter E-Mail</TextBold18>
        <TextInputGrey onChangeText={setEmail} />
        <YellowButton onPress={resetPasswordHandler}>Submit</YellowButton>
      </View>
    </View>
  );
};

export default ForgotPassword;
