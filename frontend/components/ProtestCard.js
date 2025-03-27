import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProtestCard = ({ protest }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{protest.title}</Text>
      <Text>{protest.date}</Text>
      <Text>{protest.location}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical: 7,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default ProtestCard;