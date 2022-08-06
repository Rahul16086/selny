import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import OrangeButton from "../UI/Buttons/OrangeButton";
import YellowButton from "../UI/Buttons/YellowButton";
import Text20 from "../UI/Text/Text20";
import Slideshow from "react-native-image-slider-show";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db, storage } from "../../config/firebase";
import { deleteObject, ref } from "firebase/storage";

const ProductDetails = () => {
  const [currentItemData, setCurrentItemData] = useState({});
  const [imagesLinks, setImagesLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const Route = useRoute();
  const { item, editMode } = Route.params;
  const Navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    setCurrentItemData(item);
    const images = item.imageLinks; //transforming image links as object with url as key for slideshow component
    if (images.length !== imagesLinks.length) {
      images.forEach((url) => {
        setImagesLinks((prevImagesLinks) => [...prevImagesLinks, { url: url }]);
      });
      setLoading(false);
    }
    setLoading(false);
  }, []);

  const deleteItemHandler = async () => {
    setLoading(true);
    Alert.alert(
      "Confirm Delete Item?",
      "Are you sure you want to delete item? This action cannot be undone.",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "newItems", item?.id));
              item.images.forEach(async (image) => {
                const userId = auth.currentUser.uid;
                const imageRef = ref(
                  storage,
                  "newItems/" + userId + "/" + image
                );
                await deleteObject(imageRef);
                Navigation.navigate("manageStores");
                setLoading(false);
              });
              setLoading(false);
            } catch (error) {
              setLoading(false);
              console.log(error);
              Alert.alert("Delete Failed", "Please try again later");
            }
          },
        },
      ]
    );
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      {!loading && (
        <View style={styles.imageContainer}>
          <Slideshow
            dataSource={imagesLinks}
            height={300}
            indicatorColor={"CF4000"}
            arrowSize={20}
          />
        </View>
      )}
      <View style={styles.productInfo}>
        {currentItemData.brand && (
          <Text style={styles.productBrand}>Apple</Text>
        )}
        <Text style={styles.productName}>{currentItemData.item_name}</Text>
        <Text20>{currentItemData.description}</Text20>
        {currentItemData.rating && (
          <Text style={styles.productRating}>⭐⭐⭐⭐ 4.5 (750)</Text>
        )}
        <View style={styles.productPrice}>
          <Text style={styles.productPricePound}>£</Text>
          <Text style={styles.productPriceNumber}>{currentItemData.price}</Text>
        </View>
        {currentItemData.quantity_left && (
          <Text20>
            {currentItemData.quantity_left < 11
              ? "Hurry! Only " + currentItemData.quantity_left + " left"
              : currentItemData.quantity_left + " left"}
          </Text20>
        )}
        {currentItemData.location && (
          <>
            <Text20>Lat: {currentItemData.location.lat}</Text20>
            <Text20>Lng: {currentItemData.location.lng}</Text20>
          </>
        )}
      </View>
      {!editMode && (
        <View style={styles.buttonContainer}>
          <YellowButton width={"90%"}>Add to cart</YellowButton>
          <OrangeButton width={"90%"}>Buy now</OrangeButton>
        </View>
      )}
      {editMode && (
        <View style={styles.buttonContainer}>
          <YellowButton
            width={"90%"}
            onPress={() =>
              Navigation.navigate("sellStack", {
                screen: "updateItem",
                params: {
                  item: item,
                },
              })
            }
          >
            Edit Item
          </YellowButton>
          <OrangeButton width={"90%"} onPress={deleteItemHandler}>
            Delete Item
          </OrangeButton>
        </View>
      )}
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
  },
  image: {
    resizeMode: "contain",
    height: "90%",
    width: "90%",
  },
  productInfo: {
    height: "28%",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },
  productBrand: {
    fontSize: 20,
    fontFamily: "montserratMedium",
  },
  productName: {
    fontSize: 26,
    fontFamily: "montserratSemiBold",
  },
  productRating: { fontSize: 18, fontFamily: "montserrat" },
  productPrice: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  productPricePound: { fontSize: 20, fontFamily: "montserrat" },
  productPriceNumber: {
    fontSize: 32,
    fontFamily: "montserratBold",
    marginLeft: 5,
  },
  buttonContainer: {
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});
