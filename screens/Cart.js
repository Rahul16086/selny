import { View } from "react-native";
import TextBold18 from "../components/UI/Text/TextBold18";

const Cart = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextBold18>Cart is empty :(</TextBold18>
    </View>
  );
};

export default Cart;
