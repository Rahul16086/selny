import { View, Image, StyleSheet, Pressable, Alert } from "react-native";
import logo from "../../assets/Logo.png";
import googleLogo from "../../assets/Google.png";
import YellowButton from "../UI/Buttons/YellowButton";
import TransparentButton from "../UI/Buttons/TransparentButton";
import TextBold18 from "../UI/Text/TextBold18";
import TextInputGrey from "../UI/Input/TextInputGrey";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { loginUser } from "../../utils/auth";

const Login = () => {
  const navigation = useNavigation();
  const [loginInputValues, setLoginInputValues] = useState({
    email: "",
    password: "",
  });

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setLoginInputValues((currentInputValue) => {
      return {
        ...currentInputValue,
        [inputIdentifier]: enteredValue,
      };
    });
  };

  const inputValidator = (loginInputValues) => {
    if (
      loginInputValues.email.length < 3 ||
      loginInputValues.email.indexOf("@") === -1
    ) {
      return "Email is invalid";
    }
    if (loginInputValues.password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return true;
  };

  const submitHandler = async () => {
    const validate = inputValidator(loginInputValues);
    if (validate === true) {
      try {
        const user = await loginUser(
          loginInputValues.email,
          loginInputValues.password
        );
        if (user.error) {
          throw new Error(user.error.message);
        }
      } catch (error) {
        Alert.alert("Login failed", error.message);
      }
    } else {
      Alert.alert(
        "Error logging in",
        validate ? validate : "Please check the details entered"
      );
    }
  };
  return (
    <View style={styles.mainContainer}>
      <Image source={logo} />
      <View style={styles.formContainer}>
        <TextBold18>E-Mail</TextBold18>
        <TextInputGrey onChangeText={inputChangedHandler.bind(this, "email")} />
        <TextBold18>Password</TextBold18>
        <TextInputGrey
          secureTextEntry
          onChangeText={inputChangedHandler.bind(this, "password")}
        />
        <YellowButton onPress={submitHandler}>Login</YellowButton>
        <TransparentButton>Forgot Password?</TransparentButton>
      </View>

      <View style={styles.otherSignInOptions}>
        <TextBold18>Sign-In Using</TextBold18>
        <Pressable android_ripple={{ color: "#6d6d6d" }}>
          <Image source={googleLogo} />
        </Pressable>
        <YellowButton onPress={() => navigation.navigate("signUp")}>
          Create Account
        </YellowButton>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    height: "80%",
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
