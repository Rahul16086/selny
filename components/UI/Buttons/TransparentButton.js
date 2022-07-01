import { Pressable, Text, StyleSheet } from "react-native";

const TransparentButton = ({ onPress, children }) => {
  return (
    <Pressable
      style={styles.forgotPassword}
      android_ripple={{ color: "#ffffff" }}
      onPress={onPress}
    >
      <Text style={styles.forgotPasswordText}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "center",
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#0066C4",
    letterSpacing: 0.5,
    fontFamily: "montserrat",
  },
});

export default TransparentButton;
