import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const ProtestDetailScreen = ({ route, navigation }) => {
  const { protestId } = route.params; 
  const [protest, setProtest] = useState(null);

  // fetch protest details 
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
      <Text>{protest.categoryName}</Text>
      <Text>{protest.title}</Text>
      <Text>{protest.description}</Text>
      <Text>{protest.date}</Text>
      <Text>{protest.time}</Text>
      <Text>{protest.estimatedAttendees}</Text>
      <Text>{protest.location}</Text>
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ProtestDetailScreen;