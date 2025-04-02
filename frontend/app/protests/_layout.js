import { Tabs } from 'expo-router';

export default function ProtestsTabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="Map"
        options={{
          title: 'Map',
        }}
      />
      <Tabs.Screen
        name="List"
        options={{
          title: 'List',
        }}
      />
      <Tabs.Screen
        name="[id]"
        options={{
          href: null, 
        }}
      />
    </Tabs>
  );
}