import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import OrdersBanner from "../UI/Banner/OrdersBanner";
import { useIsFocused } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import TextBold18 from "../UI/Text/TextBold18";

const ManageOrders = () => {
  const styles = StyleSheet.create({
    mainConatainer: {
      marginTop: StatusBar.currentHeight,
      justifyContent: "center",
      alignItems: "center",
    },
    titleContainer: {
      alignItems: "center",
      marginBottom: 20,
    },
  });

  const [ordersData, setOrdersData] = useState([]);
  const userId = auth.currentUser.uid;
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storesFetched = [];
    const getStores = async () => {
      try {
        const data = await getDocs(
          collection(db, "users/" + userId + "/stores")
        );
        data.forEach((item) => {
          storesFetched.push({ ...item.data(), id: item.id });
        });
      } catch (error) {
        Alert.alert("Error", error.message);
        console.log(error);
      }
    };
    const getOrders = async () => {
      try {
        storesFetched.forEach(async (store) => {
          const filterOrders = query(
            collection(db, "ordersNewItems"),
            where("storeId", "==", store.id)
          );
          const data = await getDocs(filterOrders);
          const fetchedData = [];
          data.forEach((item) => {
            fetchedData.push({ ...item.data(), id: item.id });
            if (fetchedData.length === data.size) {
              let duplicatesFound = false;
              console.log("orders", fetchedData);
              ordersData.forEach((order) => {
                fetchedData.forEach((fetchedOrder) => {
                  if (order.id === fetchedOrder.id) {
                    duplicatesFound = true;
                  }
                });
              });
              if (!duplicatesFound) {
                setLoading(false);
                setOrdersData((prev) => [...prev, ...fetchedData]);
              } else {
                setOrdersData(fetchedData);
              }
            }
          });
        });
      } catch (error) {
        console.log(error);
        Alert.alert("Error", error.message);
        setLoading(false);
      }
    };
    const run = async () => {
      setLoading(true);
      await getStores();
      await getOrders();
      setLoading(false);
    };
    run();
  }, [isFocused]);

  return (
    <View style={styles.mainConatainer}>
      <Spinner visible={loading} />
      <View style={styles.titleContainer}>
        <TextBold18>Manage Orders</TextBold18>
      </View>

      {ordersData.length > 0 && !loading && (
        <FlatList
          data={ordersData}
          renderItem={({ item }) => <OrdersBanner data={item} />}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      )}
    </View>
  );
};

export default ManageOrders;
