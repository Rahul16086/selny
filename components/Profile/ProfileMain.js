import { StatusBar, StyleSheet, View, Image } from "react-native";
import avatar from "../../assets/Avatar.png";
import myOrdersIcon from "../../assets/icons/MyOrdersIcon.png";
import profileIcon from "../../assets/icons/Profileicon.png";
import faqIcon from "../../assets/icons/FAQIcon.png";
import bellIcon from "../../assets/icons/BellIcon.png";
import RedShadowButton from "../UI/Buttons/RedShadowButton";
import ShadowIconButton from "../UI/Buttons/ShadowIconButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setAuthLogout } from "../../store/redux/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import TextBold18 from "../UI/Text/TextBold18";

const ProfileMain = () => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    await signOut(auth);
    dispatch(setAuthLogout({ isAuthenticated: false, token: "" }));
    AsyncStorage.removeItem("token");
  };

  const [user, setUser] = useState(null);
  const [storeAdmin, setStoreAdmin] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const userId = auth.currentUser.uid;
      const currentUserRef = doc(db, "users", userId);
      const userDbData = await getDoc(currentUserRef);
      if (userDbData.exists()) {
        setUser(userDbData.data());
        if (userDbData.data().storeAdmin) {
          setStoreAdmin(true);
        }
      }
    };
    getUser();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
    avatarContainer: {
      height: "40%",
      justifyContent: "center",
      alignItems: "center",
    },
    myOrdersContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    otherActionsContainer: {
      alignItems: "center",
      marginTop: 50,
    },
    signOutContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-end",
      paddingBottom: 20,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={avatar} />
        <TextBold18>{user?.full_name}</TextBold18>
      </View>
      <View style={styles.myOrdersContainer}>
        {!storeAdmin && (
          <ShadowIconButton
            icon={myOrdersIcon}
            text={"My Orders"}
            onPress={() => Navigation.navigate("myOrders")}
          />
        )}
        {storeAdmin && (
          <ShadowIconButton icon={myOrdersIcon} text={"Manage Stores"} />
        )}
      </View>
      <View style={styles.otherActionsContainer}>
        <ShadowIconButton
          icon={profileIcon}
          text={"My Profile"}
          onPress={() => Navigation.navigate("myProfile")}
        />
        {!storeAdmin && (
          <ShadowIconButton
            icon={faqIcon}
            text={"Manage Posts"}
            onPress={() => Navigation.navigate("managePost")}
          />
        )}
        {storeAdmin && (
          <ShadowIconButton icon={faqIcon} text={"Manage Orders"} />
        )}
        <ShadowIconButton icon={bellIcon} text={"Notification"} />
      </View>
      <View style={styles.signOutContainer}>
        <RedShadowButton text={"Sign Out"} onPress={logoutHandler} />
      </View>
    </View>
  );
};

export default ProfileMain;
