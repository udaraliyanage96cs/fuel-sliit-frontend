import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function Browseredit({ route, navigation }) {

  const { bowserID } = route.params;

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bowserName, setBowserName] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [capacity, setCapacity] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [curentLocation, setCurentLocation] = useState("");

  const updateBowser = () => {
    if (
      name != "" &&
      vehicleNo != "" &&
      capacity != "" &&
      latitude != "" &&
      longitude != "" &&
      bowserName != "" &&
      phone != ""
    ) {
      const location = latitude + ":" + longitude;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          vehicle_no: vehicleNo,
          capacity: capacity,
          location: location,
          bname: bowserName,
          phone: phone,
        }),
      };
      fetch(
        "https://fuel.udarax.me/api/bowser/update/" + bowserID,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data["message"] == "success") {
            alert("Fuel Type successfully Updated!");
          } else {
            alert(data["message"]);
          }
        });
    } else {
      alert(
        "Input fields cannot be empty. Please fill all the details and try again!"
      );
    }
  };

  const fetchData = () => {
    fetch("https://fuel.udarax.me/api/bowser/specific/" + bowserID)
      .then((response) => response.json())
      .then((data) => {
        let res = data["respond"];
        let location = data["respond"]["curent_location"];
        console.log(location);
        let lat = location.split(":")[0];
        let lon = location.split(":")[1];
        setCurentLocation(location);
        setName(res.uname);
        setPhone(res.phone);
        setBowserName(res.name);
        setVehicleNo(res.vehicle_no);
        setCapacity(res.capacity);
        setLatitude(lat);
        setLongitude(lon);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [loading]);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 20,
      }}
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
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
          <Text>Bowser Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setBowserName}
            value={bowserName}
            placeholder="Enter Bowser Name"
          />
        </View>
        <View style={styles.mb5}>
          <Text>Vehicle No</Text>
          <TextInput
            style={styles.input}
            onChangeText={setVehicleNo}
            value={vehicleNo}
            placeholder="Enter Vehicle No"
          />
        </View>
        <View style={styles.mb5}>
          <Text>Capacity</Text>
          <TextInput
            style={styles.input}
            onChangeText={setCapacity}
            value={capacity}
            placeholder="Enter Capacity"
            keyboardType="numeric"
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
        <TouchableOpacity style={styles.button} onPress={updateBowser}>
          <Text style={styles.buttonText}>Update Bowser</Text>
        </TouchableOpacity>
      </ScrollView>
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
