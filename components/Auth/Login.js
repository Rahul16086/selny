import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import logo from "../../assets/Logo.png";
import googleLogo from "../../assets/Google.png";
import SignUp from "./SignUp";
import { useState } from "react";

const Login = () => {
  const toggleSignUp = () => {
    setSignUpClicked(() => !signUpClicked);
  };
  const [signUpClicked, setSignUpClicked] = useState(false);
  return (
    <View style={styles.mainContainer}>
      <Image source={logo} />
      {signUpClicked && <SignUp onBack={toggleSignUp} />}
      {!signUpClicked && (
        <View style={styles.formContainer}>
          <Text style={styles.fonts}>Username/E-Mail</Text>
          <TextInput style={styles.textInput}></TextInput>
          <Text style={styles.fonts}>Password</Text>
          <TextInput style={styles.textInput} secureTextEntry></TextInput>
          <Pressable
            android_ripple={{ color: "#ffffff" }}
            style={styles.buttonTouch}
          >
            <Text style={styles.fonts}>Login</Text>
          </Pressable>
          <Pressable
            style={styles.forgotPassword}
            android_ripple={{ color: "#ffffff" }}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </Pressable>
        </View>
      )}
      {!signUpClicked && (
        <View style={styles.otherSignInOptions}>
          <Text style={styles.fonts}>Sign-In Using</Text>
          <Pressable android_ripple={{ color: "#ffffff" }}>
            <Image source={googleLogo} />
          </Pressable>
          <Pressable
            style={styles.buttonTouch}
            onPress={toggleSignUp}
            android_ripple={{ color: "#ffffff" }}
          >
            <Text style={styles.fonts}>Create Account</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  fonts: {
    fontSize: 20,
    textTransform: "uppercase",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
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
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#6D6D6D",
    paddingHorizontal: 8,
    height: 50,
    width: "100%",
    marginTop: 5,
    marginBottom: 10,
    fontSize: 18,
  },
  buttonTouch: {
    width: "100%",
    backgroundColor: "#FEB700",
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "center",
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#0066C4",
    letterSpacing: 0.5,
  },
  otherSignInOptions: {
    width: "90%",
    alignItems: "center",
    height: 130,
    justifyContent: "space-between",
  },
});

export default Login;
