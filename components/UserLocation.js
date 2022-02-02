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

import { Emergency } from "../models/emergency";
import { EMERGENCY_STATES } from "../models/emergency_states";
import axios from "axios";

export default function UserLocation() {
  const [error, setError] = useState(null);
  const [region, setRegion] = useState({
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0422,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [tel, setTel] = useState(null);
  const [name, setName] = useState(null);
  const [isEmergencyLoading, setEmergencyLoading] = useState(false);

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
    setTimeout(() => getLocation(), 1000);
  };

  const saveEmergency = async () => {
    if (!(tel && name && (tel.trim() !== "" || name.trim() !== "")))
      return false;
    try {
      const emergency = new Emergency(
        EMERGENCY_STATES.NEW,
        tel,
        region.latitude,
        region.longitude,
        1,
        "",
        name
      );
      setEmergencyLoading(true);
      const saveEmergencyResponse = await axios.post(
        `https://br6cad6dd4.execute-api.us-east-1.amazonaws.com/dev/emergency`,
        emergency
      );
      Alert.alert(
        "Emergencia guardada con éxito, los bomberos llegaran muy pronto"
      );
    } catch (e) {
      Alert.alert("Ocurrió un error al guardar, intenta mas tarde");
      console.error(e);
    }
    setEmergencyLoading(false);
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    setTimeout(() => getLocation(), 1000);
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
            onPress={() => {
              setName(null);
              setTel(null);
              setModalVisible(true);
            }}
          >
            <Text style={styles.buttonText}>SOS</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {/* MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
        }}
      >
        {!isEmergencyLoading ? (
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Nombre:</Text>
              <TextInput
                style={styles.textInputModal}
                onChangeText={(text) => setName(text)}
              />
              <Text style={styles.modalText}>Telefono:</Text>
              <TextInput
                style={styles.textInputModal}
                onChangeText={(text) => {
                  text.replace(/[^0-9]/g, "");
                  setTel(text);
                }}
                keyboardType="numeric"
              />
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: "#009F03",
                  marginTop: 25,
                }}
                onPress={() => saveEmergency()}
              >
                <Text style={styles.textStyle}>Guardar</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#f43131" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Cerrar</Text>
              </TouchableHighlight>
            </View>
          </View>
        ) : (
          <ActivityIndicator size="large" color="#00ff00" />
        )}
      </Modal>
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
    backgroundColor: "orange",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "75%",
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
    width: "55%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
  },
  textInputModal: {
    width: "70%",
    margin: 5,
    borderWidth: 1,
    borderRadius: 20,
    textAlign: "center",
  },
});
