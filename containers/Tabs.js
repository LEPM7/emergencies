import React from "react";

//Utilities
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//Components
import ManualComponent from "../components/ManualComponent";
import LocationStackScreen from "./LocationStackScreen";

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator swipeEnabled={false}>
      <Tab.Screen name="Ubicación" component={LocationStackScreen} />
      <Tab.Screen name="Manuales" component={ManualComponent} />
    </Tab.Navigator>
  );
}
