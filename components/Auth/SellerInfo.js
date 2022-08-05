import { View, StyleSheet, StatusBar, Image, Alert } from "react-native";
import React, { useState } from "react";
import TextBold18 from "../UI/Text/TextBold18";
import YellowButton from "../UI/Buttons/YellowButton";
import * as ImagePicker from "expo-image-picker";
import { auth, db, storage } from "../../config/firebase";
import { deleteUser } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import "react-native-get-random-values";
import { v4 } from "uuid";

const SellerInfo = () => {
  const [image, setImage] = useState(null);
  const Navigation = useNavigation();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri);
    }
  };

  const clearImageHandler = () => {
    Alert.alert(
      "Clear Images🗑️",
      "Are you sure you want to clear the image picked?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            setImage(null);
          },
        },
      ]
    );
  };

  const cancelRegistration = async () => {
    Alert.alert(
      "Cancel Account Creation?",
      "The details entered in the previous screen will also be lost. Are you sure?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            const user = auth.currentUser;
            console.log(user);

            try {
              if (user) {
                await deleteUser(user);
                await deleteDoc(doc(db, "users", user.uid));
                Navigation.navigate("login");
              }
            } catch (error) {
              console.log(error);
              Alert.alert("Error occurred", error.message);
            }
          },
        },
      ]
    );
  };

  const uploadProofImage = async () => {
    if (!image) {
      Alert.alert("No image selected", "Please select an image to upload");
      return;
    }
    try {
      const userId = auth.currentUser.uid;
      const imageRef = ref(storage, "storeProof/" + userId + "/" + v4());
      //convert image to bytes as it is in string format
      const finalImage = await fetch(image);
      const finalImageBytes = await finalImage.blob();
      const imageUploadState = await uploadBytes(imageRef, finalImageBytes);
      if (imageUploadState) {
        console.log("Image uploaded successfully");
        await updateDoc(doc(db, "users", userId), {
          storeProof: imageRef.fullPath,
        });
        Navigation.navigate("login");
      }
    } catch (error) {
      Alert.alert("Error uploading image", error.message);
    }
  };

  const styles = StyleSheet.create({
    mainContainer: {
      marginTop: StatusBar.currentHeight,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    formContainer: {
      borderRadius: 10,
      paddingVertical: 20,
      paddingHorizontal: 15,
      width: "100%",
      marginVertical: 10,
      elevation: 10,
      backgroundColor: "white",
      //ios
      shadowColor: "#171717",
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      justifyContent: "center",
      alignItems: "center",
    },
    actions: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
    },
    noImagePicked: {
      height: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    imagePreview: {
      width: "100%",
      height: 200,
      marginVertical: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: 10,
    },
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.formContainer}>
        <TextBold18>
          Please Add Proof of Address to complete registration
        </TextBold18>
        {image ? (
          <View style={styles.imagePreview}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        ) : (
          <View style={styles.noImagePicked}>
            <TextBold18>No Image Picked</TextBold18>
          </View>
        )}
        <YellowButton onPress={image ? clearImageHandler : pickImage}>
          {image ? "Clear Image" : "Add Image"}
        </YellowButton>
        <View style={styles.actions}>
          <YellowButton width={"45%"} onPress={cancelRegistration}>
            Cancel
          </YellowButton>
          <YellowButton width={"45%"} onPress={uploadProofImage}>
            Register
          </YellowButton>
        </View>
      </View>
    </View>
  );
};

export default SellerInfo;
