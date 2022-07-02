import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyOrders from "../screens/MyOrders";
import MyOrdersDetailedView from "../screens/MyOrdersDetailedView";
import Profile from "../screens/Profile";

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

export default ProfileStackScreen;
