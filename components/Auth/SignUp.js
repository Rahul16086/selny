import { View, Text, TextInput, Pressable } from "react-native";
import YellowButton from "../UI/Buttons/YellowButton";
import TextInputGrey from "../UI/Input/TextInputGrey";
import TextBold18 from "../UI/Text/TextBold18";
import { styles } from "./Login";

const SignUp = (props) => {
  return (
    <View style={styles.formContainer}>
      <TextBold18>Full Name</TextBold18>
      <TextInputGrey />
      <TextBold18>E-Mail</TextBold18>
      <TextInputGrey />
      <TextBold18>Password</TextBold18>
      <TextInputGrey secureTextEntry />
      <TextBold18>Confirm Password</TextBold18>
      <TextInputGrey secureTextEntry />
      <YellowButton>Create Account</YellowButton>
      <YellowButton onPress={props.onBack}>Back</YellowButton>
    </View>
  );
};

export default SignUp;
