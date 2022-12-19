import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function Vehicleadd({ route }) {
  const { user_id } = route.params;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState();
  const [type, setType] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [capacity, setCapacity] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [loading, setLoading] = useState(true);

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

  const resetInput = () => {
    setValue("");
    setValue2("");
    setVehicleNo("");
    setCapacity("");
  };

  const addVehicle = () => {
    if (value != "" && vehicleNo != "" && capacity != "" && value2 != "") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: value2,
          vehicle_no: vehicleNo,
          capacity: capacity,
          fueltype_id: value,
          id: user_id,
        }),
      };
      fetch("https://fuel.udarax.me/api/user/vehicle/create", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data["message"] == "success") {
            alert("Vehicle successfully created!");
            resetInput();
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
      <TouchableOpacity style={styles.button} onPress={addVehicle}>
        <Text style={styles.buttonText}>Add Vehicle</Text>
      </TouchableOpacity>
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
