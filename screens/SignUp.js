import { View } from "react-native";
import React from "react";
import SignUp from "../components/Auth/SignUp";

const SignUpScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <SignUp />
    </View>
  );
};

export default SignUpScreen;
