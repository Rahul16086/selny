import { View, Text, TextInput, Pressable } from "react-native";
import YellowButton from "../UI/Buttons/YellowButton";
import TextInputGrey from "../UI/Input/TextInputGrey";
import TextBold20 from "../UI/Text/TextBold20";
import { styles } from "./Login";

const SignUp = (props) => {
  return (
    <View style={styles.formContainer}>
      <TextBold20>Full Name</TextBold20>
      <TextInputGrey />
      <TextBold20>E-Mail</TextBold20>
      <TextInputGrey />
      <TextBold20>Password</TextBold20>
      <TextInputGrey secureTextEntry />
      <TextBold20>Confirm Password</TextBold20>
      <TextInputGrey secureTextEntry />
      <YellowButton>Create Account</YellowButton>
      <YellowButton onPress={props.onBack}>Back</YellowButton>
    </View>
  );
};

export default SignUp;
