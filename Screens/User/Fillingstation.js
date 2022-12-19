import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function Fillingstation({ route, navigation }) {

  const { stationID, user_id } = route.params;

  const joinQueue = () => {
    console.log(user_id,stationID);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user_id,
        station_id: stationID,
        date: new Date().toJSON().slice(0, 10),
      }),
    };
    fetch("https://fuel.udarax.me/api/user/vehicle/joinqueue", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data["respond"] == "success") {
          alert("You added into the queue!");
        } else {
          alert(data["respond"]);
        }
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}  onPress={joinQueue}> 
        <Text style={styles.buttonText}>Join Into Queue</Text>
      </TouchableOpacity>
    </View>
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
