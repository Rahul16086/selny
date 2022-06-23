import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { styles } from "../Auth/Login";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { getMapPreview } from "../../utils/location";

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
      Alert.alert("Image picked");
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
        <Text style={styles.fonts}>Item name</Text>
        <TextInput style={styles.textInput} />
        <Text style={styles.fonts}>Description</Text>
        <TextInput style={styles.textInput} />
        <Text style={styles.fonts}>Price</Text>
        <TextInput style={styles.textInput} />
        <Text style={styles.fonts}>Year</Text>
        <TextInput style={styles.textInput} />
        <Text onPress={getLocationHandler} style={styles.fonts}>
          Location
        </Text>
        <TextInput style={styles.textInput} />
        {pickedLocation ? (
          <Image
            source={{
              uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
            }}
            style={sellProductStyles.mapsPreview}
          />
        ) : (
          <Text>No location picked</Text>
        )}

        <Pressable
          onPress={pickImage}
          style={styles.buttonTouch}
          android_ripple={{ color: "#ffffff" }}
        >
          <Text style={styles.fonts}>Add Images</Text>
        </Pressable>
        <Pressable
          style={styles.buttonTouch}
          android_ripple={{ color: "#ffffff" }}
        >
          <Text style={styles.fonts}>Post</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const sellProductStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    width: "90%",
  },
  mapsPreview: {
    width: "100%",
    height: 200,
  },
});
export default SellProduct;
