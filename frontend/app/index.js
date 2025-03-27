import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import HomeScreen from '../screens/HomeScreen';
import ProtestDetailScreen from '../screens/ProtestDetailScreen';

const Tab = createBottomTabNavigator(); 

export default function App() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />

    </Tab.Navigator>
  );
}