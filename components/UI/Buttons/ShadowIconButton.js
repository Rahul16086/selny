import { StyleSheet, Pressable, Image, Text } from "react-native";
import goArrow from "../../../assets/icons/GoArrow.png";

const ShadowIconButton = ({ icon, text, onPress }) => {
  const styles = StyleSheet.create({
    shadowIconButton: {
      width: "90%",
      backgroundColor: "#ffffff",
      borderRadius: 5,
      paddingHorizontal: 16,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      height: 55,
      elevation: 8,
      marginBottom: 1,
    },
    shadowIconButtonText: {
      fontSize: 20,
      fontFamily: "montserratMedium",
    },
  });
  return (
    <Pressable
      android_ripple={{ color: "#6d6d6d" }}
      style={styles.shadowIconButton}
      onPress={onPress}
    >
      <Image source={icon} />
      <Text style={styles.shadowIconButtonText}>{text}</Text>
      <Image source={goArrow} />
    </Pressable>
  );
};

export default ShadowIconButton;
