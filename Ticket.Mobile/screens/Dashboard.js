import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from '../styles/main';

const DashboardScreen = ({ navigation, isAuthenticated }) => {
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    const fetchRoleName = async () => {
      const storedRoleName = await AsyncStorage.getItem("roleName");
      if (storedRoleName) {
        setRoleName(storedRoleName);
      }
    };
    fetchRoleName();
  }, []);
  return (
    <View style={styles.container}>
    <Text style={styles.label}>Dashboard</Text>
    {roleName ? (
      <Text style={styles.roleName}>Role: {roleName}</Text>
    ) : (
      <Text>Loading...</Text>
    )}
  </View>
  );
};

export default DashboardScreen;