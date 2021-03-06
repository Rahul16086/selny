import { Text, StyleSheet, View, TextInput, Image } from "react-native";
import YellowButtonSmall from "../UI/Buttons/YellowButtonSmall";
import ProductList from "./ProductList";
import searchIcon from "../../assets/icons/Searchicon.png";
import locationPin from "../../assets/icons/locationPin.png";

const Products = ({ navigation }) => {
  const productInfo = [
    { key: "Item1", name: "Apple iPhone 13 Pro" },
    { key: "Item2", name: "Apple iPhone 13 Pro" },
    { key: "Item3", name: "Apple iPhone 13 Pro" },
    { key: "Item4", name: "Apple iPhone 13 Pro" },
    { key: "Item5", name: "Apple iPhone 13 Pro" },
    { key: "Item6", name: "Apple iPhone 13 Pro" },
    { key: "Item7", name: "Apple iPhone 13 Pro" },
    { key: "Item8", name: "Apple iPhone 13 Pro" },
  ];
  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Image source={searchIcon} />
          <TextInput style={styles.searchBarInput} />
        </View>
      </View>
      <View style={styles.location}>
        <Image source={locationPin} />
        <Text style={styles.locationText}> G4 0AJ, Glasgow, UK</Text>
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
  searchBarContainer: {
    height: 60,
    backgroundColor: "#FEB700",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 8,
  },
  searchIcon: { borderWidth: 1 },
  searchBarInput: {
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
    height: 45,
    width: "90%",
    paddingLeft: 8,
    fontSize: 18,
    fontFamily: "montserrat",
  },
  location: {
    height: 40,
    backgroundColor: "#FFDB7D",
    justifyContent: "center",
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  locationText: {
    fontSize: 18,
    letterSpacing: 0.5,
    fontFamily: "montserratMedium",
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
