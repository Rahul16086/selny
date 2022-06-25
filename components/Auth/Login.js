import { View, Image, StyleSheet, Pressable } from "react-native";
import logo from "../../assets/Logo.png";
import googleLogo from "../../assets/Google.png";
import SignUp from "./SignUp";
import { useState } from "react";
import YellowButton from "../UI/Buttons/YellowButton";
import TransparentButton from "../UI/Buttons/TransparentButton";
import TextBold18 from "../UI/Text/TextBold18";
import TextInputGrey from "../UI/Input/TextInputGrey";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  const toggleSignUp = () => {
    setSignUpClicked(() => !signUpClicked);
  };
  const [signUpClicked, setSignUpClicked] = useState(false);
  return (
    <View style={styles.mainContainer}>
      <Image source={logo} />
      {signUpClicked && (
        <SignUp onBack={toggleSignUp} navigation={navigation} />
      )}
      {!signUpClicked && (
        <View style={styles.formContainer}>
          <TextBold18>Username/E-Mail</TextBold18>
          <TextInputGrey />
          <TextBold18>Password</TextBold18>
          <TextInputGrey secureTextEntry />
          <YellowButton
            onPress={() => {
              navigation.navigate("home");
            }}
          >
            Login
          </YellowButton>
          <TransparentButton>Forgot Password?</TransparentButton>
        </View>
      )}
      {!signUpClicked && (
        <View style={styles.otherSignInOptions}>
          <TextBold18>Sign-In Using</TextBold18>
          <Pressable android_ripple={{ color: "#ffffff" }}>
            <Image source={googleLogo} />
          </Pressable>
          <YellowButton onPress={toggleSignUp}>Create Account</YellowButton>
        </View>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
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
  otherSignInOptions: {
    width: "90%",
    alignItems: "center",
    height: 130,
    justifyContent: "space-between",
  },
});

export default Login;
