import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles/main';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Login Page</Text>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default LoginScreen;