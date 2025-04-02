import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';


const ListTabScreen = ({ navigation }) => {
  const router = useRouter();
  const [protests, setProtests] = useState([]);

  
  useEffect(() => {
    axios.get('http://localhost:5001/api/protests')  
      .then(response => {
        setProtests(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View style={listStyles.container}>
      <FlatList
        data={protests}
        renderItem={({ item }) => (
          <TouchableOpacity
          
          onPress={() => router.push(`/protests/${item.id}`)}
            style={listStyles.protestItem}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const listStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  protestItem: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default ListTabScreen;