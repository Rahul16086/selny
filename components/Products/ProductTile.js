import { Text, View, StyleSheet } from "react-native";

const ProductTile = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};

export default ProductTile;

const styles = StyleSheet.create({
  container: {
    elevation: 10,
    backgroundColor: "white",
    width: "45%",
    height: "50%",
    borderRadius: 10,
    marginVertical: 5,
  },
});
