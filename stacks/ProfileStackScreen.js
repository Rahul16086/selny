import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddStore from "../screens/AddStore";
import ManagePost from "../screens/ManagePost";
import ManageStores from "../screens/ManageStores";
import MyOrders from "../screens/MyOrders";
import MyOrdersDetailedView from "../screens/MyOrdersDetailedView";
import MyProfile from "../screens/MyProfile";
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
      <ProfileStack.Screen
        name="myProfile"
        component={MyProfile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="managePost"
        component={ManagePost}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="manageStores"
        component={ManageStores}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="addStore"
        component={AddStore}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackScreen;
