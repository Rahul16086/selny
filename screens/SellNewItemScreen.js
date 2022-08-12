import { StyleSheet, View } from "react-native";
import SellNewItem from "../components/SellProduct/SellNewItem";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SellNewItemScreen = () => {
  const [storeAdmin, setStoreAdmin] = useState(false);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  console.log("storeAdmin: " + storeAdmin);
  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const userStatus = await AsyncStorage.getItem("storeAdmin");
      setStoreAdmin(userStatus);
      setLoading(false);
    };
    getUser();
    setLoading(false);
  }, [isFocused]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
  });

  return (
    <>
      <Spinner visible={loading} />
      <View style={styles.container}>
        <SellNewItem />
      </View>
    </>
  );
};

export default SellNewItemScreen;
