import { StyleSheet, Pressable, Text } from "react-native";

const RedShadowButton = ({ icon, text, onPress }) => {
  const styles = StyleSheet.create({
    RedShadowButton: {
      width: "90%",
      backgroundColor: "#ffffff",
      borderRadius: 5,
      paddingHorizontal: 16,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      height: 55,
      elevation: 8,
      marginBottom: 1,
      borderColor: "red",
      borderWidth: 0.8,
    },
    RedShadowButtonText: {
      fontSize: 20,
      fontFamily: "montserratMedium",
      color: "red",
    },
  });
  return (
    <Pressable
      android_ripple={{ color: "#6d6d6d" }}
      style={styles.RedShadowButton}
      onPress={onPress}
    >
      <Text style={styles.RedShadowButtonText}>{text}</Text>
    </Pressable>
  );
};

export default RedShadowButton;
