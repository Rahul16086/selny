import { Pressable, Text, StyleSheet } from "react-native";

const YellowButton = ({ onPress, children }) => {
  return (
    <Pressable
      android_ripple={{ color: "#ffffff" }}
      style={styles.buttonTouch}
      onPress={onPress}
    >
      <Text style={styles.fonts}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonTouch: {
    width: "100%",
    backgroundColor: "#FEB700",
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  fonts: {
    fontSize: 20,
    textTransform: "uppercase",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default YellowButton;
