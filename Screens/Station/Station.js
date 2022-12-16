import { StyleSheet, Text, View, TouchableOpacity,FlatList, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useIsFocused } from "@react-navigation/native";

export default function Station({ navigation }) {

    const [loading, setLoading] = useState(true);
    const [stations, setStations] = useState([]);
    const isFocused = useIsFocused();

    const fetchData = () => {
      console.log("run1");
      fetch("https://fuel.udarax.me/api/station/")
      .then((response) => response.json())
      .then((data) =>{
          setStations(data['respond']);
          setLoading(false);
      });
    }
    useEffect(() => {
      if(isFocused){ 
        fetchData();
        console.log("run2");
      }
    }, [loading,isFocused]);

    const Item = ({ item }) => (
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("StationView",{stationID:item.id})}>
            <View style={styles.row}>
                <View style={styles.col70}>
                    <Text style={styles.boxTitle}>{item.name}</Text>
                    <Text style={styles.boxtext}>{item.email}</Text>
                    <Text style={styles.boxtext}>{item.phone}</Text>
                </View>
                <View style={[styles.col30,styles.center]}>
                    <MaterialCommunityIcons name="gas-station" size={50} color="white" />
                </View>
            </View>
         
        </TouchableOpacity>
    )
        
  

    const renderItem = ({ item }) => (
        <Item item={item} />
    );

    function FloatButton() {
        return (
        <TouchableOpacity
            style={[styles.floatButton, styles.center]}
            onPress={() => navigation.navigate("StationAdd")}
        >
            <Entypo name="plus" size={30} color="white" />
        </TouchableOpacity>
        );
    }
    return (
        <View style={styles.container}>
            { loading && (
                <View>
                    <Image style={styles.tinyLogo} source={require("../../assets/gasloading.gif")} />
                </View>
            )}

            { !loading && (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={stations}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    onRefresh = {()=>fetchData()}
                    refreshing = {loading}
                    />
            )}
            
            <FloatButton />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop:20,
    backgroundColor:"#fff",
    justifyContent:'center',
    alignItems:'center'
  },
  tinyLogo:{
    backgroundColor:"#f00",
    justifyContent:'center',
    alignItems:'center'
  },
  row:{
    flexDirection:'row'
  },
  col70:{
    width:"70%"
  },
  col30:{
    width:"30%"
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  floatButton: {
    width: 65,
    height: 65,
    backgroundColor: "#f05a36",
    borderRadius: 100,
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  box:{
    backgroundColor:"#f7c469",
    padding:20,
    borderRadius:15,
    marginBottom:20
  },
  boxTitle:{
    color:"#000",
    fontWeight:'700',
    fontSize:16
  },
  boxtext:{
    color:"#000",
  },
});
