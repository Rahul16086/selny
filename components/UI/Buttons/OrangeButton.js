import { Pressable, StyleSheet } from "react-native";
import TextBold18 from "../Text/TextBold18";

const OrangeButton = ({ width, onPress, uppercase, children, disabled }) => {
  const styles = StyleSheet.create({
    buttonTouch: {
      width: width ? width : "100%",
      backgroundColor: "#FF6B00",
      borderRadius: 10,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
    },
  });
  return (
    <Pressable
      android_ripple={{ color: "#ffffff" }}
      style={styles.buttonTouch}
      onPress={onPress}
      disabled={disabled}
    >
      <TextBold18 uppercase={uppercase}>{children}</TextBold18>
    </Pressable>
  );
};

export default OrangeButton;
