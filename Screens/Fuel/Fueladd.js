import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function Fueladd() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0.0);

  const addFuelType = () => {
    if(name != '' && price !=''){
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name:name, price: price}),
        };
        fetch("https://fuel.udarax.me/api/fuel/create", requestOptions)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            resetInput();
            alert(data['message']);
        });
    }else{
        alert('Input fields cannot be empty. Please fill all the details and try again!');
    }
  }

  const resetInput = () => {
    setName("");
    setPrice(0.00);
  }

  return (
    <View style={styles.container}>
      <View style={styles.mb5}>
        <Text>Fuel Type</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          onChangeText={setName}
          value={name}
        />
      </View>
      <View style={styles.mb5}>
        <Text>Price (LKR)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          onChangeText={setPrice}
          value={price}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={addFuelType}>
        <Text style={styles.buttonText}>Add Fuel Type</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex:1
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
