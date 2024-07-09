import React, { useEffect } from "react";
import { View, Text, Button } from 'react-native';
import styles from '../styles/main';

const DashboardScreen = ({ navigation, isAuthenticated }) => {
  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate("Login");
    }
  }, [isAuthenticated]);
  return (
    <View style={styles.container}>
      <Text>Dashboard Page</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default DashboardScreen;