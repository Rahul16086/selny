import { Button, FlatList, ScrollView, StyleSheet, View } from "react-native";
import TextBold18 from "../UI/Text/TextBold18";
import ProductTile from "./ProductTile";

const Products = () => {
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
      <ScrollView contentContainerStyle={styles.products}>
        {/*<FlatList
          data={[
            { key: "Item1" },
            { key: "Item2" },
            { key: "Item3" },
            { key: "Item4" },
            { key: "Item5" },
            { key: "Item6" },
          ]}
          renderItem={({ item }) => <ProductTile title={item.key} />}
          contentContainerStyle={{
            borderWidth: 1,
            flexDirection: "row",
            flex: 1,
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
          scrollEnabled={true}
        />*/}
        <ProductTile title="Item1" />
        <ProductTile title="Item2" />
        <ProductTile title="Item3" />
        <ProductTile title="Item4" />
      </ScrollView>
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
    backgroundColor: "gold",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  location: {
    height: 50,
    backgroundColor: "green",
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
