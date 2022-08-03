import { useCallback, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import YellowButton from "../../components/UI/Buttons/YellowButton";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { useNavigation } from "@react-navigation/native";

const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState();
  const region = {
    latitude: 55.86227426578273,
    longitude: -4.254904198731872,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const Navigation = useNavigation();

  const selectedLocationHandler = (event) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat: lat, lng: lng });
    console.log(selectedLocation);
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
    setSelectedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const confirmLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location selected",
        "Please select a location to confirm"
      );
      return;
    }
    Navigation.navigate("sell", {
      confirmedLat: selectedLocation.lat,
      confirmedLng: selectedLocation.lng,
    });
  }, [selectedLocation, Navigation]);

  const mapStyles = StyleSheet.create({
    bottomActions: {
      height: "10%",
      paddingVertical: "2%",
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
    },
  });
  return (
    <>
      <MapView
        initialRegion={region}
        style={{ flex: 1, width: "100%" }}
        onPress={selectedLocationHandler}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
            }}
          />
        )}
      </MapView>
      <View style={mapStyles.bottomActions}>
        <YellowButton width={"45%"} onPress={getLocationHandler}>
          Current Location
        </YellowButton>
        <YellowButton width={"45%"} onPress={confirmLocationHandler}>
          Confirm Location
        </YellowButton>
      </View>
    </>
  );
};

export default Map;
