import { FlatList } from "react-native";
import ProductTile from "./ProductTile";

const ProductList = ({ productInfo, navigation }) => {
  return (
    <FlatList
      data={productInfo}
      renderItem={({ item }) => (
        <ProductTile navigation={navigation} item={item} />
      )}
      keyExtractor={(item) => item.key}
      numColumns={2}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    />
  );
};

export default ProductList;
