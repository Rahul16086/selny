import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Cart from "../screens/Cart";
import SellItem from "../screens/SellItem";
import HomeStackScreen from "./HomeStackScreen";
import ProfileStackScreen from "./ProfileStackScreen";
import homeIcon from "../assets/icons/HomeIcon.png";
import { Image } from "react-native";
import profileIconTab from "../assets/icons/ProfileIconTab.png";
import cartIcon from "../assets/icons/CartIcon.png";
import sellIcon from "../assets/icons/SellIcon.png";

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

export default HomeTabs;
