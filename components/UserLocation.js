import React, { useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Location from "expo-location";

export default function UserLocation({ navigation }) {
  const [error, setError] = useState(null);
  const [region, setRegion] = useState({
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0422,
  });

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError(true);
      } else {
        const location = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: region.latitudeDelta,
          longitudeDelta: region.longitudeDelta,
        });
      }
    } catch (e) {
      console.error(e);
      console.log(e);
      setErrorMsg(e.toString());
    }
    setTimeout(() => getLocation(), 5000);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      {!error ? (
        <MapView
          style={styles.mapStyle}
          region={region}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
        >
          <Marker
            key={1}
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title={"Mi Ubicación"}
          />
        </MapView>
      ) : null}
      {!error ? (
        <View
          style={{
            position: "absolute",
            top: "85%",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.roundButton}
            onPress={() =>
              navigation.navigate("UserLocationForm", {
                region,
              })
            }
          >
            <Text style={styles.buttonText}>SOS</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
  roundButton: {
    width: 85,
    height: 85,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "red",
    shadowColor: "#888888",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
