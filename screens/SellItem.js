import { StyleSheet, View } from "react-native";
import SellNewItem from "../components/SellProduct/SellNewItem";
import SellProduct from "../components/SellProduct/SellProduct";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SellItem = () => {
  const [storeAdmin, setStoreAdmin] = useState(false);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);

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
      {!loading && !storeAdmin && (
        <View style={styles.container}>
          <SellProduct />
        </View>
      )}
      {!loading && storeAdmin && (
        <View style={styles.container}>
          <SellNewItem />
        </View>
      )}
    </>
  );
};

export default SellItem;
