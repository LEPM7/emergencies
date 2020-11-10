import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TestComponent from '../components/TestComponent';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Hola" component={TestComponent} />
      <Tab.Screen name="Adios" component={TestComponent} />
    </Tab.Navigator>
  );
}