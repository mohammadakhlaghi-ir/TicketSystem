import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "../screens/Home";
import DashboardScreen from "../screens/Dashboard";
import LoginScreen from "../screens/Login";
import ListUsersScreen from "../screens/Admin/ListUsers";

const Stack = createNativeStackNavigator();
const isAuthenticated = async () => {
  const userToken = await AsyncStorage.getItem('userToken');
  return userToken !== null;
};
const MainStackNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      setIsLoggedIn(authenticated);
    };

    checkAuth();
  }, []);

  if (isLoggedIn === null) {
    return null;
  }
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Login"}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ListUsers" component={ListUsersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
