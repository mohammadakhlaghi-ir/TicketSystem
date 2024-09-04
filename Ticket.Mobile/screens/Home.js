import React, { useEffect } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import styles from "../styles/main";
import AsyncStorage from "@react-native-async-storage/async-storage";
const HomeScreen = ({ navigation }) => {
  const checkAuthAndNavigate = async () => {
    const authenticated = await isAuthenticated();
    if (authenticated) {
      navigation.navigate("Dashboard");
    } else {
      navigation.navigate("Login");
    }
  };
  useEffect(() => {
    // Setting header right component when the component mounts
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={checkAuthAndNavigate} title="Go to Dashboard" />
      ),
    });
  }, [navigation]);
  return (
    <ScrollView style={styles.homeStyle}>
      <Text style={styles.homeTitle}>
        Ticket Mobile Project Mohammad Akhlaghi
      </Text>
      <Text>This mobile app used for the Ticket between Admins and Users ,
        the content and summary of the project :</Text>
      <Text style={styles.homeTitle}>
        Roles :
      </Text>
      <Text>
        Roles are craeted by 2 type :
      </Text>
      <Text>
        1. Admin :Admins can manage the categories and manage the users and manage the tickets.
      </Text>
      <Text>
        2. User :Users can manage owner ticket and edit their profile.
      </Text>
      <Text style={styles.homeTitle}>
        Category :
      </Text>
      <Text>
        Categories are created by an ID and a name.Admin can modify or create or delete the categories.
      </Text>
      <Text style={styles.homeTitle}>Ticket :</Text>
      <Text>
        Tickets are created by Users, the messages of the ticket and create by any Admin and user owner of the Ticket.
      </Text>
      <Text>
        The User can send unlimited messages and Close the Ticket. if the ticket be closed , the user or admins can not send any messages for that ticket.
        The Admins Can see the list of tickets and their status , their user owner id and the date or time of messages and tickets.
        The Admins Can Close the ticket or send reply messages for that user message of that ticket.
      </Text>
      <Text style={styles.homeTitle}>
        Users :
      </Text>
      <Text>The users can register or login to the app and can edit their user name or password and can logout of the site any time.</Text>
      <Text>The Admins can modify the users information or change role name of the users to the admin or to the users and can delete any userid.</Text>
      <Text style={styles.homeTitle}>Project Layaers </Text>
      <Text>The project developed by 3 layars:</Text>
      <Text>1- Ticket.Mobile App : This is the main Layer project and included assets ,
        components , navigation , node modules ,screens , styles , config file and app main startup function screipts</Text>
      <Text> 2- Ticket.Entity : This is the entity layer had connection by the Sql server and developed by the EFCore and included Models and Context Class to Configure the models on database.
      </Text>
      <Text> 3-Ticket.Core : This is the all services and interfaces and view models configure and another components for the project.
      </Text>
      <Text style={styles.homeTitle}>Ticket.Mobile App</Text>
      <Text>This is the main Layer project and included assets ,
        components , navigation , node modules ,screens , styles , config file and app main startup function screipts</Text>
      <Text style={styles.homeTitle}>assets : </Text>
      <Text>includes some defaul icons and images.</Text>
      <Text style={styles.homeTitle}>components :</Text>
      <Text>included js class for the some formatting or converting objects</Text>
      <Text style={styles.homeTitle}>navigation :</Text>
      <Text >included main navigation of stacks screens</Text>
      <Text style={styles.homeTitle}>node modules:</Text>
      <Text>included modules of librarires and packages installed.</Text>
      <Text style={styles.homeTitle}>screens :</Text>
      <Text>included screens of accounts for ex login, register , edic account ,dashboard .
        folder admin included  category management , ticket management , user management.
        and last folder , create and show the list tickets for the users.</Text>
      <Text style={styles.homeTitle}>styles :</Text>
      <Text>included styles and colors custom on the application.</Text>
      <Text style={styles.homeTitle}>App.js :</Text>
      <Text>configure the application start.</Text>
      <Text style={styles.homeTitle}>config.js</Text>
      <Text>included host name or ip address of the backend for using api.</Text>
      <Text style={styles.homeTitle}>Ticket.Entity :</Text>
      <Text>
        included Models and Context class .
      </Text>
      <Text>
        Models : User - Ticket - Message - Category
      </Text>
      <Text>
        Context class :
      </Text>
      <Text>
        Define the connection string and direcotiry assemnly of the Textroject database . create an admin account and define the relation and their keys on realtions.
      </Text>
      <Text style={styles.homeTitle}>Ticket.Core :</Text>
      <Text>
        icnluded comTextonents , interfaces , services ,view models , Textermissions.
      </Text>
      <Text>
        ComTextonents : a comTextonent for the Textaging list data for the services.
      </Text>
      <Text>
        DTOs : or view models to define models for aTextText Textroject or interfaces. ( Category , User , Ticket , Messages)
      </Text>
      <Text>
        Interfaces : define methods for imTexteliments on services and using for the controllers.(ITikect , ICategory , IUser)
      </Text>
      <Text>
        Services : using the interfaces and configure the services and using data from context.
      </Text>
      <Text>
        Textermissions : define Textermission and area of the Admin Controller for using role name for access the Textages of admin.
      </Text>
    </ScrollView>
  );
};
const isAuthenticated = async () => {
  const userToken = await AsyncStorage.getItem("userToken");
  return userToken !== null;
};

export default HomeScreen;
