import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProtestCard = ({ protest }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{protest.title}</Text>
      <Text style={styles.title}>{protest.date}</Text>
      <Text style={styles.title}>{protest.location}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical: 7,
    backgroundColor: 'grey',
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