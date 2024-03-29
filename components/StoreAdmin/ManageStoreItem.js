import { View, StyleSheet, FlatList, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import TextBold22 from "../UI/Text/TextBold22";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import ProductTile from "../Products/ProductTile";
import Spinner from "react-native-loading-spinner-overlay";

const ManageStoreItem = () => {
  const Route = useRoute();
  const { id, name } = Route.params;
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: StatusBar.currentHeight,
      marginBottom: 10,
    },
    empty: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  useEffect(() => {
    setLoading(true);
    const getStoreData = async () => {
      const filterStoreQuery = query(
        collection(db, "newItems"),
        where("storeId", "==", id)
      );
      const data = await getDocs(filterStoreQuery);
      const fetchedData = [];
      data.forEach((item) => {
        fetchedData.push({ ...item.data(), id: item.id });
        if (fetchedData.length === data.size) {
          setItemData(fetchedData);
          setLoading(false);
        }
      });
      setLoading(false);
    };
    getStoreData();
  }, [isFocused]);

  return (
    <>
      {loading && <Spinner visible={loading} />}
      {!loading && (
        <View style={styles.container}>
          <TextBold22>{name}</TextBold22>
        </View>
      )}
      {!loading && itemData.length < 1 && (
        <View style={styles.empty}>
          <TextBold22>No items found</TextBold22>
        </View>
      )}
      {!loading && (
        <FlatList
          data={itemData}
          renderItem={({ item }) => (
            <ProductTile item={{ ...item, editMode: true }} />
          )}
          contentContainerStyle={{
            paddingHorizontal: 10,
          }}
        />
      )}
    </>
  );
};

export default ManageStoreItem;
