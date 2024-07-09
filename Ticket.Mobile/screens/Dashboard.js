import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles/main';

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Dashboard Page</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default DashboardScreen;