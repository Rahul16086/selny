import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginSignUp from "./screens/LoginSignUp";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Cart from "./screens/Cart";
import SellItem from "./screens/SellItem";
import React, { useState, useEffect, useCallback } from "react";
import useFonts from "./hooks/useFonts";
import homeIcon from "./assets/icons/HomeIcon.png";
import { Image } from "react-native";
import profileIconTab from "./assets/icons/ProfileIconTab.png";
import cartIcon from "./assets/icons/CartIcon.png";
import sellIcon from "./assets/icons/SellIcon.png";
import * as SplashScreen from "expo-splash-screen";
import ProfileStackScreen from "./stacks/ProfileStackScreen";
import HomeStackScreen from "./stacks/HomeStackScreen";

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

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const LoadFonts = async () => {
    await useFonts();
  };
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await LoadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <>
      <ExpoStatusBar style="auto" />
      <NavigationContainer onReady={onLayoutRootView}>
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
