import { Text, StyleSheet } from "react-native";

const Text12 = ({ onPress, children }) => {
  return (
    <Text style={styles.fonts} onPress={onPress}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  fonts: {
    fontSize: 16,
    letterSpacing: 0.5,
    fontFamily: "montserrat",
  },
});

export default Text12;
