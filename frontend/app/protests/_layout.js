import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MapScreen from './Map';
import ListScreen from './List';

const TopTabs = createMaterialTopTabNavigator();

export default function ProtestTopTabs() {
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: 'tomato' },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        swipeEnabled: true,
      }}
    >
      <TopTabs.Screen name="Map" component={MapScreen} />
      <TopTabs.Screen name="List" component={ListScreen} />
    </TopTabs.Navigator>
  );
}