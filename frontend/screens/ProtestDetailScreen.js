import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const ProtestDetailScreen = ({ route, navigation }) => {
  const { protestId } = route.params; 
  const [protest, setProtest] = useState(null);

  // Fetch protest details by ID
  useEffect(() => {
    axios.get(`http://localhost:5001/api/protests/${protestId}`)  
      .then(response => {
        setProtest(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [protestId]);

  if (!protest) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>{protest.name}</Text>
      <Text>{protest.description}</Text>
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ProtestDetailScreen;