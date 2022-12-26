import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function Fillingqueue({ route, navigation }) {
  const {
    user_id,
    vehicle_id,
    station_id,
    fueltype_id,
    ftype,
    username,
    vehicle,
    no,
    qid,
    stuid
  } = route.params;

  const [qty, setQty] = useState([]);

  const fillFuel = () => {
    if (qty != "" && qty != null) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          qty: qty,
          user_id: user_id,
          vehicle_id: vehicle_id,
          station_id: station_id,
          fueltype_id: fueltype_id,
          qid: qid,
        }),
      };
      fetch("https://fuel.udarax.me/api/audit/create", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data["message"] == "success") {
            Alert.alert(
              "Alert!",
              "Fuel Filled Successfully",
              [
                {
                  text: "Yes",
                  onPress: () => {
                    navigation.navigate("Queue",{
                      user_id:stuid
                    });
                  },
                },
              ],
              { cancelable: false }
            );
          } else {
            alert(data["message"]);
          }
        });
    } else {
      alert("Qty cannot empty!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mb5}>
        <Text>Fuel Type</Text>
        <TextInput style={styles.input} value={ftype} editable={false} />
      </View>
      <View style={styles.mb5}>
        <Text>User Name</Text>
        <TextInput style={styles.input} value={username} editable={false} />
      </View>
      <View style={styles.mb5}>
        <Text>Vehicle Type</Text>
        <TextInput style={styles.input} value={vehicle} editable={false} />
      </View>
      <View style={styles.mb5}>
        <Text>Queue No</Text>
        <TextInput style={styles.input} value={no} editable={false} />
      </View>
      <View style={styles.mb5}>
        <Text>Amount of Leaters</Text>
        <TextInput
          style={styles.input}
          onChangeText={setQty}
          value={qty}
          placeholder="Enter Amount of Leaters"
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={fillFuel}>
        <Text style={styles.buttonText}>Fill Fuel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  mb5: {
    marginBottom: 20,
  },
  input: {
    height: 45,
    marginTop: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#f05a36",
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
  },
});
