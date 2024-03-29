import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

export default function Admin({ userid,role }) {

  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      <View style={[styles.row,styles.mb5]}>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("Station")}>
          <FontAwesome5 name="gas-pump" size={40} color="white" />
          <Text style={styles.boxText}>Gas Stations</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("Fuel")}>
          <MaterialCommunityIcons name="fuel" size={45} color="white" />
          <Text style={styles.boxText}>Fuel</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("Userslist")}>
          <Entypo name="users" size={40} color="white" />
          <Text style={styles.boxText}>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("Browser",{user_id:-1,role:role})}>
          <FontAwesome5 name="truck-moving" size={40} color="white" />
          <Text style={styles.boxText}>Bowsers</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center'
  },
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
