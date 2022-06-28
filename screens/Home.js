import { View, StyleSheet, StatusBar } from "react-native";
import Products from "../components/Products/Products";

const Home = () => {
  return (
    <View style={styles.container}>
      <Products />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    marginTop: StatusBar.currentHeight,
  },
});
