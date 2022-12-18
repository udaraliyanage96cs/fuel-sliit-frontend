import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

export default function Bowseradd({ route, navigation }) {
  const { user_id } = route.params;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [bowserName, setBowserName] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [capacity, setCapacity] = useState("");

  const resetInput = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setBowserName("");
    setVehicleNo("");
    setCapacity("");
  }

  const addBowser = () => {
    if(name != '' && email !='' && email !='' && phone !='' && password !='' && bowserName !='' && vehicleNo !='' && capacity !=''){
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name:name, email: email, phone:phone, pwd: password , bname:bowserName,vehicle_no:vehicleNo,capacity:capacity,station_user_id:user_id }),
      };
      fetch("https://fuel.udarax.me/api/bowser/create", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if(data['message'] == 'success'){
            alert("Station successfully created!");
            resetInput();
        }else{
            alert(data['message']);
        }
      });
    }else{
      alert('Input fields cannot be empty. Please fill all the details and try again!');
    }
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
        <Text>Bowser Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setBowserName}
          value={bowserName}
          placeholder="Enter Bowser Name"
        />
      </View>
      <View style={styles.mb5}>
        <Text>Vehicle No</Text>
        <TextInput
          style={styles.input}
          onChangeText={setVehicleNo}
          value={vehicleNo}
          placeholder="Enter Vehicle No"
        />
      </View>
      <View style={styles.mb5}>
        <Text>Capacity</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCapacity}
          value={capacity}
          placeholder="Enter Capacity"
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={addBowser}>
        <Text style={styles.buttonText}>Add Bowser</Text>
      </TouchableOpacity>
    </ScrollView>
  )
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