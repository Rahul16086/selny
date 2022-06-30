import ProductDetails from "../components/Products/ProductDetails";
import { View, StyleSheet, StatusBar } from "react-native";

const ProductsDetailsView = () => {
  return (
    <View style={styles.container}>
      <ProductDetails />
    </View>
  );
};

export default ProductsDetailsView;

const styles = StyleSheet.create({
  container: { marginTop: StatusBar.currentHeight, flex: 1 },
});
