import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/main";
import primaryURL from "../../config";
import { Picker } from "@react-native-picker/picker";

const CreateTicketScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${primaryURL}/api/admin/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        Alert.alert("Error", "Failed to load categories");
      }
    };

    fetchCategories();
  }, []);
  const handleCreateTicket = async () => {
    const userId = await AsyncStorage.getItem("userId");

    if (!title || !selectedCategory || !message) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    const apiUrl = `${primaryURL}/api/user/createTicket`;
    const requestBody = {
      title,
      messageContent: message,
      categoryId: selectedCategory,
      userId: parseInt(userId), 
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        Alert.alert("Success", "Ticket created successfully");
        navigation.navigate("Dashboard");
      } else {
        const errorData = await response.json();
        console.log("Error response:", errorData);
        Alert.alert("Error", "Failed to create ticket");
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      Alert.alert("Error", "An error occurred while creating the ticket");
    }
  };
  return (
    <ScrollView contentContainerStyle={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
      <Text style={styles.mb1}>Create Ticket</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Select Category" value="" />
        {categories.map((category) => (
          <Picker.Item key={category.id} label={category.name} value={category.id} />
        ))}
      </Picker>
      <TextInput
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        style={[styles.input, { height: 100 }]}
        multiline
      />
      <Button title="Create Ticket" onPress={handleCreateTicket} />
    </ScrollView>
  );
};

export default CreateTicketScreen;
