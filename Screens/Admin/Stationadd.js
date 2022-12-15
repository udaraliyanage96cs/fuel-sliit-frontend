import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

export default function Stationadd() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [stationName, setStationName] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const resetInput = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setStationName("");
    setLongitude("");
    setLatitude("");
  }

  const addStation = () => {
    const location = longitude + ":" + latitude;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name:name, email: email, phone:phone, pwd: password , sname:stationName,location:location  }),
    };
    fetch("https://fuel.udarax.me/api/station/create", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if(data['message'] == 'Station successfully created'){
            alert("Station successfully created!");
            resetInput();
        }else{
            alert(data['message']);
        }
      });
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 20,
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View style={styles.mb5}>
        <Text>User Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Enter Name"
        />
      </View>
      <View style={styles.mb5}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Enter Email"
        />
      </View>
      <View style={styles.mb5}>
        <Text>Contact Number</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPhone}
          value={phone}
          placeholder="Enter Phone Number"
        />
      </View>
      <View style={styles.mb5}>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Enter Password"
        />
      </View>
      <View style={styles.mb5}>
        <Text>Gas Station Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setStationName}
          value={stationName}
          placeholder="Enter Gas Station Name"
        />
      </View>
      <View style={styles.mb5}>
        <Text>Longitute</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLongitude}
          value={longitude}
          placeholder="Enter Longitude"
        />
      </View>
      <View style={styles.mb5}>
        <Text>Latitude</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLatitude}
          value={latitude}
          placeholder="Enter Latitude"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={addStation}>
        <Text style={styles.buttonText}>Add Station</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
    backgroundColor: "#560cce",
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
  },
});
