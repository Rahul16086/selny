import { View, StyleSheet, Alert, Image, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { getMapPreview } from "../../utils/location";
import TextBold18 from "../UI/Text/TextBold18";
import TextInputGrey from "../UI/Input/TextInputGrey";
import YellowButton from "../UI/Buttons/YellowButton";
import TransparentButton from "../UI/Buttons/TransparentButton";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";

const SellProduct = () => {
  const [image, setImage] = useState([]);
  const [pickedLocation, setPickedLocation] = useState(undefined);
  const Navigation = useNavigation();
  const Route = useRoute();
  const isFocused = useIsFocused();
  const [itemInfo, setItemInfo] = useState({
    item_name: "",
    description: "",
    price: "",
    year: "",
    location: { lat: "", lng: "" },
    imageLinks: [],
  });

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setItemInfo((currentInputValue) => {
      return {
        ...currentInputValue,
        [inputIdentifier]: enteredValue,
      };
    });
  };
  console.log(itemInfo);
  useEffect(() => {
    if (isFocused && Route.params) {
      setPickedLocation({
        lat: Route.params.confirmedLat,
        lng: Route.params.confirmedLng,
      });
    }
  }, [Route, isFocused]);

  const pickImage = async () => {
    if (image.length > 3) {
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
      setImage((old) => [...old, result.uri]);
    }
  };

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("Location permission denied");
      return false;
    }
    return true;
  }

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    console.log(hasPermission);
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    console.log(location);
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const uploadImage = async () => {
    if (!image || image.length === 0) {
      Alert.alert("No Image Picked", "Please pick an image to upload");
      return;
    }
    image.forEach(async (image) => {
      try {
        const currentUserId = await AsyncStorage.getItem("token");
        const imageRef = ref(storage, "sell/" + currentUserId + "/" + v4());
        //convert image to bytes as it is in string format
        const finalImage = await fetch(image);
        const finalImageBytes = await finalImage.blob();
        const imageUploadState = await uploadBytes(imageRef, finalImageBytes);
        console.log("Image Uploaded " + imageUploadState.ref);
      } catch (error) {
        console.log(error);
        Alert.alert("Image Upload Failed", "Please try again");
      }
    });
  };

  const clearImageHandler = () => {
    console.log("Clearing Image");
    Alert.alert(
      "Clear Images🗑️",
      "Are you sure you want to clear all the image picked?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            setImage([]);
          },
        },
      ]
    );
  };

  const submitHandler = async () => {
    console.log("Submitting");
    if (
      itemInfo.item_name.length < 3 ||
      itemInfo.price.length < 1 ||
      itemInfo.description.length < 5 ||
      itemInfo.year.length !== 4
    ) {
      Alert.alert("Incorrect details!", "Please check the details entered");
    } else if (!pickedLocation) {
      Alert.alert("No Location Picked", "Please pick a location");
      return;
    } else if (image.length === 0) {
      Alert.alert("No Image Picked", "Please pick an image to upload");
      return;
    }
    const finalInfo = {
      ...itemInfo,
      location: pickedLocation,
      imageLinks: image,
    };
    console.log(finalInfo);
    try {
      const currentUserId = await AsyncStorage.getItem("token");
      await setDoc(
        doc(db, "users/" + currentUserId + "/itemsToSell/" + v4()),
        finalInfo
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "DB Error occurred");
    }
  };
  return (
    <View style={sellProductStyles.mainContainer}>
      <ScrollView>
        <TextBold18>Item name</TextBold18>
        <TextInputGrey
          onChangeText={inputChangedHandler.bind(this, "item_name")}
        />
        <TextBold18>Description</TextBold18>
        <TextInputGrey
          onChangeText={inputChangedHandler.bind(this, "description")}
        />
        <TextBold18>Price</TextBold18>
        <TextInputGrey onChangeText={inputChangedHandler.bind(this, "price")} />
        <TextBold18>Year</TextBold18>
        <TextInputGrey onChangeText={inputChangedHandler.bind(this, "year")} />
        <TextBold18>Location</TextBold18>
        <View style={sellProductStyles.locationOptions}>
          <TransparentButton onPress={getLocationHandler} width="45%">
            Current Location
          </TransparentButton>
          <TransparentButton
            onPress={() => Navigation.navigate("mapView")}
            width="45%"
          >
            Pick on Map
          </TransparentButton>
        </View>
        {pickedLocation ? (
          <>
            <View style={sellProductStyles.pickedLocation}>
              <TextBold18>Lat: {pickedLocation.lat}</TextBold18>
              <TextBold18> Lng: {pickedLocation.lng}</TextBold18>
            </View>
            <Image
              source={{
                uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
              }}
              style={sellProductStyles.mapsPreview}
            />
          </>
        ) : (
          <View style={sellProductStyles.noLocation}>
            <TextBold18>No location picked</TextBold18>
          </View>
        )}
        {image?.length > 0 && (
          <>
            <TextBold18>Selected Image(s)</TextBold18>
            <View style={sellProductStyles.imagePreview}>
              {image.map((image) => (
                <Image
                  source={{ uri: image }}
                  style={sellProductStyles.selectedImage}
                  key={image}
                />
              ))}
            </View>
          </>
        )}
        <YellowButton onPress={pickImage}>Add Images</YellowButton>
        {image.length > 0 && (
          <YellowButton onPress={clearImageHandler}>Clear Images</YellowButton>
        )}
        <YellowButton onPress={submitHandler}>Post</YellowButton>
      </ScrollView>
    </View>
  );
};

const sellProductStyles = StyleSheet.create({
  mainContainer: {
    padding: 10,
  },
  mapsPreview: {
    width: "100%",
    height: 200,
    marginVertical: 5,
  },
  locationOptions: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 30,
  },
  noLocation: {
    alignItems: "center",
    justifyContent: "center",
    height: 20,
    marginVertical: 5,
  },
  pickedLocation: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginVertical: 10,
  },
  imagePreview: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
  selectedImage: {
    width: "33%",
    height: 150,
    marginVertical: 5,
    resizeMode: "contain",
  },
});

export default SellProduct;
