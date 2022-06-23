import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StyleSheet, View, StatusBar, SafeAreaView } from "react-native";
import SellProduct from "./components/SellProduct/SellProduct";
import Map from "./components/SellProduct/Map";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="auto" />
      <Map />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight,
  },
});
