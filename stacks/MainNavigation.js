import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import HomeTabs from "./HomeTabs";
import LoginScreen from "../screens/Login";
import SignUpScreen from "../screens/SignUp";
import SignUpSuccess from "../screens/SignUpSuccess";
import SellerAdditionalInfo from "../screens/SellerAdditionalInfo";
import ResetPassword from "../screens/ResetPassword";
import ChangePassword from "../screens/ChangePassword";

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
      {!isAuthenticated && (
        <Stack.Screen
          name="signUpSuccess"
          component={SignUpSuccess}
          options={{ headerShown: false }}
        />
      )}
      {!isAuthenticated && (
        <Stack.Screen
          name="sellerAdditionalInfo"
          component={SellerAdditionalInfo}
          options={{ headerShown: false }}
        />
      )}
      {!isAuthenticated && (
        <Stack.Screen
          name="resetPassword"
          component={ResetPassword}
          options={{ headerShown: false }}
        />
      )}
      {isAuthenticated && (
        <Stack.Screen
          name="changePassword"
          component={ChangePassword}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigation;
