import { Text, StyleSheet, View } from "react-native";
import YellowButtonSmall from "../UI/Buttons/YellowButtonSmall";
import TextBold18 from "../UI/Text/TextBold18";
import ProductList from "./ProductList";

const Products = ({ navigation }) => {
  const productInfo = [
    { key: "Item1", name: "Apple iPhone 13 Pro" },
    { key: "Item2", name: "Apple iPhone 13 Pro" },
    { key: "Item3", name: "Apple iPhone 13 Pro" },
    { key: "Item4", name: "Apple iPhone 13 Pro" },
    { key: "Item5" },
    { key: "Item6" },
    { key: "Item7" },
    { key: "Item8" },
    { key: "Item9" },
    { key: "Item10" },
    { key: "Item11" },
    { key: "Item12" },
    { key: "Item13" },
    { key: "Item14" },
    { key: "Item15" },
  ];
  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchBar}>
        <TextBold18>🔍 Search bar</TextBold18>
      </View>
      <View style={styles.location}>
        <Text style={styles.locationText}>📍 G4, Glasgow</Text>
      </View>
      <View style={styles.buttons}>
        <YellowButtonSmall>New</YellowButtonSmall>
        <YellowButtonSmall>Used</YellowButtonSmall>
      </View>
      <View style={{ flex: 1 }}>
        <ProductList productInfo={productInfo} navigation={navigation} />
      </View>
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  searchBar: {
    height: 60,
    backgroundColor: "#FEB700",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  location: {
    height: 40,
    backgroundColor: "#FFDB7D",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  locationText: {
    fontSize: 18,
    letterSpacing: 0.5,
    // fontFamily: "poppins",
  },
  buttons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 50,
  },
  products: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});
