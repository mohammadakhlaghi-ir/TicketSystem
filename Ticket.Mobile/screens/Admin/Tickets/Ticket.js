import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import axios from "axios";
import primaryURL from "../../../config";
import { formatDate } from "../../../components/dateUtils";
import colors from "../../../styles/colors";
import styles from "../../../styles/main";
const TicketScreen = ({ route }) => {
  const { ticketId } = route.params;
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await axios.get(
          `${primaryURL}/api/admin/tickets/${ticketId}/messages`
        );
        setTicket(response.data);
      } catch (error) {
        console.error(error);
        // Handle error if needed
      } finally {
        setIsLoading(false);
      }
    };

    fetchTicketDetails();
  }, [ticketId]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!ticket) {
    return (
      <View style={styles.container}>
        <Text>No ticket data available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.ticketContainer}>
      <View style={styles.ticketHeader}>
        <Text style={styles.ticketTitle}>{ticket.title}</Text>
        <Text style={styles.ticketCategory}>
          Category: {ticket.categoryName}
        </Text>
      </View>
      <View style={styles.messagesContainer}>
        {ticket.messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.message,
              message.roleName === "Admin" && styles.adminMessage, // Apply conditional style
            ]}
          >
            <Text style={styles.messageContent}>{message.content}</Text>
            <Text style={styles.messageTimestamp}>
              {formatDate(message.timestamp)}
            </Text>
            <Text style={styles.messageUser}>
              {message.userName} ({message.roleName})
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default TicketScreen;
