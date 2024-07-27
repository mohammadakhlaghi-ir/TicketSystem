import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import primaryURL from "../../../config";
import { formatDate } from "../../../components/dateUtils";
import colors from "../../../styles/colors";
import styles from "../../../styles/main";

const TicketScreen = ({ route }) => {
  const { ticketId } = route.params;
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFooter, setShowFooter] = useState(true); // State to control footer visibility

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

  const handleCloseTicket = async () => {
    try {
      await axios.put(`${primaryURL}/api/admin/CloseTicket/${ticketId}`);
      // Update ticket status locally
      setTicket((prevTicket) => ({
        ...prevTicket,
        status: false,
      }));
      setShowFooter(false); // Hide the footer after closing ticket
    } catch (error) {
      console.error(error);
      // Handle error if needed
    }
  };
  
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
    <View style={styles.ticketContainer}>
      <ScrollView >
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
      {showFooter && ( // Conditional rendering based on showFooter state
      <View style={styles.footer}>
        <TextInput
          style={styles.textarea}
          multiline
          placeholder="Type your message here..."
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonPrimary}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonDanger, styles.mt1]}
            onPress={handleCloseTicket} // Call handleCloseTicket on button press
          >
            <Text style={styles.buttonText }>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
       )}
    </View>
  );
};

export default TicketScreen;
