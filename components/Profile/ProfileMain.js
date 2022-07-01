import { StatusBar, StyleSheet, View, Image } from "react-native";
import avatar from "../../assets/Avatar.png";
import myOrdersIcon from "../../assets/icons/MyOrdersIcon.png";
import profileIcon from "../../assets/icons/Profileicon.png";
import faqIcon from "../../assets/icons/FAQIcon.png";
import bellIcon from "../../assets/icons/BellIcon.png";
import RedShadowButton from "../UI/Buttons/RedShadowButton";
import ShadowIconButton from "../UI/Buttons/ShadowIconButton";
import { useNavigation } from "@react-navigation/native";

const ProfileMain = () => {
  const Navigation = useNavigation();

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
      </View>
      <View style={styles.myOrdersContainer}>
        <ShadowIconButton
          icon={myOrdersIcon}
          text={"My Orders"}
          onPress={() => Navigation.navigate("myOrders")}
        />
      </View>
      <View style={styles.otherActionsContainer}>
        <ShadowIconButton icon={profileIcon} text={"My Profile"} />
        <ShadowIconButton icon={faqIcon} text={"FAQ"} />
        <ShadowIconButton icon={bellIcon} text={"Notification"} />
      </View>
      <View style={styles.signOutContainer}>
        <RedShadowButton text={"Sign Out"} />
      </View>
    </View>
  );
};

export default ProfileMain;
