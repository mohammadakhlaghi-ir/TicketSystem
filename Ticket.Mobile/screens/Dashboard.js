import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/main";
import { CommonActions } from "@react-navigation/native";
import colors from "../styles/colors";
const DashboardScreen = ({ navigation, isAuthenticated }) => {
  const [roleName, setRoleName] = useState("");
  const [authenticatedUserId, setAuthenticatedUserId] = useState(null); // State to hold authenticated user ID

  useEffect(() => {
    const fetchRoleAndUserId = async () => {
      const storedRoleName = await AsyncStorage.getItem("roleName");
      setRoleName(storedRoleName);
      // Example: Fetching authenticated user ID
      const storedUserId = await AsyncStorage.getItem("userId");
      setAuthenticatedUserId(storedUserId);
    };
    fetchRoleAndUserId();
  }, []);
  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("roleName");
    await AsyncStorage.removeItem("userId"); // Remove authenticated user ID on logout
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
                onPress={() =>
                  navigation.navigate("List Users", {
                    userId: authenticatedUserId,
                  })
                }
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
      <Button color={colors.warning} onPress={handleLogout} title="Logout" />
    </View>
  );
};

export default DashboardScreen;
