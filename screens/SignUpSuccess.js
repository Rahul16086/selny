import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { styles } from "../components/Auth/Login";
import TextBold18 from "../components/UI/Text/TextBold18";
import YellowButton from "../components/UI/Buttons/YellowButton";
import { useNavigation } from "@react-navigation/native";

const SignUpSuccess = () => {
  const Navigation = useNavigation();
  const signUpSuccessStyles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    textContainer: {
      width: "100%",
      height: 120,
      justifyContent: "space-evenly",
      alignItems: "center",
    },
  });
  return (
    <View style={signUpSuccessStyles.mainContainer}>
      <View style={styles.formContainer}>
        <View style={signUpSuccessStyles.textContainer}>
          <TextBold18>SignUp Success!!</TextBold18>
          <TextBold18>Please login</TextBold18>
          <YellowButton onPress={() => Navigation.navigate("login")}>
            Login
          </YellowButton>
        </View>
      </View>
    </View>
  );
};

export default SignUpSuccess;
