import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import UpdateItem from "../components/SellProduct/UpdateItem";
import MapView from "../screens/MapView";
import SellNewItemScreen from "../screens/SellNewItemScreen";
import SellUsedItem from "../screens/SellUsedItem";

const SellStack = createNativeStackNavigator();

const SellStackScreen = () => {
  const storeAdmin = useSelector((state) => state.user.storeAdmin);

  return (
    <SellStack.Navigator>
      {!storeAdmin && (
        <SellStack.Screen
          name="sellUsedItem"
          component={SellUsedItem}
          options={{ headerShown: false }}
        />
      )}
      {storeAdmin && (
        <SellStack.Screen
          name="sellNewItem"
          component={SellNewItemScreen}
          options={{ headerShown: false }}
        />
      )}
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
