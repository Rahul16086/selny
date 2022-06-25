import { View } from "react-native";
import SellProduct from "../components/SellProduct/SellProduct";

const SellItem = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <SellProduct />
    </View>
  );
};

export default SellItem;
