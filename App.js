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
import homeIcon from "./assets/icons/HomeIcon.png";
import { Image } from "react-native";
import profileIconTab from "./assets/icons/ProfileIconTab.png";
import cartIcon from "./assets/icons/CartIcon.png";
import sellIcon from "./assets/icons/SellIcon.png";
import MyOrders from "./screens/MyOrders";
import MyOrdersDetailedView from "./screens/MyOrdersDetailedView";
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
        name="homeStack"
        component={HomeStackScreen}
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <Image source={homeIcon} />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="profileStack"
        component={ProfileStackScreen}
        options={{
          title: "Profile",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <Image source={profileIconTab} />,
        }}
      />
      <Tab.Screen
        name="cart"
        component={Cart}
        options={{
          title: "Cart",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <Image source={cartIcon} />,
        }}
      />
      <Tab.Screen
        name="sell"
        component={SellItem}
        options={{
          title: "Sell An Item",
          headerStyle: { backgroundColor: "#FEB700" },
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <Image source={sellIcon} />,
        }}
      />
    </Tab.Navigator>
  );
}

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
    </HomeStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="myOrders"
        component={MyOrders}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="myOrdersDetailedView"
        component={MyOrdersDetailedView}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
