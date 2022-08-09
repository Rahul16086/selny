import { StyleSheet, StatusBar, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import OrdersBanner from "../UI/Banner/OrdersBanner";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

const MyOrdersComponent = () => {
  const styles = StyleSheet.create({
    container: {
      marginTop: StatusBar.currentHeight,
      width: "100%",
    },
  });
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const userId = auth.currentUser.uid;
      const filterOrders = query(
        collection(db, "ordersNewItems"),
        where("userId", "==", userId)
      );
      const data = await getDocs(filterOrders);
      const fetchedData = [];
      data.forEach((item) => {
        fetchedData.push({ ...item.data(), id: item.id });
        if (fetchedData.length === data.size) {
          setOrdersData(fetchedData);
        }
      });
    };
    getOrders();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={ordersData}
        renderItem={({ item }) => <OrdersBanner data={item} />}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </View>
  );
};

export default MyOrdersComponent;
