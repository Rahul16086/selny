import { Text, View, StyleSheet, Image } from "react-native";
import productImageHiRes from "../../assets/productImageHiRes.png";
import OrangeButton from "../UI/Buttons/OrangeButton";
import YellowButton from "../UI/Buttons/YellowButton";

const ProductDetails = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={productImageHiRes} style={styles.image} />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productBrand}>Apple</Text>
        <Text style={styles.productName}>iPhone 13 Pro (256GB) - Graphite</Text>
        <Text style={styles.productRating}>⭐⭐⭐⭐ 4.5 (750)</Text>
        <View style={styles.productPrice}>
          <Text style={styles.productPricePound}>£</Text>
          <Text style={styles.productPriceNumber}>1149.00</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <YellowButton width={"90%"}>Add to cart</YellowButton>
        <OrangeButton width={"90%"}>Buy now</OrangeButton>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
  },
  image: {
    resizeMode: "contain",
    height: "90%",
    width: "90%",
  },
  productInfo: {
    height: "25%",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },
  productBrand: {
    fontSize: 20,
  },
  productName: {
    fontSize: 26,
    fontWeight: "600",
  },
  productRating: { fontSize: 18 },
  productPrice: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  productPricePound: { fontSize: 20 },
  productPriceNumber: { fontSize: 32, fontWeight: "700", marginLeft: 5 },
  buttonContainer: {
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});
