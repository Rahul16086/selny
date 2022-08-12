import { View, Image, StyleSheet, Pressable, Alert } from "react-native";
import logo from "../../assets/Logo.png";
import googleLogo from "../../assets/Google.png";
import YellowButton from "../UI/Buttons/YellowButton";
import TransparentButton from "../UI/Buttons/TransparentButton";
import TextBold18 from "../UI/Text/TextBold18";
import TextInputGrey from "../UI/Input/TextInputGrey";
import { useNavigation } from "@react-navigation/native";
import { useState, React } from "react";
import { useDispatch } from "react-redux";
import { setAuthLogin } from "../../store/redux/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

const Login = () => {
  const navigation = useNavigation();
  const [loginInputValues, setLoginInputValues] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

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
        const user = await signInWithEmailAndPassword(
          auth,
          loginInputValues.email,
          loginInputValues.password
        );

        if (user) {
          const userId = user.user.uid;
          if (!user.user.emailVerified) {
            Alert.alert(
              "Email not verified",
              "Please verify your email before logging in"
            );
            return;
          }
          const currentUserRef = doc(db, "users", userId);
          const userDbData = await getDoc(currentUserRef);
          if (userDbData.exists()) {
            if (userDbData.data().storeAdmin) {
              AsyncStorage.setItem("storeAdmin", "true");
            } else {
              AsyncStorage.setItem("storeAdmin", "false");
            }
          }
          console.log("So: ", userDbData.data().storeAdmin);
          dispatch(
            setAuthLogin({
              isAuthenticated: true,
              token: user.user.uid,
              storeAdmin: userDbData.data().storeAdmin,
            })
          );
          console.log("User: ", user.user.uid);
          AsyncStorage.setItem("token", user.user.uid);
        }
      } catch (error) {
        Alert.alert("Login failed", error.message);
      }
    } else {
      Alert.alert(
        "Error logging in",
        validate || "Please check the details entered"
      );
    }
  };

  const googleLoginHandler = () => {
    console.log("Pressed");
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
        <YellowButton onPress={submitHandler} testID={"loginButton"}>
          Login
        </YellowButton>
        <TransparentButton onPress={() => navigation.navigate("resetPassword")}>
          Forgot Password?
        </TransparentButton>
      </View>

      <View style={styles.otherSignInOptions}>
        <TextBold18>Sign-In Using</TextBold18>
        <Pressable
          android_ripple={{ color: "#6d6d6d" }}
          onPress={googleLoginHandler}
        >
          <Image source={googleLogo} />
        </Pressable>
        <YellowButton
          onPress={() => navigation.navigate("signUp", { storeAdmin: false })}
          testID={"signUpButton"}
        >
          Create Account
        </YellowButton>
        <YellowButton
          onPress={() => navigation.navigate("signUp", { storeAdmin: true })}
        >
          Register as Seller
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
    // ios
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
    height: 180,
    justifyContent: "space-evenly",
  },
});

export default Login;
