import { Text, StyleSheet } from "react-native";

const TextBold18 = ({ onPress, children }) => {
  return (
    <Text style={styles.fonts} onPress={onPress}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  fonts: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default TextBold18;
