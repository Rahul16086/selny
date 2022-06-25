import { View, StyleSheet, Alert, Image, ScrollView } from "react-native";
import { useState } from "react";
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

const SellProduct = () => {
  const [image, setImage] = useState(null);
  const [pickedLocation, setPickedLocation] = useState(undefined);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
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

  return (
    <View style={sellProductStyles.mainContainer}>
      <ScrollView>
        <TextBold18>Item name</TextBold18>
        <TextInputGrey />
        <TextBold18>Description</TextBold18>
        <TextInputGrey />
        <TextBold18>Price</TextBold18>
        <TextInputGrey />
        <TextBold18>Year</TextBold18>
        <TextInputGrey />
        <TextBold18 onPress={getLocationHandler}>Location</TextBold18>
        <TextInputGrey />
        {pickedLocation ? (
          <Image
            source={{
              uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
            }}
            style={sellProductStyles.mapsPreview}
          />
        ) : (
          <TextBold18>No location picked</TextBold18>
        )}
        {image && <TextBold18>{image}</TextBold18>}
        <YellowButton onPress={pickImage}>Add Images</YellowButton>
        <YellowButton>Post</YellowButton>
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
  },
});

export default SellProduct;
