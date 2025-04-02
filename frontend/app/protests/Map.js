import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const MapTabScreen = () => {
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
    <View style={mapStyles.container}>
      <MapView
        style={mapStyles.map}
        initialRegion={{
          latitude: 51.5074,  
          longitude: -0.1278,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {protests.map(protest => (
          protest.location.latitude && protest.location.longitude && (
            <Marker
              key={protest.id}
              coordinate={{
                latitude: protest.location.latitude,
                longitude: protest.location.longitude,
              }}
              title={protest.title}
              description={protest.location}
            />
          )
        ))}
      </MapView>
    </View>
  );
};

const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});


export default MapTabScreen;