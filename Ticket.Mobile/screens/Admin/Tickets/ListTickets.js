import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import styles from "../../../styles/main";
import primaryURL from "../../../config";
import { formatDate } from "../../../components/dateUtils";
import colors from "../../../styles/colors";

const ListTicketsScreen = ({navigation}) => {
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;
  useEffect(() => {
    fetchTickets(page);
  }, [page]);
  const fetchTickets = async (page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${primaryURL}/api/admin/list-tickets?page=${page}&pageSize=${pageSize}`
      );
      setTickets(response.data.items);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };
  const handleCloseTicket = async (ticketId) => {
    try {
      await axios.put(`${primaryURL}/api/admin/CloseTicket/${ticketId}`);
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.ticketId === ticketId ? { ...ticket, status: false } : ticket
        )
      );
      Alert.alert("Success", "The ticket has been closed.");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while closing the ticket.");
    }
  };
  const renderTicket = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCellText}>{item.ticketId}</Text>
      <Text style={styles.tableCellText}>{item.ticketTitle}</Text>
      <Text style={styles.tableCellText}>
        {item.status ? "Open" : "Closed"}
      </Text>
      <Text style={styles.tableCellText}>{item.userId}</Text>
      <Text style={styles.tableCellText}>
        {formatDate(item.lastMessageTimestamp)}
      </Text>
      <Text style={styles.tableCellText}>{item.categoryName}</Text>
      <View style={styles.actionCell}>
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() =>
            navigation.navigate("Ticket", { ticketId: item.ticketId })
          } // Pass ticketId to TicketScreen
        >
          <Text style={styles.buttonText}>Open</Text>
        </TouchableOpacity>
        {item.status && ( // Conditionally render the "Close" button
          <TouchableOpacity
            style={styles.buttonDanger}
            onPress={() => handleCloseTicket(item.ticketId)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
  const renderFooter = () => {
    if (!isLoading) return null;
    return <ActivityIndicator size="large" color={colors.primary} />;
  };

  const handleNextPage = () => {
    if (page * pageSize < totalCount) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>ID</Text>
          <Text style={styles.tableHeaderCell}>Title</Text>
          <Text style={styles.tableHeaderCell}>Status</Text>
          <Text style={styles.tableHeaderCell}>User ID</Text>
          <Text style={styles.tableHeaderCell}>Date</Text>
          <Text style={styles.tableHeaderCell}>Category</Text>
          <Text style={styles.tableHeaderCell}>Actions</Text>
        </View>
        <FlatList
          data={tickets}
          renderItem={renderTicket}
          keyExtractor={(item) => item.ticketId.toString()}
          ListFooterComponent={renderFooter}
        />
      </View>
      <View style={styles.pagination}>
        <Button
          title="Previous"
          onPress={handlePreviousPage}
          disabled={page === 1}
        />
        <Text style={styles.pageNumber}>Page {page}</Text>
        <Button
          title="Next"
          onPress={handleNextPage}
          disabled={page * pageSize >= totalCount}
        />
      </View>
    </View>
  );
};

export default ListTicketsScreen;
