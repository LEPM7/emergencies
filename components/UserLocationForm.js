import React, { useReducer } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Emergency } from "../models/emergency";
import { EMERGENCY_STATES } from "../models/emergency_states";
import axios from "axios";
import { color } from "react-native-reanimated";

const initialState = {
  name: "",
  tel: "",
  selectedType: "ACCIDENTE_DE_MOTO",
  types: {
    ACCIDENTE_DE_MOTO: "Accidente de Moto",
    ACCIDENTE_DE_CARRO: "Accidente de Carro",
    ACCIDENTE_LABORAL: "Accidente Laboral",
    HERIDA_PUNZO_CORTANTE: "Herida punzo cortante",
    MATERNIDAD: "Maternidad",
    DOLOR_ABDOMINAL: "Dolor Abdominal",
    HERIDA_BALA: "Herida de Bala",
    INCENDIO: "Incendio",
    OTROS: "Otros",
  },
  other: null,
  comments: "",
  status: "idle",
};

function reducer(state, action) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.name };
    case "tel":
      return { ...state, tel: action.tel };
    case "comments":
      return { ...state, comments: action.comments };
    case "type":
      return {
        ...state,
        selectedType: action.selectedType,
        other: action.selectedType !== "OTROS" ? null : "OTRO",
      };
    case "other":
      return {
        ...state,
        other: action.other,
      };
    case "status":
      return {
        ...state,
        status: action.status,
      };
    default:
      throw new Error();
  }
}

function UserLocationForm({ route, navigation }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, name, tel, selectedType, comments, other } = state;
  const { region } = route.params;

  const saveEmergency = async () => {
    if (!(tel && name && (tel.trim() !== "" || name.trim() !== ""))) {
      Alert.alert("Ingrese un nombre y un telefono válido");
      return false;
    }
    dispatch({
      type: "status",
      status: "loading",
    });
    try {
      const emergency = new Emergency(
        EMERGENCY_STATES.NEW,
        tel,
        region.latitude,
        region.longitude,
        1,
        "",
        name,
        selectedType,
        comments,
        other
      );
      const saveEmergencyResponse = await axios.post(
        `https://br6cad6dd4.execute-api.us-east-1.amazonaws.com/dev/emergency`,
        emergency
      );
      Alert.alert(
        "Emergencia guardada con éxito, \nlos bomberos llegaran pronto"
      );
      dispatch({
        type: "status",
        status: "idle",
      });
      navigation.goBack();
    } catch (e) {
      Alert.alert("Ocurrió un error al guardar, intenta mas tarde");
      dispatch({
        type: "status",
        status: "idle",
      });
      console.error(e);
    }
  };

  return (
    <View style={{ width: "100%", height: "100%" }}>
      {status === "idle" ? (
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              <Text style={{ color: "red" }}>*</Text>Nombre:
            </Text>
            <TextInput
              style={styles.textInputModal}
              onChangeText={(text) =>
                dispatch({
                  type: "name",
                  name: text,
                })
              }
            />
            <View style={{ margin: 2 }} />
            <Text style={styles.modalText}>
              <Text style={{ color: "red" }}>*</Text>Telefono:
            </Text>
            <TextInput
              style={styles.textInputModal}
              onChangeText={(text) => {
                text.replace(/[^0-9]/g, "");
                dispatch({
                  type: "tel",
                  tel: text,
                });
              }}
              keyboardType="numeric"
            />
            <View style={{ margin: 2 }} />
            <Text style={styles.modalText}>Tipo de Emergencia:</Text>
            <Picker
              selectedValue={state.selectedType}
              style={styles.pickerInputModal}
              onValueChange={(itemValue) =>
                dispatch({
                  type: "type",
                  selectedType: itemValue,
                })
              }
            >
              {Object.keys(state.types).map((key) => (
                <Picker.Item label={state.types[key]} value={key} key={key} />
              ))}
            </Picker>
            {state.selectedType === "OTROS" ? (
              <>
                <Text style={styles.modalText}>Otro:</Text>
                <TextInput
                  style={styles.textInputModal}
                  onChangeText={(text) =>
                    dispatch({
                      type: "other",
                      other: text,
                    })
                  }
                />
              </>
            ) : null}

            <Text style={styles.modalText}>Comentarios Adicionales:</Text>
            <TextInput
              style={styles.textInputModal}
              multiline={true}
              numberOfLines={4}
              onChangeText={(text) =>
                dispatch({
                  type: "comments",
                  comments: text,
                })
              }
            />
            <View style={{ margin: 2 }} />
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
                navigation.goBack();
              }}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </TouchableHighlight>
          </View>
        </View>
      ) : (
        <ActivityIndicator size="large" color="#00ff00" />
      )}
    </View>
  );
}

export default UserLocationForm;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
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
    width: "85%",
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
    fontWeight: "bold",
  },
  textInputModal: {
    width: "70%",
    margin: 5,
    borderWidth: 1,
    borderRadius: 20,
    textAlign: "center",
  },
  pickerInputModal: {
    width: "100%",
    textAlign: "center",
    height: 40,
  },
});
