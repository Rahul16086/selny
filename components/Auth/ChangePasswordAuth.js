import { View, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { styles } from "./Login";
import TextBold18 from "../UI/Text/TextBold18";
import TextInputGrey from "../UI/Input/TextInputGrey";
import YellowButton from "../UI/Buttons/YellowButton";
import { auth } from "../../config/firebase";
import { updatePassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const ChangePasswordAuth = () => {
  const [input, setInput] = useState({ password: "", confirmPassword: "" });
  const Navigation = useNavigation();
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/; //looks for one uppercase letter, atleast 6 chars long, and one number

  const inputChangeHandler = (inputIdentifier, inputValue) => {
    setInput((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: inputValue,
      };
    });
  };

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

  const changePasswordHandler = async () => {
    console.log("input", input);
    if (
      input.password.length !== input.confirmPassword.length ||
      input.password !== input.confirmPassword
    ) {
      Alert.alert("Password mismatch", "Please check the password");
      return;
    } else if (input.password.match(passwordRegex) === null) {
      Alert.alert(
        "Password Error",
        "Password must be at least 6 characters long and contain at least one number and one uppercase letter"
      );
      return;
    }
    try {
      const user = auth.currentUser;
      await updatePassword(user, input.password);
      Alert.alert("Password changed", "Password changed successfully");
      Navigation.navigate("myProfile");
    } catch (error) {
      Alert.alert("Password change failed", error.message);
    }
  };

  return (
    <View style={style.container}>
      <View style={styles.formContainer}>
        <View style={style.titleContainer}>
          <TextBold18>Change Password</TextBold18>
        </View>
        <TextBold18>New Password</TextBold18>
        <TextInputGrey
          secureTextEntry={true}
          onChangeText={inputChangeHandler.bind(this, "password")}
        />
        <TextBold18>Confirm Password</TextBold18>
        <TextInputGrey
          secureTextEntry={true}
          onChangeText={inputChangeHandler.bind(this, "confirmPassword")}
        />
        <YellowButton onPress={changePasswordHandler}>Submit</YellowButton>
      </View>
    </View>
  );
};

export default ChangePasswordAuth;
