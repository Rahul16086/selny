import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import HomeTabs from "./HomeTabs";
import LoginScreen from "../screens/Login";
import SignUpScreen from "../screens/SignUp";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
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

export default MainNavigation;
