import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TestComponent from '../components/TestComponent';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Hola" component={TestComponent} />
        <Tab.Screen name="Adios" component={TestComponent} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}