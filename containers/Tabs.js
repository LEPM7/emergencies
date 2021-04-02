import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TestComponent from '../components/TestComponent';
import UserLocation from '../components/UserLocation';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Ubicación" component={UserLocation} />
        <Tab.Screen name="Manuales" component={TestComponent} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}