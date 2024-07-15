import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/main";
import { CommonActions } from "@react-navigation/native";

const DashboardScreen = ({ navigation, isAuthenticated }) => {
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    const fetchRoleName = async () => {
      const storedRoleName = await AsyncStorage.getItem("roleName");
      setRoleName(storedRoleName);
    };

    fetchRoleName();
  }, []);
  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("roleName");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  };
  const renderButtons = () => {
    if (roleName === "Admin") {
      return (
        <>
          <View style={styles.row}>
            <View style={styles.buttonContainer}>
              <Button
                title="List Users"
                onPress={() => navigation.navigate("ListUsers")}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="List Tickets"
                onPress={() => navigation.navigate("ListTickets")}
              />
            </View>
          </View>
        </>
      );
    } else {
      return (
        <>
          <View style={styles.row}>
            <View style={styles.buttonContainer}>
              <Button
                title="Create Ticket"
                onPress={() => navigation.navigate("CreateTicket")}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Edit Account"
                onPress={() => navigation.navigate("EditAccount")}
              />
            </View>
          </View>
        </>
      );
    }
  };
  return (
    <View style={styles.container}>
      <Text>Hi {roleName} !</Text>
      {renderButtons()}
      <TouchableOpacity style={styles.btnWarning} onPress={handleLogout}>
        <Text style={styles.textBtn}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardScreen;
