import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    ScrollView,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import MapView, { Marker } from "react-native-maps";
  import { FontAwesome } from "@expo/vector-icons";
  import { FontAwesome5 } from "@expo/vector-icons";
  import { MaterialIcons } from "@expo/vector-icons";
  import { useIsFocused } from "@react-navigation/native";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  
  import { initializeApp } from 'firebase/app';
  import { getDatabase, ref, onValue, set , push ,update   } from 'firebase/database';
  import * as Location from 'expo-location';
  
  export default function BowserUserView({ route, navigation }) {
    const { bowserID, user_id } = route.params;
  
    const firebaseConfig = {
      apiKey: "AIzaSyDxEmKoQCU12aT8CFPUfHrfXVGDOQOMwRw",
      authDomain: "fuel-project-fdc73.firebaseapp.com",
      databaseURL: "https://fuel-project-fdc73-default-rtdb.firebaseio.com",
      projectId: "fuel-project-fdc73",
      storageBucket: "fuel-project-fdc73.appspot.com",
      messagingSenderId: "432462265706",
      appId: "1:432462265706:web:9130f32bc3834e4e8eb913",
      measurementId: "G-Q2RMT4C2S9"
    };
    
    initializeApp(firebaseConfig);
  
    const [loading, setLoading] = useState(true);
    const [bowser, setBowser] = useState([]);
    const isFocused = useIsFocused();
    const [fbLocation, setFBLocation] = useState([]);
    const [mapRegion, setmapRegion] = useState({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  
    const fetchData = () => {
  
      const db = getDatabase();
      const reference = ref(db, 'bowserLocation/'+bowser.id+'/');
  
      fetch("https://fuel.udarax.me/api/bowser/specific/" + bowserID)
        .then((response) => response.json())
        .then((data) => {
          setBowser(data["respond"]);
          let location = data["respond"]["curent_location"];
          console.log(location);
          let lat = parseFloat(location.split(":")[0]);
          let lon = parseFloat(location.split(":")[1]);
  
          setmapRegion({
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          onValue(reference, (snapshot) => {
            let locationDBVal = snapshot.val();
            console.log("aaaaaaaaaa");
            console.log(bowser.id);
            console.log(locationDBVal);
            setFBLocation(locationDBVal);
            if(locationDBVal != null){
              setmapRegion({
                latitude:  locationDBVal.latitudeDelta,
                longitude:  locationDBVal.longitudeDelta,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              });
            }
            setLoading(false);
          });
        });
    };
  
    
  
    useEffect(() => {
      if (isFocused) {
        fetchData();
      }
    }, [loading, isFocused]);
  
    return (
      <View  style={styles.container2}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {!loading && (
            <View>
              <View style={styles.row}>
                <View style={styles.col7}>
                  <View style={[styles.row, styles.center]}>
                    <Text style={styles.title}>{bowser.name}</Text>
                  </View>
                </View>
              </View>
              <MapView style={styles.map} region={mapRegion}>
                <Marker coordinate={mapRegion} title="Marker" />
              </MapView>
              <View>
                <View style={[styles.row, { marginTop: 20 }]}>
                  <View>
                    <FontAwesome5 name="user-secret" size={24} color="black" />
                  </View>
                  <View style={{ marginLeft: 20, justifyContent: "center" }}>
                    <Text style={{ fontSize: 16 }}>{bowser.uname}</Text>
                  </View>
                </View>
                <View style={[styles.row, { marginTop: 20 }]}>
                  <View>
                    <MaterialIcons name="email" size={24} color="black" />
                  </View>
                  <View style={{ marginLeft: 20, justifyContent: "center" }}>
                    <Text style={{ fontSize: 16 }}>{bowser.email}</Text>
                  </View>
                </View>
                <View style={[styles.row, { marginTop: 20 }]}>
                  <View>
                    <FontAwesome name="phone-square" size={24} color="black" />
                  </View>
                  <View style={{ marginLeft: 20, justifyContent: "center" }}>
                    <Text style={{ fontSize: 16 }}>{bowser.phone}</Text>
                  </View>
                </View>
                <View style={[styles.row, { marginTop: 20 }]}>
                  <View>
                    <FontAwesome5 name="truck-moving" size={24} color="black" />
                  </View>
                  <View style={{ marginLeft: 20, justifyContent: "center" }}>
                    <Text style={{ fontSize: 16 }}>{bowser.vehicle_no} ( Vehicle No )</Text>
                  </View>
                </View>
                <View style={[styles.row, { marginTop: 20 }]}>
                  <View>
                    <MaterialCommunityIcons
                      name="diving-scuba-tank"
                      size={24}
                      color="black"
                    />
                  </View>
                  <View style={{ marginLeft: 20, justifyContent: "center" }}>
                    <Text style={{ fontSize: 16 }}>{bowser.capacity} (L)</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
  
          {loading && (
            <View style={styles.container}>
              <Image
                style={styles.tinyLogo}
                source={require("../../assets/gasloading.gif")}
              />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      flex:1
    },
    container2: {
      padding: 20,
      backgroundColor: "#fff",
      flex:1
    },
    row: {
      flexDirection: "row",
    },
    col7: {
      width: "70%",
      justifyContent: "center",
    },
    col3: {
      width: "30%",
      alignItems: "flex-end",
      justifyContent: "center",
    },
    col7only: {
      width: "70%",
    },
    col3only: {
      width: "30%",
    },
    editbox: {
      width: 40,
      height: 40,
      backgroundColor: "#f05a36",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
    },
    map: {
      width: "100%",
      marginTop: 20,
      height: 400,
    },
    online: {
      width: 15,
      height: 15,
      borderRadius: 50,
      backgroundColor: "#0f0",
      marginLeft: 10,
    },
    offline: {
      width: 15,
      height: 15,
      borderRadius: 50,
      backgroundColor: "#f00",
      marginLeft: 10,
    },
    center: {
      alignItems: "center",
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
  });
  