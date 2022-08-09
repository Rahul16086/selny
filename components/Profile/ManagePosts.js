import { StatusBar, FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import ItemBanner from "../UI/Banner/ItemBanner";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useIsFocused } from "@react-navigation/native";
import TextBold18 from "../UI/Text/TextBold18";
import "react-native-get-random-values";
import { v4 } from "uuid";
import Spinner from "react-native-loading-spinner-overlay";

const ManagePosts = () => {
  const [usedItems, setUsedItems] = useState([]);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsedItems = async () => {
      setLoading(true);
      const filterCurrentUser = query(
        collection(db, "itemsToSell"),
        where("userId", "==", auth.currentUser.uid)
      );
      const data = await getDocs(filterCurrentUser);
      const itemData = [];
      data.forEach((item) => {
        itemData.push({ ...item.data(), id: item.id });
        if (itemData.length === data.size) {
          setLoading(false);
          setUsedItems(itemData);
        }
      });
      setLoading(false);
    };
    getUsedItems();
  }, [isFocused]);

  return (
    <>
      <Spinner visible={loading} />
      {usedItems.length === 0 && !loading && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextBold18>No items posted for selling :(</TextBold18>
        </View>
      )}
      {usedItems.length > 0 && !loading && (
        <>
          <View
            style={{
              marginTop: StatusBar.currentHeight,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextBold18>Manage Posts</TextBold18>
          </View>
          <FlatList
            data={usedItems}
            renderItem={({ item }) => <ItemBanner item={item} />}
            key={v4()}
            contentContainerStyle={{
              marginTop: StatusBar.currentHeight,
              alignItems: "center",
            }}
          />
        </>
      )}
    </>
  );
};

export default ManagePosts;
