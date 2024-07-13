import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from '../styles/main';

const DashboardScreen = ({ navigation, isAuthenticated }) => {
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    const fetchRoleName = async () => {
      const storedRoleName = await AsyncStorage.getItem('roleName');
      setRoleName(storedRoleName);
    };

    fetchRoleName();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
      <Text>Role: {roleName}</Text>
    </View>
  );
};

export default DashboardScreen;