import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ProtestCard from '../components/ProtestCard';

const HomeScreen = ({ navigation }) => {
  const [protests, setProtests] = useState([]);

  // Fetch protests data from the API
  useEffect(() => {
    axios.get('http://localhost:5001/api/protests')  // Replace with your actual API URL
      .then(response => {
        setProtests(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View>
      <Text>Protest List</Text>
      <FlatList
        data={protests}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProtestDetails', { protestId: item.id })}
          >
            <ProtestCard protest={item} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default HomeScreen;