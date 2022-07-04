import { useState } from "react";
import { View, Image, Alert } from "react-native";
import YellowButton from "../UI/Buttons/YellowButton";
import TextInputGrey from "../UI/Input/TextInputGrey";
import TextBold18 from "../UI/Text/TextBold18";
import { styles } from "./Login";
import logo from "../../assets/Logo.png";
import { useNavigation } from "@react-navigation/native";
import createUser from "../../utils/auth";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/; //looks for one uppercase letter, atleast 6 chars long, and one number

const SignUp = () => {
  const Navigation = useNavigation();
  const [signUpInputValues, setSignUpInputValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setSignUpInputValues((currentInputValue) => {
      return {
        ...currentInputValue,
        [inputIdentifier]: enteredValue,
      };
    });
  };

  const inputValidator = (signUpInputValues) => {
    if (signUpInputValues.fullName.length < 3) {
      return "Full name must be at least 3 characters long";
    }
    if (
      signUpInputValues.email.length < 3 ||
      signUpInputValues.email.indexOf("@") === -1
    ) {
      return "Please enter a valid email";
    }
    if (signUpInputValues.password !== signUpInputValues.confirmPassword) {
      return "Passwords do not match";
    }

    if (signUpInputValues.password.match(passwordRegex) === null) {
      return "Password must be at least 6 characters long and contain at least one number and one uppercase letter";
    }
    return true;
  };

  const submitHandler = async () => {
    const validate = inputValidator(signUpInputValues);
    if (validate === true) {
      // bcrypt.genSalt(10, (err, salt) => {
      //   bcrypt.hash(signUpInputValues.password, salt, (err, hash) => {
      //     console.log(hash);
      //   });
      // });
      console.log(signUpInputValues);
      const response = await createUser(
        signUpInputValues.email,
        signUpInputValues.password
      );
      console.log(response);
      if (response.idToken) {
        Navigation.navigate("homeTabs");
      }
    } else {
      Alert.alert(
        "Error Signing Up",
        validate ? validate : "Please check the details entered"
      );
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Image source={logo} />
      <View style={styles.formContainer}>
        <TextBold18>Full Name</TextBold18>
        <TextInputGrey
          onChangeText={inputChangedHandler.bind(this, "fullName")}
          value={signUpInputValues.fullName}
        />
        <TextBold18>E-Mail</TextBold18>
        <TextInputGrey
          onChangeText={inputChangedHandler.bind(this, "email")}
          value={signUpInputValues.email}
        />
        <TextBold18>Password</TextBold18>
        <TextInputGrey
          secureTextEntry
          onChangeText={inputChangedHandler.bind(this, "password")}
          value={signUpInputValues.password}
        />
        <TextBold18>Confirm Password</TextBold18>
        <TextInputGrey
          secureTextEntry
          onChangeText={inputChangedHandler.bind(this, "confirmPassword")}
          value={signUpInputValues.confirmPassword}
        />
        <YellowButton onPress={submitHandler}>Create Account</YellowButton>
        <YellowButton onPress={() => Navigation.goBack()}>
          Back to login
        </YellowButton>
      </View>
    </View>
  );
};
export default SignUp;
