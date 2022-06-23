import { TextInput, StyleSheet } from "react-native";

const TextInputGrey = ({ secureTextEntry, children }) => {
  return (
    <TextInput style={styles.textInput} secureTextEntry={secureTextEntry}>
      {children}
    </TextInput>
  );
};

const styles = StyleSheet.create({
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
});

export default TextInputGrey;
