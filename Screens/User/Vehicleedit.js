import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function Vehicleedit({ route, navigation }) {
  const { vehicleID, user_id } = route.params;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState();
  const [type, setType] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [capacity, setCapacity] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    { label: "Car", value: "Car" },
    { label: "Motorbike", value: "Motorbike" },
    { label: "Bus", value: "Bus" },
    { label: "Van", value: "Van" },
    { label: "Lorry", value: "Lorry" },
    { label: "Three Wheeler", value: "Threewheeler" },
  ]);

  const fetchData = () => {
    fetch("https://fuel.udarax.me/api/fuel/capacity/dropdown")
      .then((response) => response.json())
      .then((data) => {
        setItems(data["respond"]);
        setLoading(false);
      });
  };

  const fetchDataEdit = () => {
    fetch("https://fuel.udarax.me/api/user/vehicle/sp/" + vehicleID)
      .then((response) => response.json())
      .then((data) => {
        let res = data["respond"];
        setValue(res.fueltype_id);
        setVehicleNo(res.vehicle_no);
        setCapacity(res.capacity);
        setValue2(res.type);
        setLoading2(false);
      });
  };

  const deleteVehicle = () => {
    Alert.alert(
      //title
      "Warning!",
      //body
      "Are you sure, Do you really wants to delete this Vehicle?",
      [
        {
          text: "Yes",
          onPress: () => {
            fetch("https://fuel.udarax.me/api/user/vehicle/delete/" + vehicleID)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                navigation.navigate("MyVehicle", { user_id: user_id });
              });
          },
        },
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const updateVehicle = () => {
    console.log(vehicleID);
    if (value != "" && vehicleNo != "" && capacity != "" && value2 != "") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: value2,
          vehicle_no: vehicleNo,
          capacity: capacity,
          fueltype_id: value,
        }),
      };
      fetch(
        "https://fuel.udarax.me/api/user/vehicle/update/ " + vehicleID,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data["message"] == "success") {
            alert("Successfully Updated!");
          } else {
            alert(data["message"]);
          }
        });
    } else {
      alert("Input fields cannot be empty.");
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataEdit();
  }, [loading]);

  return (
    <View style={styles.container}>
      <View style={styles.mb5}>
        <Text style={{ marginBottom: 5 }}>Vehicle Type</Text>
        <DropDownPicker
          open={open2}
          value={value2}
          items={items2}
          setOpen={setOpen2}
          setValue={setValue2}
          setItems={setItems2}
          style={{
            backgroundColor: "#eee",
          }}
        />
      </View>
      <View style={styles.mb5}>
        <Text>Vehicle No</Text>
        <TextInput
          style={styles.input}
          onChangeText={setVehicleNo}
          value={vehicleNo}
          placeholder="Enter Vehicle Number"
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
      {!loading && (
        <View style={styles.mb5}>
          <Text style={{ marginBottom: 5 }}>Fuel Type</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{
              backgroundColor: "#eee",
            }}
          />
        </View>
      )}

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={deleteVehicle}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#560cce" }]}
          onPress={updateVehicle}
        >
          <Text style={styles.buttonText}>Update Vehicle</Text>
        </TouchableOpacity>
      </View>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    width: "48%",
  },
  buttonText: {
    color: "#fff",
  },
});
