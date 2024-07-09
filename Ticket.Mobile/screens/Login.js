import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import styles from '../styles/main';
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    // Simulate login process and set token
    if (username === "admin" && password === "password") { // Replace with real authentication logic
      await AsyncStorage.setItem("token", "dummy-token");
      navigation.navigate("Home");
    } else {
      alert("Invalid credentials");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;