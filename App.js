import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import useFonts from "./hooks/useFonts";
import * as SplashScreen from "expo-splash-screen";
import SignUpScreen from "./screens/SignUp";
import LoginScreen from "./screens/Login";
import { Provider } from "react-redux";
import store from "./store/redux/store";
import { useSelector } from "react-redux";
import HomeTabs from "./stacks/HomeTabs";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  console.log("From App: ", isAuthenticated);
  return (
    <Stack.Navigator initialRouteName="login">
      {isAuthenticated && (
        <Stack.Screen
          name="homeTabs"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
      )}
      {!isAuthenticated && (
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
      {!isAuthenticated && (
        <Stack.Screen
          name="signUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};
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
      <Provider store={store}>
        <ExpoStatusBar style="auto" />
        <NavigationContainer onReady={onLayoutRootView}>
          <Navigation />
        </NavigationContainer>
      </Provider>
    </>
  );
}
