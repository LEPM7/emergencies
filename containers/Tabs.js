import React from 'react';

//Utilities
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//Components
import TestComponent from '../components/TestComponent';
import UserLocation from '../components/UserLocation';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Ubicación" component={UserLocation} />
        <Tab.Screen name="Manuales" component={TestComponent} />
      </Tab.Navigator>
  );
}