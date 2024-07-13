import React from "react";
import { View, Text, Button } from "react-native";
import styles from "../styles/main";
import AsyncStorage from "@react-native-async-storage/async-storage";
const HomeScreen = ({ navigation }) => {
  const checkAuthAndNavigate = async () => {
    const authenticated = await isAuthenticated();
    if (authenticated) {
      navigation.navigate("Dashboard");
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <Button title="Go to Dashboard" onPress={checkAuthAndNavigate} />
    </View>
  );
};
const isAuthenticated = async () => {
  const userToken = await AsyncStorage.getItem("userToken");
  return userToken !== null;
};

export default HomeScreen;
