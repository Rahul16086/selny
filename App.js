import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginSignUp from "./screens/LoginSignUp";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import Home from "./screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./screens/Profile";
import Cart from "./screens/Cart";
import SellItem from "./screens/SellItem";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={Home} options={{ title: "Home" }} />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{ title: "Profile" }}
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
  return (
    <>
      <ExpoStatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
