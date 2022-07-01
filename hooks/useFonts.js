import * as Font from "expo-font";

const useFonts = async () => {
  await Font.loadAsync({
    montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
    montserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
    montserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    montserratLight: require("../assets/fonts/Montserrat-Light.ttf"),
    montserratMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
    montserratThin: require("../assets/fonts/Montserrat-Thin.ttf"),
  });
};

export default useFonts;
