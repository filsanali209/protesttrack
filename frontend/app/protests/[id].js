import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import { useRouter, useLocalSearchParams } from 'expo-router';

const ProtestDetailScreen = ({ route, navigation }) => {
  const router = useRouter();
  const { id: protestId } = useLocalSearchParams();
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
      <Button title="Back to Home" onPress={() => router.back()} />
    </View>
  );
};

export default ProtestDetailScreen;