import { View, StyleSheet, FlatList, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import ItemBanner from "../UI/Banner/ItemBanner";
import "react-native-get-random-values";
import { v4 } from "uuid";
import TextBold18 from "../UI/Text/TextBold18";
import YellowButton from "../UI/Buttons/YellowButton";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import Spinner from "react-native-loading-spinner-overlay";

const ManageStore = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const Navigation = useNavigation();
  const isFocused = useIsFocused();

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
      alignItems: "center",
      justifyContent: "center",
    },
    action: {
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 5,
    },
  });

  useEffect(() => {
    let isMounted = true;
    const getStoresData = async () => {
      setLoading(true);
      const userId = auth.currentUser.uid;
      const data = await getDocs(collection(db, "users/" + userId + "/stores"));
      if (data) {
        const fetchedData = [];
        data.forEach((item) => {
          fetchedData.push(item.data());
          if (fetchedData.length === data.size) {
            setData(fetchedData);
            setLoading(false);
          }
        });
      }
      setLoading(false);
      return () => {
        isMounted = false;
      };
    };
    getStoresData();
  }, [isFocused]);

  return (
    <>
      <Spinner visible={loading} />
      {data.length > 0 && !loading && (
        <FlatList
          data={data}
          renderItem={({ item }) => <ItemBanner item={item} />}
          contentContainerStyle={{
            marginTop: StatusBar.currentHeight,
            alignItems: "center",
          }}
          key={v4()}
        />
      )}
      {data?.length === 0 && !loading && (
        <View style={styles.mainContainer}>
          <TextBold18>No Stores Found!</TextBold18>
        </View>
      )}
      {!loading && (
        <View style={styles.action}>
          <YellowButton
            width={"75%"}
            onPress={() => Navigation.navigate("addStore")}
          >
            Add a Store
          </YellowButton>
        </View>
      )}
    </>
  );
};

export default ManageStore;
