import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TouchableHighlight, TextInput} from 'react-native';
import * as Location from 'expo-location';

export default function UserLocation() {

  const [error, setError] = useState(null);
  const [region, setRegion] = useState({ latitude: 37.78, longitude: -122.43, latitudeDelta: 0.0922, longitudeDelta: 0.0422});
  const [modalVisible, setModalVisible] = useState(false);
  const [tel, setTel] = useState('');
  const [name, setName] = useState('');

  const getLocation = async () => {
    try {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
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
    }
    catch (e) {
      setErrorMsg(e.toString());
    }
    setTimeout(() => getLocation(), 500);
  }

  useEffect(() => {
    setTimeout(() => getLocation(), 100);
  }, []);

  return (
    <View style={styles.container}>
      {
        !error ?
          (
            <MapView style={styles.mapStyle} region={region}>
              <Marker
                key={1}
                coordinate={({ latitude: region.latitude, longitude: region.longitude })}
                title={'Mi Ubicación'}
              />
            </MapView>
          ) : null
      }
      {
        !error ?
          (<View
            style={{
              position: 'absolute',
              top: '85%',
              alignSelf: 'center'
            }}
          >
            <TouchableOpacity
              activeOpacity={.8}
              style={styles.roundButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.buttonText}>SOS</Text>
            </TouchableOpacity>
          </View>) : null
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Nombre</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray' }}
              onChangeText={text => setName(text)}
            />
            <Text style={styles.modalText}>Telefono</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray'}}
              onChangeText={text => setTel(text)}
            />
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Guardar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: '100%',
    height: '100%',
  },
  roundButton: {
    width: 85,
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 'orange',
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
    marginTop: 22
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});