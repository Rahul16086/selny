import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginSignUp from "./screens/LoginSignUp";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import Home from "./screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./screens/Profile";
import Cart from "./screens/Cart";
import SellItem from "./screens/SellItem";
import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import useFonts from "./hooks/useFonts";
import ProductsDetailsView from "./screens/ProductDetailsView";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#FEB700",
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{ title: "Home", headerShown: false }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{ title: "Profile", headerShown: false }}
      />
      <Tab.Screen name="cart" component={Cart} options={{ title: "Cart" }} />
      <Tab.Screen
        name="sell"
        component={SellItem}
        options={{ title: "Sell" }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [IsReady, SetIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }
  return (
    <>
      <ExpoStatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="homeTabs"
            component={HomeTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="login"
            component={LoginSignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen
            name="productDetails"
            component={ProductsDetailsView}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
