import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "../screens/Home";
import DashboardScreen from "../screens/Account/Dashboard";
import LoginScreen from "../screens/Account/Login";
import ListUsersScreen from "../screens/Admin/Users/ListUsers";
import EditUserAdminScreen from "../screens/Admin/Users/EditUser";
import RegisterScreen from "../screens/Account/Register";
import ListCategoriesScreen from "../screens/Admin/Categories/ListCategories";
import EditCategoryScreen from "../screens/Admin/Categories/EditCategory";

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
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="List Users" component={ListUsersScreen} />
        <Stack.Screen name="Edit User Admin" component={EditUserAdminScreen} />
        <Stack.Screen name="List Categories" component={ListCategoriesScreen} />
        <Stack.Screen name="Edit Category" component={EditCategoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
