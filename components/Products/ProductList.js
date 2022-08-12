import { FlatList } from "react-native";
import ProductTile from "./ProductTile";
import "react-native-get-random-values";
import { v4 } from "uuid";

const ProductList = ({ productInfo, usedItem }) => {
  return (
    <FlatList
      data={productInfo}
      renderItem={({ item }) => <ProductTile item={item} usedItem={usedItem} />}
      key={v4()}
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
