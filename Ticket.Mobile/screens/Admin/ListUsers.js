import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, Button,Alert } from "react-native";
import styles from "../../styles/main";
import axios from "axios";
import primaryURL from "../../config";
import colors from "../../styles/colors";
import { useFocusEffect } from '@react-navigation/native';

const ListUsersScreen = ({ navigation, route }) => {
  const { userId } = route.params; // Receive userId from navigation params
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = `${primaryURL}/api/admin/users`;

   const fetchUsers = useCallback(() => {
    setLoading(true);
    axios
      .get(apiUrl)
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
        setError(error);
        setLoading(false);
      });
  }, [apiUrl]);

  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [fetchUsers])
  );

  const handleEdit = (id) => {
    navigation.navigate('Edit User Admin', { userId: id });
  };
  const handleDelete = (id) => {
    Alert.alert(
      "Delete User",
      "Are you sure you want to delete this user?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            axios
              .delete(`${primaryURL}/api/admin/userDelete/${id}`)
              .then(() => {
                fetchUsers(); // Refetch the users after deletion
              })
              .catch((error) => {
                console.error("There was an error deleting the user!", error);
                setError(error);
              });
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => {
    // Convert userId to number for comparison
    const userIdNumber = parseInt(userId, 10); // Ensure base 10 for integer parsing
    // Check if current user is the authenticated user
    const showDeleteButton = item.id !== userIdNumber;
    return (
      <View style={styles.tableRow}>
        <Text style={styles.tableCellText}>{item.id}</Text>
        <Text style={styles.tableCellText}>{item.name}</Text>
        <Text style={styles.tableCellText}>{item.roleName}</Text>
        <View style={styles.actionCell}>
          <Button
            title="Edit"
            onPress={() => handleEdit(item.id)}
            color={colors.warning}
          />
          {showDeleteButton && (
            <Button
              title="Delete"
              onPress={() => handleDelete(item.id)}
              color={colors.danger}
            />
          )}
        </View>
      </View>
    );
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
        <Text>Error fetching users: {error.message}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>List Users Page</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>ID</Text>
          <Text style={styles.tableHeaderCell}>Name</Text>
          <Text style={styles.tableHeaderCell}>Role Name</Text>
          <Text style={styles.tableHeaderCell}>Action</Text>
        </View>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) =>
            item.id ? item.id.toString() : Math.random().toString()
          }
        />
      </View>
    </View>
  );
};

export default ListUsersScreen;
