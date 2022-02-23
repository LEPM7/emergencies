import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const LocationStack = createNativeStackNavigator();

import UserLocation from "../components/UserLocation";
import UserLocationForm from "../components/UserLocationForm";

function LocationStackScreen() {
  return (
    <LocationStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <LocationStack.Screen name="UserLocation" component={UserLocation} />
      <LocationStack.Screen
        name="UserLocationForm"
        component={UserLocationForm}
      />
    </LocationStack.Navigator>
  );
}

export default LocationStackScreen;
