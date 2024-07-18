import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import primaryURL from "../../../config";
import styles from "../../../styles/main";
import { useNavigation } from "@react-navigation/native";

const EditCategoryScreen = ({ route }) => {
  const { categoryId } = route.params;
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  const fetchCategoryDetails = () => {
    setLoading(true);
    axios
      .get(`${primaryURL}/api/admin/categories/${categoryId}`)
      .then((response) => {
        setCategoryName(response.data.categoryName); // Update state with category name
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching category details:", error);
        setError(error);
        setLoading(false);
      });
  };

  const handleUpdateCategory = () => {
    axios
      .put(`${primaryURL}/api/admin/UpdateCategory/${categoryId}`, {
        categoryName,
      })
      .then((response) => {
        Alert.alert("Success", "Category updated successfully", [
          {
            text: "OK",
            onPress: () => {
              navigation.goBack(); // Navigate back to previous screen (List Categories)
            }
          },
        ]);
      })
      .catch((error) => {
        console.error("Error updating category:", error);
        Alert.alert("Error", "Failed to update category. Please try again.");
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
        <Text>Error fetching category details: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Category</Text>
      <TextInput
        style={styles.input}
        value={categoryName}
        onChangeText={(text) => setCategoryName(text)}
        placeholder="Category Name"
      />
      <Button title="Update Category" onPress={handleUpdateCategory} />
    </View>
  );
};

export default EditCategoryScreen;
