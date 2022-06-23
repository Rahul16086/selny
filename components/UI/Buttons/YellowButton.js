import { Pressable, Text, StyleSheet } from "react-native";
import TextBold18 from "../Text/TextBold18";

const YellowButton = ({ onPress, children }) => {
  return (
    <Pressable
      android_ripple={{ color: "#ffffff" }}
      style={styles.buttonTouch}
      onPress={onPress}
    >
      <TextBold18 style={styles.fonts}>{children}</TextBold18>
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
});

export default YellowButton;
