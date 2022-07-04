import { View } from "react-native";
import Login from "../components/Auth/Login";

const LoginScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "space-evenly" }}>
      <Login />
    </View>
  );
};

export default LoginScreen;
