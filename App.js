import { NavigationContainer } from "@react-navigation/native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import useFonts from "./hooks/useFonts";
import * as SplashScreen from "expo-splash-screen";
import { Provider, useDispatch } from "react-redux";
import store from "./store/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthLogin } from "./store/redux/userSlice";
import MainNavigation from "./stacks/MainNavigation";
import * as Notification from "expo-notifications";

Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: false,
    };
  },
});

const Root = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const dispatch = useDispatch();

  const fetchToken = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log("Stored Token:  ", token);
    if (token) {
      dispatch(setAuthLogin({ isAuthenticated: true, token }));
    }
  };

  const LoadFonts = async () => {
    await useFonts();
  };

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await LoadFonts();
        await fetchToken();
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
    <NavigationContainer onReady={onLayoutRootView}>
      <MainNavigation />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <Provider store={store}>
        <ExpoStatusBar style="auto" />
        <Root />
      </Provider>
    </>
  );
}
