import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

export default function Admin({ userid }) {

  const navigation = useNavigation(); 

  return (
    <View>
      <View style={[styles.row,styles.mb5]}>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("Station")}>
          <FontAwesome5 name="gas-pump" size={40} color="white" />
          <Text style={styles.boxText}>Gas Stations</Text>
        </TouchableOpacity>
        <View style={styles.box}>
          <MaterialCommunityIcons name="fuel" size={45} color="white" />
          <Text style={styles.boxText}>Fuel</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.box}>
          <Entypo name="users" size={40} color="white" />
          <Text style={styles.boxText}>Users</Text>
        </View>
        <View style={styles.box}>
          <FontAwesome5 name="truck-moving" size={40} color="white" />
          <Text style={styles.boxText}>Bowsers</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  mb5:{
    marginBottom:20
  },
  box: {
    backgroundColor: "#f05a36",
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  boxText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },
});
