import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Pressable, Image, View } from "react-native";
import productImage from "../../assets/productImage1.png";
import Text12 from "../UI/Text/Text12";
import TextBold18 from "../UI/Text/TextBold18";

const ProductTile = ({ item }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.container}
      android_ripple={{ color: "6d6d6d" }}
      onPress={() =>
        navigation.navigate("productDetails", {
          item: item,
          editMode: item?.editMode ? true : false,
        })
      }
    >
      <View style={styles.imageContainer}>
        <Image
          source={
            item?.imageLinks?.length > 0
              ? { uri: item?.imageLinks[0] }
              : productImage
          }
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text12>{item.item_name}</Text12>
        <TextBold18>£ {item.price}</TextBold18>
      </View>
    </Pressable>
  );
};

export default ProductTile;

const styles = StyleSheet.create({
  container: {
    elevation: 10,
    backgroundColor: "white",
    width: 170,
    height: 220,
    borderRadius: 10,
    margin: 5,
    padding: 5,
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  imageContainer: {
    width: "100%",
    height: "65%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    borderRadius: 5,
  },
  textContainer: {
    width: "100%",
    height: "35%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
});
