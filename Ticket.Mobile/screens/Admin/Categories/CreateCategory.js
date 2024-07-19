import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import primaryURL from "../../../config";
import styles from "../../../styles/main";

const CreateCategoryScreen = ({ navigation }) => {
    const [categoryName, setCategoryName] = useState('');
  
    const handleSubmit = () => {
      if (!categoryName.trim()) {
        Alert.alert('Error', 'Category name is required');
        return;
      }
  
      axios.post(`${primaryURL}/api/admin/create-category`, { categoryName })
        .then(response => {
          Alert.alert('Success', 'Category created successfully');
          navigation.goBack();
        })
        .catch(error => {
          console.error('Error creating category:', error);
          Alert.alert('Error', 'Failed to create category');
        });
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create Category</Text>
        <TextInput
          style={styles.input}
          placeholder="Category Name"
          value={categoryName}
          onChangeText={setCategoryName}
        />
        <Button title="Create" onPress={handleSubmit} />
      </View>
    );
  };
  

export default CreateCategoryScreen;