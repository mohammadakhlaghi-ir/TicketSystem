import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "../screens/Home";
import DashboardScreen from "../screens/Dashboard";
import LoginScreen from "../screens/Login";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    checkAuthentication(); // Check authentication status on app load
  }, []);
  const checkAuthentication = async () => {
    try {
      // Example: Check if user is authenticated (e.g., check for token in AsyncStorage)
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token); // Set authentication state based on token existence
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  };
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Dashboard">
          {props => <DashboardScreen {...props} isAuthenticated={isAuthenticated} />}
        </Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
