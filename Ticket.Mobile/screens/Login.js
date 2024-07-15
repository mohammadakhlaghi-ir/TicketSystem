import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/main";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = 'http://192.168.1.10:7246/api/account/login'; // Ensure this URL is correct

  const handleLogin = async () => {
    try {
      console.log("Sending request to:", apiUrl);
      console.log("Request body:", { name: username, password: password });

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username, password: password }),
      });

      console.log("Response status:", response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data); // Log the response data

        if (data.token) {
          await AsyncStorage.setItem('userToken', data.token);
          await AsyncStorage.setItem('roleName', data.roleName);
          navigation.navigate('Dashboard');
        } else {
          Alert.alert('Login failed', 'Token is missing in the response');
        }
      } else {
        const errorData = await response.json();
        console.log("Error response:", errorData);
        Alert.alert('Login failed', 'Username or password is incorrect');
      }
    } catch (error) {
      console.error("Error during login request:", error);
      Alert.alert('Login failed', 'An error occurred');
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
