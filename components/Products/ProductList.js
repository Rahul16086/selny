import { FlatList } from "react-native";
import ProductTile from "./ProductTile";
import "react-native-get-random-values";
import { v4 } from "uuid";

const ProductList = ({ productInfo, navigation }) => {
  return (
    <FlatList
      data={productInfo}
      renderItem={({ item }) => (
        <ProductTile navigation={navigation} item={item} />
      )}
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
