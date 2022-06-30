import { View, StyleSheet, StatusBar } from "react-native";
import Products from "../components/Products/Products";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Products navigation={navigation} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
