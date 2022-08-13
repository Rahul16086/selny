import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddStore from "../screens/AddStore";
import ManagePost from "../screens/ManagePost";
import ManageStoreItems from "../screens/ManageStoreItems";
import ManageStores from "../screens/ManageStores";
import MyOrders from "../screens/MyOrders";
import MyOrdersDetailedView from "../screens/MyOrdersDetailedView";
import MyProfile from "../screens/MyProfile";
import Profile from "../screens/Profile";
import ManageOrdersScreen from "../screens/ManageOrdersScreen";
import { useSelector } from "react-redux";
import UpdateItem from "../components/SellProduct/UpdateItem";

const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = () => {
  const storeAdmin = useSelector((state) => state.user.storeAdmin);
  return (
    <ProfileStack.Navigator initialRouteName="profile">
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
      {storeAdmin && (
        <ProfileStack.Screen
          name="manageStores"
          component={ManageStores}
          options={{ headerShown: false }}
        />
      )}
      {storeAdmin && (
        <ProfileStack.Screen
          name="addStore"
          component={AddStore}
          options={{ headerShown: false }}
        />
      )}
      {storeAdmin && (
        <ProfileStack.Screen
          name="manageStoreItems"
          component={ManageStoreItems}
          options={{ headerShown: false }}
        />
      )}
      {storeAdmin && (
        <ProfileStack.Screen
          name="manageOrders"
          component={ManageOrdersScreen}
          options={{ headerShown: false }}
        />
      )}
      <ProfileStack.Screen
        name="updateItem"
        component={UpdateItem}
        options={{ headerShown: false }}
      ></ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
