import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./Login";

const SignUp = (props) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.fonts}>Full Name</Text>
      <TextInput style={styles.textInput}></TextInput>
      <Text style={styles.fonts}>E-Mail</Text>
      <TextInput style={styles.textInput}></TextInput>
      <Text style={styles.fonts}>Password</Text>
      <TextInput style={styles.textInput}></TextInput>
      <Text style={styles.fonts}>Confirm Password</Text>
      <TextInput style={styles.textInput}></TextInput>
      <TouchableOpacity style={styles.buttonTouch}>
        <Text style={styles.fonts}>Create account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonTouch} onPress={props.onBack}>
        <Text style={styles.fonts}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
