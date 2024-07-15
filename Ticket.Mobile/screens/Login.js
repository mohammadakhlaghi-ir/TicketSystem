import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/main";
import primaryURL from "../config";

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
        console.log("API Response:", data); // Log the response data

        if (data.token) {
          await AsyncStorage.setItem("userToken", data.token);
          await AsyncStorage.setItem("roleName", data.roleName);
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

  return (
    <View style={styles.container}>
      <Text>Login Page</Text>
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
    </View>
  );
};

export default LoginScreen;
