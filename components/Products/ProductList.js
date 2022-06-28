import { FlatList } from "react-native";
import ProductTile from "./ProductTile";

const ProductList = ({ productInfo }) => {
  return (
    <FlatList
      data={productInfo}
      renderItem={({ item }) => <ProductTile item={item} />}
      keyExtractor={(item) => item.key}
      numColumns={2}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
      }}
    />
  );
};

export default ProductList;
