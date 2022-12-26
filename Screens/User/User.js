import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function User({userid}) {

  const navigation = useNavigation(); 

  return (
    <View style={{justifyContent:'center',flex:1}}>
      <View style={[styles.row,styles.mb5]}>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("Filling",{user_id:userid})}>
          <FontAwesome5 name="fill-drip" size={40} color="white" />
          <Text style={styles.boxText}>Filling</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("UserStations")}>
          <FontAwesome5 name="gas-pump" size={40} color="white" />
          <Text style={styles.boxText}>Gas Stations</Text>
        </TouchableOpacity>
       
      </View>
      <View style={[styles.row,styles.mb5]}>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("GasPrices")}>
          <MaterialCommunityIcons name="fuel" size={45} color="white" />
          <Text style={styles.boxText}>Fuel (Pricing)</Text>
        </TouchableOpacity>
       
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("MyVehicle",{user_id:userid})}>
          <FontAwesome5 name="truck-moving" size={40} color="white" />
          <Text style={styles.boxText}>My Vehicle</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.box}  onPress={() => navigation.navigate("Audit",{user_id:userid,role:'user'})}>
          <AntDesign name="piechart" size={40} color="white" />
          <Text style={styles.boxText}>Audit</Text>
        </TouchableOpacity>
        <View style={styles.box}>
          <FontAwesome5 name="fill-drip" size={40} color="white" />
          <Text style={styles.boxText}>Audit</Text>
        </View>
      </View>
    </View>
  )
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
