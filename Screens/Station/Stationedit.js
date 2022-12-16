import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch
} from "react-native";
import React, { useState, useEffect } from "react";

export default function Stationedit({route,navigation}) {

  const { stationID } = route.params;
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [stationName, setStationName] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [availability, setAvailability] = useState(false);
 
  const fetchData = () => {
    fetch("https://fuel.udarax.me/api/station/"+stationID)
    .then((response) => response.json())
    .then((data) =>{
        const res = data['respond'];
        setName(res['uname']);
        setEmail(res['email']);
        setPhone(res['phone']);
        setStationName(res['name']);
        setLatitude(res['location'].split(':')[0]);
        setLongitude(res['location'].split(':')[1]);
        if(res['availability'] == 'open'){
            setAvailability(true);
        }
        setLoading(false);
    });
  }

  const updateStation = () => {
    if(name != '' && email !=''  && phone !='' && stationName !='' && longitude !='' && latitude !=''){
        const location = latitude + ":" + longitude;
        let avlStatus = 'closed';
        if(availability == true){
            avlStatus = "open";
        }
        console.log(avlStatus);
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({sname:stationName, location:location, availability: avlStatus, name: name, phone:phone  }),
        };
        fetch("https://fuel.udarax.me/api/station/update/"+stationID, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if(data['message'] == 'success'){
              alert("Station successfully Updated!");
          }else{
              alert(data['message']);
          }
        });
    }else{
        alert('Input fields cannot be empty. Please fill all the details and try again!');
    }
  }

  useEffect(()=>{
    fetchData();
  },[loading]);

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
        <Text>Contact Number</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPhone}
          value={phone}
          placeholder="Enter Phone Number"
        />
      </View>
      <View style={styles.mb5}>
        <Text>Gas Station Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setStationName}
          value={stationName}
          placeholder="Enter Gas Station Name"
        />
      </View>
      <View style={styles.mb5}>
        <Text>Latitude</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLatitude}
          value={latitude}
          placeholder="Enter Latitude"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.mb5}>
        <Text>Longitute</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLongitude}
          value={longitude}
          placeholder="Enter Longitude"
          keyboardType="numeric"
        />
      </View>
      <View style={[styles.mb5,styles.row]}>
        <Text>Availability</Text>
        <Switch
          style={{ transform: [{ scaleX: 1 }, { scaleY:1 }] }}
          onValueChange={(value) => setAvailability((value))}
          value={availability}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={updateStation}>
        <Text style={styles.buttonText}>Update Station</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
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
