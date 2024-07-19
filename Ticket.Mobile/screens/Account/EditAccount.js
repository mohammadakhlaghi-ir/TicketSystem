import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/main";
import primaryURL from "../../config";

const EditAccountScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null);
  const apiUrl = `${primaryURL}/api/account/update`;
  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      setUserId(storedUserId);
      if (storedUserId) {
        fetchUserDetails(storedUserId);
      }
    };
    const fetchUserDetails = async (userId) => {
      try {
        const response = await fetch(`${primaryURL}/api/admin/users/${userId}`);
        if (response.ok) {
          const user = await response.json();
          setName(user.name);
          setPassword(user.password);
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserId();
  }, []);
  const handleUpdate = async () => {
    if (!userId) {
      Alert.alert("Error", "User ID not found");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      if (response.ok) {
        Alert.alert("Success", "Account updated successfully");
        navigation.navigate("Dashboard");
      } else {
        const errorData = await response.json();
        console.log("Error response:", errorData);
        Alert.alert(
          "Update failed",
          "An error occurred while updating the account"
        );
      }
    } catch (error) {
      console.error("Error during update request:", error);
      Alert.alert("Update failed", "An error occurred");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mb1}>Edit Account</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
};

export default EditAccountScreen;
