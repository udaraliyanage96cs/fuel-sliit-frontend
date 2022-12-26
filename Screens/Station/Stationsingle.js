import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export default function Stationsingle({userid}) {

  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [queue, setQueue] = useState([]);
  const isFocused = useIsFocused();

  const fetchData = () => {
    fetch("https://fuel.udarax.me/api/station/queue/count/" + userid)
      .then((response) => response.json())
      .then((data) => {
        console.log(data["respond"]);
        if (data["respond"] == "error") {
          setQueue([]);
        } else {
          setQueue(data["respond"]);
        }
        setLoading(false);
      });
  }

  useEffect(() => {
    if(isFocused){ 
      fetchData();
    }
  }, [loading,isFocused]);

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.mb5]}>
        <TouchableOpacity
          style={[styles.box,styles.boxfull,styles.row]}
          onPress={() => navigation.navigate("Queue",{user_id:userid})}
        >
          <View style={[styles.col4,{justifyContent:'center'}]}>
            <MaterialCommunityIcons name="human-queue" size={45} color="white" />
            <Text style={styles.boxText}>Queue {new Date().toJSON().slice(0, 10)}</Text>
          </View>
          <View style={styles.col6}>
            <Text style={styles.quetext}>{queue}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.row, styles.mb5]}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("GasPrices")}
        >
          <FontAwesome5 name="gas-pump" size={40} color="white" />
          <Text style={styles.boxText}>Gas Pricing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("GasStock",{user_id:userid})}
        >
          <MaterialCommunityIcons name="fuel" size={45} color="white" />
          <Text style={styles.boxText}>Gas Stocks</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.row, styles.mb5]}>
        <TouchableOpacity style={styles.box}  onPress={() => navigation.navigate("Browser",{user_id:userid})}>
          <FontAwesome5 name="truck-moving" size={40} color="white" />
          <Text style={styles.boxText}>Bowsers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}  onPress={() => navigation.navigate("Audit",{user_id:userid,role:'station'})}>
          <Foundation name="graph-pie" size={40} color="white" />
          <Text style={styles.boxText}>Audits</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding:20
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mb5: {
    marginBottom: 20,
  },
  box: {
    backgroundColor: "#f05a36",
    width: "47%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    
  },
  boxfull:{
    width:"100%",
    backgroundColor: "#00539CFF",
    padding:20
  },
  boxText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },
  col4:{
    width:"40%",
  },
  col6:{
    width:"60%",
  },
  quetext:{
    color:"#fff",
    fontSize:70,
    textAlign:'right'
  }
});
