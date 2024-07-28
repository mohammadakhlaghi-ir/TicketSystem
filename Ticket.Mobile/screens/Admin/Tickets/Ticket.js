import React, { useEffect, useState, useCallback } from "react";
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
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";

const TicketScreen = ({ route, navigation  }) => {
  const { ticketId } = route.params;
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFooter, setShowFooter] = useState(true); // State to control footer visibility

  const fetchTicketDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${primaryURL}/api/admin/tickets/${ticketId}/messages`
      );
      setTicket(response.data);
      if (response.data.status === false) {
        setShowFooter(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTicketDetails();
    }, [ticketId])
  );

  const handleCloseTicket = async () => {
    try {
      await axios.put(`${primaryURL}/api/admin/CloseTicket/${ticketId}`);
      setTicket((prevTicket) => ({
        ...prevTicket,
        status: false,
      }));
      setShowFooter(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={fetchTicketDetails} style={styles.headerButton}>
        <Text style={styles.reloadText}>Refresh</Text>
        <Icon name="refresh" size={24} color={colors.primary} />
      </TouchableOpacity>
      ),
    });
  }, [navigation, fetchTicketDetails]);

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
      <ScrollView style={styles.ticketScroll}>
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
                message.roleName === "Admin" && styles.adminMessage,
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
      {showFooter && (
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
              onPress={handleCloseTicket}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default TicketScreen;