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

const SellProduct = () => {
  const [image, setImage] = useState(null);
  const [pickedLocation, setPickedLocation] = useState(undefined);
  const Navigation = useNavigation();
  const Route = useRoute();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && Route.params) {
      setPickedLocation({
        lat: Route.params.confirmedLat,
        lng: Route.params.confirmedLng,
      });
    }
  }, [Route, isFocused]);

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
    marginVertical: 5,
  },
  locationOptions: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 30,
  },
  pickedLocation: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginVertical: 10,
  },
});

export default SellProduct;
