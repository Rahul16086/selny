import { Text, StyleSheet } from "react-native";

const TextBold18 = ({ onPress, uppercase, children }) => {
  const styles = StyleSheet.create({
    fonts: {
      fontSize: 18,
      textTransform: uppercase ? "uppercase" : null,
      fontFamily: "montserratSemiBold",
    },
  });
  return (
    <Text style={styles.fonts} onPress={onPress}>
      {children}
    </Text>
  );
};

export default TextBold18;
