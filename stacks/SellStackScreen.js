import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
        name="mapView"
        component={MapView}
        options={{ headerShown: false }}
      />
    </SellStack.Navigator>
  );
};

export default SellStackScreen;
