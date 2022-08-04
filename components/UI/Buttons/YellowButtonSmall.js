import { Pressable, StyleSheet } from "react-native";
import TextBold18 from "../Text/TextBold18";

const YellowButtonSmall = ({ onPress, children, backgroundColor }) => {
  const styles = StyleSheet.create({
    buttonTouch: {
      backgroundColor: backgroundColor ? backgroundColor : "#FEB700",
      borderWidth: 1,
      borderColor: "#FEB700",
      borderRadius: 10,
      height: "85%",
      width: "40%",
      justifyContent: "center",
      alignItems: "center",
    },
  });
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

export default YellowButtonSmall;
