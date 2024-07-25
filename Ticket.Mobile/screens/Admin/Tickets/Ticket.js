import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import primaryURL from "../../../config";
import { formatDate } from "../../../components/dateUtils";
import styles from "../../../styles/main";
import colors from "../../../styles/colors";

const TicketScreen = ({ route }) => {
  const { ticketId } = route.params;
  const [ticketDetails, setTicketDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTicketDetails();
  }, []);

  const fetchTicketDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${primaryURL}/api/admin/tickets/${ticketId}/messages`);
      setTicketDetails(response.data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  if (!ticketDetails) {
    return (
      <View style={styles.container}>
        <Text>No ticket details available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.ticketTitle}>{ticketDetails.TicketTitle}</Text>
      <Text>Status: {ticketDetails.TicketStatus ? "Open" : "Closed"}</Text>
      <Text>Category: {ticketDetails.CategoryName}</Text>
      <FlatList
        data={ticketDetails.Messages}
        keyExtractor={(item) => item.Timestamp.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageContent}>{item.Content}</Text>
            <Text style={styles.messageDetails}>
              {item.UserName} ({item.RoleName}) - {formatDate(item.Timestamp)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default TicketScreen;
