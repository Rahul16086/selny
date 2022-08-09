import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import ProductsDetailsView from "../screens/ProductDetailsView";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="home"
        component={Home}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="productDetails"
        component={ProductsDetailsView}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="placeOrder"
        component={PlaceOrderScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
