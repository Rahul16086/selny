import { View, Text, TextInput, Pressable } from "react-native";
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
      <Pressable
        style={styles.buttonTouch}
        android_ripple={{ color: "#ffffff" }}
      >
        <Text style={styles.fonts}>Create account</Text>
      </Pressable>
      <Pressable
        style={styles.buttonTouch}
        onPress={props.onBack}
        android_ripple={{ color: "#ffffff" }}
      >
        <Text style={styles.fonts}>Back</Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
