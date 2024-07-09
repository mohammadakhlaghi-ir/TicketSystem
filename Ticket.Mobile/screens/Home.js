import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles/main';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <Button title="Go to Dashboard" onPress={() => navigation.navigate('Dashboard')} />
    </View>
  );
};

export default HomeScreen;