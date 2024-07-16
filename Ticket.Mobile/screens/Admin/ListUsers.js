import React, { useState, useEffect } from "react";
import { View, Text, FlatList,Button } from "react-native";
import styles from "../../styles/main";
import axios from "axios";
import primaryURL from "../../config";
import colors from "../../styles/colors";

const ListUsersScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = `${primaryURL}/api/admin/users`;
  useEffect(() => {
    // Fetch users from the API
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("API Response:", response.data); // Debug log
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
        setError(error);
        setLoading(false);
      });
  }, []);
  const renderItem = ({ item }) => (
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
