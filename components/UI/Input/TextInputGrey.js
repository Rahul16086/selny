import { TextInput, StyleSheet } from "react-native";

const TextInputGrey = ({
  secureTextEntry,
  children,
  onChangeText,
  value,
  style,
}) => {
  return (
    <TextInput
      style={style ? style : styles.textInput}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      value={value}
    >
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
    height: 40,
    width: "100%",
    marginTop: 5,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "montserrat",
  },
});

export default TextInputGrey;
