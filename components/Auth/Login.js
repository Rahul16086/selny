import { View, Image, StyleSheet, Pressable, Alert } from "react-native";
import logo from "../../assets/Logo.png";
import googleLogo from "../../assets/Google.png";
import YellowButton from "../UI/Buttons/YellowButton";
import TransparentButton from "../UI/Buttons/TransparentButton";
import TextBold18 from "../UI/Text/TextBold18";
import TextInputGrey from "../UI/Input/TextInputGrey";
import { useNavigation } from "@react-navigation/native";
import { useState, React, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthLogin } from "../../store/redux/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const navigation = useNavigation();
  const [loginInputValues, setLoginInputValues] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const [accessToken, setAccessToken] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "148515178432-t68nfq2f1p5gpgc38f582bf3ng8eb5gk.apps.googleusercontent.com",
  });

  useEffect(() => {
    const googleSignInHandler = async () => {
      if (response?.type === "success") {
        const { access_token } = response.params;
        const credential = GoogleAuthProvider.credential(null, access_token);
        try {
          const user = await signInWithCredential(auth, credential);
          const userId = user.user.uid;
          const currentUserRef = doc(db, "users", userId);
          const userDbData = await getDoc(currentUserRef);
          if (userDbData.exists()) {
            dispatch(
              setAuthLogin({
                isAuthenticated: true,
                token: user.user.uid,
                storeAdmin: userDbData.data().storeAdmin,
              })
            );
            AsyncStorage.setItem("token", user.user.uid);
          } else {
            await setDoc(doc(db, "users", user.user.uid), {
              email: user.user.email,
              name: user.user.displayName,
              storeAdmin: false,
            });
            dispatch(
              setAuthLogin({
                isAuthenticated: true,
                token: user.user.uid,
                storeAdmin: false,
              })
            );
            AsyncStorage.setItem("token", user.user.uid);
          }
          setAccessToken(response.authentication.accessToken);
        } catch (error) {
          console.log(error);
          Alert.alert("Error", error.message);
        }
      }
    };
    googleSignInHandler();
  }, [response]);

  const getUserData = async () => {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    let userData = await userInfoResponse.json();
  };

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
          dispatch(
            setAuthLogin({
              isAuthenticated: true,
              token: user.user.uid,
              storeAdmin: userDbData.data().storeAdmin,
            })
          );
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
    if (accessToken) {
      getUserData();
    } else {
      promptAsync({ showInRecents: true });
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
