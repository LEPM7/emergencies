import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, FlatList, Text, Alert, Modal, Pressable } from 'react-native';

import PDFReader from 'rn-pdf-reader-js'

export default function ManualComponent() {

  const [source, setSource] = useState('https://emergency-bucket.s3.amazonaws.com/ManualdeRCP.pdf');
  const [modalVisible, setModalVisible] = useState(false);

  const Item = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
          setModalVisible(true);
          setSource(item.source);
        }}
      >
        <Text style={styles.textStyle}>PDF</Text>
      </Pressable>
    </View>
  );

  const DATA = [
    {
      source: 'https://emergency-bucket.s3.amazonaws.com/ManualdeRCP.pdf',
      name: 'Manual RCP',
    },
    {
      source: 'https://emergency-bucket.s3.amazonaws.com/ManualHemorragias.pdf',
      name: 'Hemorragias',
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={Item}
        keyExtractor={item => item.name} />
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <PDFReader
        style={styles.pdf}
        useGoogleReader={true}
        source={{
          uri: source,
        }}
      />
      </Modal>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
  },
  pdf: {
    flex: 3,
    width: windowWidth,
    height: windowHeight
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
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '25%',
    margin: 5
  },
  buttonOpen: {
    backgroundColor: "#912727",
  },
  buttonClose: {
    backgroundColor: "#912727",
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

