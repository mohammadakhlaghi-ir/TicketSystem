import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from '../styles/main';
import { CommonActions } from '@react-navigation/native';

const DashboardScreen = ({ navigation, isAuthenticated }) => {
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    const fetchRoleName = async () => {
      const storedRoleName = await AsyncStorage.getItem('roleName');
      setRoleName(storedRoleName);
    };

    fetchRoleName();
  }, []);
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('roleName');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };
  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
      <Text>Hi {roleName} !</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default DashboardScreen;