import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/main";
import primaryURL from "../../config";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = `${primaryURL}/api/account/login`;
  useEffect(() => {
    const checkAuth = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        navigation.navigate("Home");
      }
    };
    checkAuth();
  }, []);
  const handleLogin = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, password: password }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.token) {
          await AsyncStorage.setItem("userToken", data.token);
          await AsyncStorage.setItem("roleName", data.roleName);
          if (data.userId) {
            await AsyncStorage.setItem("userId", data.userId.toString()); // Ensure userId is stored as string if necessary
          } else {
            console.warn("userId not found in API response:", data);
          }
          navigation.navigate("Dashboard");
        } else {
          Alert.alert("Login failed", "Token is missing in the response");
        }
      } else {
        const errorData = await response.json();
        console.log("Error response:", errorData);
        Alert.alert("Login failed", "Username or password is incorrect");
      }
    } catch (error) {
      console.error("Error during login request:", error);
      Alert.alert("Login failed", "An error occurred");
    }
  };
  const navigateToRegister = () => {
    navigation.navigate("Register");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.mb1}>Login Page</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.m1}>Haven't an account ? You can Register Here !</Text>
      <Button onPress={navigateToRegister} title="Register"></Button>
    </View>
  );
};

export default LoginScreen;
