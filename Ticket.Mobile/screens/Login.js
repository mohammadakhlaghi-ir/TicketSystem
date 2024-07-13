import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/main";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = 'http://192.168.1.10:7246/api/account/login';

 
  const handleLogin = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username, password: password }),
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('userToken', data.Token);
        await AsyncStorage.setItem('roleName', data.RoleName);
        navigation.navigate('Dashboard');
      } else {
        Alert.alert('Login failed', 'Username or password is incorrect');
      }
    } catch (error) {
      console.error(error);
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
