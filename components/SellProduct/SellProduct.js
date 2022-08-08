import {
  View,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../config/firebase";
import "react-native-get-random-values";
import { v4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import Spinner from "react-native-loading-spinner-overlay/lib";

const SellProduct = () => {
  const [loading, setLoading] = useState(false);
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
  const uploadedImageLinks = [];
  const images = [];

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setItemInfo((currentInputValue) => {
      return {
        ...currentInputValue,
        [inputIdentifier]: enteredValue,
      };
    });
  };

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

  const verifyPermissions = async () => {
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
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const uploadImageAndFinalItemInfo = () => {
    setLoading(true);
    if (!image || image.length === 0) {
      Alert.alert("No Image Picked", "Please pick an image to upload");
      return;
    }
    image.forEach(async (singleImage) => {
      try {
        const currentUserId = auth.currentUser.uid;
        const imageRef = ref(storage, "sell/" + currentUserId + "/" + v4());
        //convert image to bytes as it is in string format
        const finalImage = await fetch(singleImage);
        const finalImageBytes = await finalImage.blob();
        const imageUploadState = await uploadBytes(imageRef, finalImageBytes);
        images.push(imageUploadState.metadata.name);
        const downloadableUrl = await getDownloadURL(imageUploadState.ref);
        uploadedImageLinks.push(downloadableUrl);
      } catch (error) {
        console.log(error);
        Alert.alert("Image Upload Failed", "Please try again");
      }
      if (uploadedImageLinks.length === image.length) {
        try {
          const currentUserId = auth.currentUser.uid;
          const finalInfo = {
            ...itemInfo,
            location: pickedLocation,
            imageLinks: uploadedImageLinks,
            images: images,
            userId: currentUserId,
            datePosted: new Date().toLocaleDateString(),
            status: "Live",
          };

          await setDoc(doc(db, "itemsToSell/" + v4()), finalInfo);
          Navigation.navigate("managePost");
          setLoading(false);
        } catch (error) {
          console.log(error);
          Alert.alert("Error", "DB Error occurred");
        }
      }
      setLoading(false);
    });
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
            setImage([]);
          },
        },
      ]
    );
  };

  const clearLocationHandler = () => {
    setPickedLocation(undefined);
  };

  const verifyEnteredInfoAndUploadedImages = () => {
    if (
      itemInfo.item_name.length < 3 ||
      itemInfo.price.length < 1 ||
      itemInfo.description.length < 5 ||
      itemInfo.year.length !== 4
    ) {
      Alert.alert("Incorrect details!", "Please check the details entered");
      return false;
    } else if (!pickedLocation) {
      Alert.alert("No Location Picked", "Please pick a location");
      return false;
    } else if (image.length === 0) {
      Alert.alert("No Image Picked", "Please pick an image to upload");
      return false;
    }
    return true;
  };

  const submitHandler = async () => {
    if (verifyEnteredInfoAndUploadedImages()) {
      uploadImageAndFinalItemInfo();
    }
  };

  return (
    <View style={sellProductStyles.mainContainer}>
      <Spinner visible={loading} />
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
        <View style={sellProductStyles.clearLocation}>
          <TransparentButton onPress={clearLocationHandler}>
            Clear Location
          </TransparentButton>
        </View>
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

export const sellProductStyles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    marginTop: StatusBar.currentHeight,
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
  clearLocation: {
    height: 30,
    justifyContent: "center",
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
