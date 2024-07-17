import React, { useState } from 'react';
import { View, TextInput, Text, Button, Alert } from 'react-native';
import styles from "../../styles/main";
import { useNavigation } from '@react-navigation/native';
import primaryURL from "../../config";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = `${primaryURL}/api/account/register`;

  const handleRegister = () => {
    // Assuming your API endpoint is hosted locally and running on port 5000
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: username,
        Password: password,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Registration successful, navigate to login screen
      Alert.alert('Success', 'User registered successfully', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'), // Replace 'LoginScreen' with your actual login screen name
        },
      ]);
    })
    .catch(error => {
      console.error('Error:', error);
      Alert.alert('Error', 'Registration failed. Please try again.');
    });
  };

  return (
    <View style={styles.container}>
    <Text style={styles.mb1}>Register Page</Text>
    <TextInput
      placeholder="Username"
      style={styles.input}
      value={username}
      onChangeText={text => setUsername(text)}
    />
    <TextInput
      placeholder="Password"
      secureTextEntry
      style={styles.input}
      value={password}
      onChangeText={text => setPassword(text)}
    />
    <Button
      title="Register"
      onPress={handleRegister}
    />
  </View>
  );
}

export default RegisterScreen;