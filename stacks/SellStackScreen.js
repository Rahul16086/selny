import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UpdateItem from "../components/SellProduct/UpdateItem";
import MapView from "../screens/MapView";
import SellItem from "../screens/SellItem";

const SellStack = createNativeStackNavigator();

const SellStackScreen = () => {
  return (
    <SellStack.Navigator>
      <SellStack.Screen
        name="sell"
        component={SellItem}
        options={{ headerShown: false }}
      />
      <SellStack.Screen
        name="updateItem"
        component={UpdateItem}
        options={{ headerShown: false }}
      ></SellStack.Screen>
      <SellStack.Screen
        name="mapView"
        component={MapView}
        options={{ headerShown: false }}
      />
    </SellStack.Navigator>
  );
};

export default SellStackScreen;
