import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import axios from "axios";
import primaryURL from "../../config";
import styles from "../../styles/main";
import colors from "../../styles/colors";
import { Picker } from '@react-native-picker/picker';

const EditUserAdminScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [roleName, setRoleName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Fetch user details from the API
    axios
      .get(`${primaryURL}/api/admin/users/${userId}`)
      .then((response) => {
        const user = response.data;
        setUserName(user.name);
        setPassword(user.password);
        setRoleName(user.roleName);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the user!", error);
        setError(error);
        setLoading(false);
      });
  }, [userId]);
  const handleSave = () => {
    const updatedUser = {
      id: userId,
      name: userName,
      password: password,
      roleName: roleName,
    };

    axios
      .put(`${primaryURL}/api/admin/update/${userId}`, updatedUser)
      .then((response) => {
        alert("User updated successfully!");
        navigation.goBack(); // Go back to the previous screen
      })
      .catch((error) => {
        console.error("There was an error updating the user!", error);
        setError(error);
      });
  };
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error fetching user: {error.message}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit User</Text>
      <Text>User ID: {userId}</Text>
      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Picker
        selectedValue={roleName}
        style={styles.picker}
        onValueChange={(itemValue) => setRoleName(itemValue)}
      >
        <Picker.Item label="Admin" value="Admin" />
        <Picker.Item label="User" value="User" />
      </Picker>
      <Button title="Save" onPress={handleSave} color={colors.success} />
    </View>
  );
};

export default EditUserAdminScreen;
