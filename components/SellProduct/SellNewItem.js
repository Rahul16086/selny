import { View, ScrollView, Alert, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { sellProductStyles } from "./SellProduct";
import TextBold18 from "../UI/Text/TextBold18";
import TextInputGrey from "../UI/Input/TextInputGrey";
import YellowButton from "../UI/Buttons/YellowButton";
import * as ImagePicker from "expo-image-picker";
import { auth, db, storage } from "../../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import "react-native-get-random-values";
import { v4 } from "uuid";
import DropDownPicker from "react-native-dropdown-picker";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { LogBox } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import TextBold22 from "../UI/Text/TextBold22";

const SellNewItem = () => {
  const [images, setImages] = useState([]);
  const [itemInfo, setItemInfo] = useState({
    brand: "",
    item_name: "",
    description: "",
    price: 0,
    quantity_left: 0,
    imageLinks: [],
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const isFocused = useIsFocused();
  const Navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const inputChangeHandler = (input, value) => {
    setItemInfo({ ...itemInfo, [input]: value });
  };

  useEffect(() => {
    setLoading(true);
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    const getStores = async () => {
      setLoading(true);
      const userId = auth.currentUser.uid;
      const data = await getDocs(collection(db, "users/" + userId + "/stores"));
      if (data) {
        const fetchedData = [];
        data.forEach((item) => {
          fetchedData.push({ label: item.data().name, value: item.id });
          if (fetchedData.length === data.size) {
            setItems(fetchedData);
          }
        });
        setLoading(false);
      }
    };
    getStores();
    if (
      itemInfo.brand !== "" ||
      itemInfo.item_name !== "" ||
      itemInfo.description !== "" ||
      itemInfo.price !== 0 ||
      itemInfo.quantity_left !== 0 ||
      images.length !== 0
    ) {
      setLoading(true);
      setItemInfo({
        brand: "",
        item_name: "",
        description: "",
        price: 0,
        quantity_left: 0,
        imageLinks: [],
      });
      setValue(null);
      setImages([]);
      setLoading(false);
    }
    setLoading(false);
  }, [isFocused]);

  const pickImage = async () => {
    if (images.length > 3) {
      Alert.alert("Images Limit Reached", "You can only pick 4 images");
      return;
    }

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.cancelled) {
      setImages((old) => [...old, result.uri]);
    }
  };

  const infoValidator = () => {
    if (itemInfo.brand.length < 1) {
      Alert.alert("Info Error", "Brand is required");
      return false;
    }
    if (itemInfo.item_name.length < 1) {
      Alert.alert("Info Error", "Item Name is required");
      return false;
    }
    if (itemInfo.description.length < 5) {
      Alert.alert("Info Error", "Description is required");
      return false;
    }
    if (itemInfo.price < 1) {
      Alert.alert("Info Error", "Price is required");
      return false;
    }
    if (itemInfo.quantity_left < 1) {
      Alert.alert("Info Error", "Quantity is required");
      return false;
    }
    if (value === null) {
      Alert.alert("Info Error", "Store is required");
      return false;
    }
    if (images.length < 1) {
      Alert.alert("Info Error", "Please pick at least one image");
      return false;
    }
    return true;
  };

  const infoSubmitHandler = () => {
    setLoading(true);
    const uploadedImages = [];
    const uploadedImageLinks = [];
    if (infoValidator()) {
      images.forEach(async (image) => {
        try {
          const userId = auth.currentUser.uid;
          const imageRef = ref(storage, "newItems/" + userId + "/" + v4());
          const finalImage = await fetch(image);
          const finalImageBytes = await finalImage.blob();
          const imageUploadState = await uploadBytes(imageRef, finalImageBytes);
          uploadedImages.push(imageUploadState.metadata.name);
          const downloadableUrl = await getDownloadURL(imageUploadState.ref);
          uploadedImageLinks.push(downloadableUrl);
        } catch (error) {
          console.log(error);
          Alert.alert("Image Upload Failed", "Something went wrong");
          setLoading(false);
        }
        if (uploadedImageLinks.length === images.length) {
          setLoading(true);
          try {
            const finalInfo = {
              ...itemInfo,
              imageLinks: uploadedImageLinks,
              images: uploadedImages,
              storeId: value,
            };
            await setDoc(doc(db, "newItems/" + v4()), finalInfo);
            Navigation.navigate("home");
          } catch (error) {
            console.log(error);
            Alert.alert("Error", "DB Error occurred");
            setLoading(false);
          }
        }
      });
    }
    setLoading(false);
  };

  const clearImageHandler = () => {
    Alert.alert(
      "Clear Images🗑️",
      "Are you sure you want to clear all the image picked?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            setImages([]);
          },
        },
      ]
    );
  };

  const style = StyleSheet.create({
    addStoreButtonContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 50,
    },
  });

  return (
    <View style={sellProductStyles.mainContainer}>
      <Spinner visible={loading} />
      {!loading && items.length < 1 && (
        <>
          <TextBold22>Please add a store before selling a product</TextBold22>
          <View style={style.addStoreButtonContainer}>
            <YellowButton
              width={"75%"}
              onPress={() =>
                Navigation.navigate("profileStack", { screen: "addStore" })
              }
            >
              Add Store
            </YellowButton>
          </View>
        </>
      )}
      {!loading && items.length > 0 && (
        <ScrollView>
          <TextBold18>Brand</TextBold18>
          <TextInputGrey
            onChangeText={inputChangeHandler.bind(this, "brand")}
            value={itemInfo.brand}
          />
          <TextBold18>Item name</TextBold18>
          <TextInputGrey
            onChangeText={inputChangeHandler.bind(this, "item_name")}
            value={itemInfo.item_name}
          />
          <TextBold18>Description</TextBold18>
          <TextInputGrey
            onChangeText={inputChangeHandler.bind(this, "description")}
            value={itemInfo.description}
          />
          <TextBold18>Price</TextBold18>
          <TextInputGrey
            onChangeText={inputChangeHandler.bind(this, "price")}
            value={itemInfo.price.toString()}
          />
          <TextBold18>Quantity Left</TextBold18>
          <TextInputGrey
            onChangeText={inputChangeHandler.bind(this, "quantity_left")}
            value={itemInfo.quantity_left.toString()}
          />
          <TextBold18>Store</TextBold18>
          <View>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={{
                backgroundColor: "transparent",
                borderColor: "#6D6D6D",
              }}
              textStyle={{ fontFamily: "montserrat" }}
            />
          </View>
          <TextBold18>Images</TextBold18>
          {images?.length > 0 && (
            <>
              <TextBold18>Selected Image(s)</TextBold18>
              <View style={sellProductStyles.imagePreview}>
                {images.map((image) => (
                  <Image
                    source={{ uri: image }}
                    style={sellProductStyles.selectedImage}
                    key={image}
                  />
                ))}
              </View>
            </>
          )}
          {images.length === 0 && (
            <View style={{ alignItems: "center", height: 30 }}>
              <TextBold18>No Images Added</TextBold18>
            </View>
          )}
          <YellowButton onPress={pickImage}>Add Images</YellowButton>
          {images.length > 0 && (
            <YellowButton onPress={clearImageHandler}>
              Clear Images
            </YellowButton>
          )}
          <YellowButton onPress={infoSubmitHandler}>Submit</YellowButton>
        </ScrollView>
      )}
    </View>
  );
};

export default SellNewItem;
