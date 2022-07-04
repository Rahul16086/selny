import { useState } from "react";
import { View, Image } from "react-native";
import YellowButton from "../UI/Buttons/YellowButton";
import TextInputGrey from "../UI/Input/TextInputGrey";
import TextBold18 from "../UI/Text/TextBold18";
import { styles } from "./Login";
import logo from "../../assets/Logo.png";
import { useNavigation } from "@react-navigation/native";

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
  const submitHandler = () => {
    if (signUpInputValues.fullName.length > 3) {
      console.log(signUpInputValues);
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
