import { Text, StyleSheet, Pressable, Image } from "react-native";
import logo from "../../assets/Logo.png";
const ProductTile = ({ item }) => {
  return (
    <Pressable style={styles.container} android_ripple={{ color: "6d6d6d" }}>
      <Image source={logo} style={styles.image} />
      <Text>{item.key}</Text>
    </Pressable>
  );
};

export default ProductTile;

const styles = StyleSheet.create({
  container: {
    elevation: 10,
    backgroundColor: "white",
    width: 170,
    height: 220,
    borderRadius: 10,
    margin: 5,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "75%",
  },
});
