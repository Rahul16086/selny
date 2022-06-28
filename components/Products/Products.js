import { Button, StyleSheet, View } from "react-native";
import TextBold18 from "../UI/Text/TextBold18";
import ProductList from "./ProductList";

const Products = () => {
  const productInfo = [
    { key: "Item1" },
    { key: "Item2" },
    { key: "Item3" },
    { key: "Item4" },
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
    { key: "Item16" },
    { key: "Item17" },
    { key: "Item18" },
    { key: "Item19" },
    { key: "Item20" },
    { key: "Item21" },
    { key: "Item22" },
    { key: "Item23" },
    { key: "Item24" },
    { key: "Item25" },
  ];
  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchBar}>
        <TextBold18>🔍 Search bar</TextBold18>
      </View>
      <View style={styles.location}>
        <TextBold18>📍 G4, Glasgow</TextBold18>
      </View>
      <View style={styles.buttons}>
        <Button title="New" />
        <Button title="Used" />
      </View>
      <View style={{ flex: 1 }}>
        <ProductList productInfo={productInfo} />
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
    height: 50,
    backgroundColor: "#FFDB7D",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  buttons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  products: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});
