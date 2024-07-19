import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";
import axios from "axios";
import primaryURL from "../../../config";
import styles from "../../../styles/main";
import colors from "../../../styles/colors";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const ListCategoriesScreen = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchCategories();
  }, [isFocused]);

  const fetchCategories = () => {
    setLoading(true);
    axios
      .get(`${primaryURL}/api/admin/categories`)
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError(error);
        setLoading(false);
      });
  };
  const handleEdit = (categoryId) => {
    navigation.navigate("Edit Category", { categoryId });
  };
  const handleCreate = () => {
    navigation.navigate("Create Category");
  };
  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCellText}>{item.id}</Text>
      <Text style={styles.tableCellText}>{item.name}</Text>
      <Text style={styles.tableCellText}>{item.ticketCount}</Text>
      <View style={styles.actionCell}>
        <Button
          title="Edit"
          onPress={() => handleEdit(item.id)}
          color={colors.warning}
        />
        <Button
          title="Delete"
          onPress={() => handleDelete(item.id)}
          color={colors.danger}
        />
      </View>
    </View>
  );

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
        <Text>Error fetching categories: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>List Categories Page</Text>
        <Text style={styles.m1}> </Text>
        <Button onPress={handleCreate} title="Create Category" />
      </View>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>ID</Text>
          <Text style={styles.tableHeaderCell}>Name</Text>
          <Text style={styles.tableHeaderCell}>Ticket Count</Text>
          <Text style={styles.tableHeaderCell}>Actions</Text>
        </View>
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default ListCategoriesScreen;
