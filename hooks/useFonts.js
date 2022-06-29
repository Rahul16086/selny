import * as Font from "expo-font";

const useFonts = async () => {
  await Font.loadAsync({
    poppins: require("../assets/fonts/Poppins-Light.ttf"),
    poppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
  });
};

export default useFonts;
