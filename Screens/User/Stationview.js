import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React , { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useIsFocused } from "@react-navigation/native";

export default function Stationview({route,navigation}) {
  const { stationID } = route.params;

  const [loading,setLoading] = useState(true);
  const [station,setStation] = useState([]);
  const isFocused = useIsFocused();

  const [mapRegion, setmapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const fetchData = () => {
    fetch("https://fuel.udarax.me/api/station/"+stationID)
    .then((response) => response.json())
    .then((data) =>{
        setStation(data['respond']);
        let location = data['respond']['location'];
        console.log(location);
        let lat = parseFloat(location.split(":")[0]);
        let lon = parseFloat(location.split(":")[1]);

        setmapRegion({
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setLoading(false);
    });
  }

  useEffect(()=>{
    if(isFocused){ 
      fetchData();
    }
  },[loading,isFocused]);


  return (
    <View style={styles.container2}>
      {!loading && (
        <View>
            <View style={styles.row}>
              <View style={styles.col7}>
                <View style={[styles.row,styles.center]}>
                  <Text style={styles.title}>{station.name}</Text>
                  {station.availability == "open" && (<View style={styles.online}></View>)}
                  {station.availability != "open" && (<View style={styles.offline}></View>)}
                </View>
              </View>
            </View>
            <MapView style={styles.map}  region={mapRegion} >
              <Marker coordinate={mapRegion} title='Marker' />
            </MapView>
            <View>
              <View style={[styles.row,{marginTop:20}]}>
                <View ><FontAwesome5 name="user-secret" size={24} color="black" /></View>
                <View style={{marginLeft:20,justifyContent:'center'}}><Text style={{fontSize:16}}>{station.uname}</Text></View>
              </View>
              <View style={[styles.row,{marginTop:20}]}>
                <View ><MaterialIcons name="email" size={24} color="black" /></View>
                <View style={{marginLeft:20,justifyContent:'center'}}><Text style={{fontSize:16}}>{station.email}</Text></View>
              </View>
              <View style={[styles.row,{marginTop:20}]}>
                <View ><FontAwesome name="phone-square" size={24} color="black" /></View>
                <View style={{marginLeft:20,justifyContent:'center'}}><Text style={{fontSize:16}}>{station.phone}</Text></View>
              </View>
            </View>
        </View>
      )}
      
      { loading && (
          <View style={styles.container}>
              <Image style={styles.tinyLogo} source={require("../../assets/gasloading.gif")} />
          </View>
      )}
     
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    backgroundColor:"#fff",
    justifyContent:'center',
    alignItems:'center'
  },
  container2:{
    flex:1,
    padding:20,
    backgroundColor:"#fff",
  },
  row:{
    flexDirection:'row'
  },
  col7:{
    width:"70%",
    justifyContent:'center'
  },
  col3:{
    width:"30%",
    alignItems:'flex-end',
    justifyContent:'center'
  },
  col7only:{
    width:"70%",
  },
  col3only:{
    width:"30%",
  },
  editbox:{
    width:40,
    height:40,
    backgroundColor:"#f05a36",
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center'
  },
  title:{
    fontSize:20,
    fontWeight:"700",
  },
  map: {
    width: '100%',
    marginTop:20,
    height: 400,
  },
  online:{
    width:15,
    height:15,
    borderRadius:50,
    backgroundColor:"#0f0",
    marginLeft:10
  },
  offline:{
    width:15,
    height:15,
    borderRadius:50,
    backgroundColor:"#f00",
    marginLeft:10
  },
  center:{
    alignItems:'center',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#f05a36",
    marginTop: 20,
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
  },
})