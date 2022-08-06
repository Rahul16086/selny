import { Text, StyleSheet, View, TextInput, Image } from "react-native";
import YellowButtonSmall from "../UI/Buttons/YellowButtonSmall";
import ProductList from "./ProductList";
import searchIcon from "../../assets/icons/Searchicon.png";
import locationPin from "../../assets/icons/locationPin.png";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import TextBold18 from "../UI/Text/TextBold18";
import { useIsFocused } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay/lib";

const Products = ({ navigation }) => {
  const [newItemsToggle, setNewItemsToggle] = useState(true);
  const isFocused = useIsFocused();
  const [newItems, setNewItems] = useState([]);
  const [usedItemsData, setUsedItemsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleUsedItems = () => {
    setNewItemsToggle(false);
  };

  const toggleNewItems = () => {
    setNewItemsToggle(true);
  };

  useEffect(() => {
    //initialize used items data from firestore
    setLoading(true);
    const getNewItems = async () => {
      setLoading(true);
      const docs = await getDocs(collection(db, "newItems"));
      const newItems = [];
      docs.forEach((item) => {
        newItems.push(item.data());
        if (newItems.length === docs.size) {
          setNewItems(newItems);
          setLoading(false);
        }
      });
      setLoading(false);
    };
    const getUsedItems = async () => {
      setLoading(true);
      const docs = await getDocs(collection(db, "itemsToSell"));
      if (docs.size !== usedItemsData.length) {
        const itemData = [];
        docs.forEach((doc) => {
          itemData.push(doc.data());
          if (itemData.length === docs.size) {
            setUsedItemsData(itemData);
            setLoading(false);
          }
        });
      }
      setLoading(false);
    };
    getNewItems();
    getUsedItems();
  }, [isFocused]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Image source={searchIcon} />
          <TextInput style={styles.searchBarInput} />
        </View>
      </View>
      <View style={styles.location}>
        <Image source={locationPin} />
        <Text style={styles.locationText}> G4 0AJ, Glasgow, UK</Text>
      </View>
      <View style={styles.buttons}>
        <YellowButtonSmall
          onPress={toggleNewItems}
          backgroundColor={newItemsToggle ? "#FEB700" : "transparent"}
        >
          New
        </YellowButtonSmall>
        <YellowButtonSmall
          onPress={toggleUsedItems}
          backgroundColor={!newItemsToggle ? "#FEB700" : "transparent"}
        >
          Used
        </YellowButtonSmall>
      </View>
      <Spinner visible={loading} />
      {newItemsToggle && !loading && (
        <View style={{ flex: 1 }}>
          {newItems.length > 0 ? (
            <ProductList productInfo={newItems} navigation={navigation} />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextBold18>No New Items Found</TextBold18>
            </View>
          )}
        </View>
      )}
      {!newItemsToggle && !loading && (
        <View style={{ flex: 1 }}>
          {usedItemsData.length > 0 ? (
            <ProductList productInfo={usedItemsData} navigation={navigation} />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextBold18>No Items Found</TextBold18>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  searchBarContainer: {
    height: 60,
    backgroundColor: "#FEB700",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 8,
  },
  searchIcon: { borderWidth: 1 },
  searchBarInput: {
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
    height: 45,
    width: "90%",
    paddingLeft: 8,
    fontSize: 18,
    fontFamily: "montserrat",
  },
  location: {
    height: 40,
    backgroundColor: "#FFDB7D",
    justifyContent: "center",
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  locationText: {
    fontSize: 18,
    letterSpacing: 0.5,
    fontFamily: "montserratMedium",
  },
  buttons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 50,
  },
  products: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});
