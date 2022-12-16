import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function Fueledit({ route, navigation }) {
  const { typeID } = route.params;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0.0);
  const [loading, setLoading] = useState(true);

  const updateFuelType = () => {
    if(name != '' && price !=''){
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({name:name, price:price}),
        };
        fetch("https://fuel.udarax.me/api/fuel/update/"+typeID, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if(data['message'] == 'success'){
              alert("Fuel Type successfully Updated!");
          }else{
              alert(data['message']);
          }
        });
    }else{
        alert('Input fields cannot be empty. Please fill all the details and try again!');
    }
  };

  const fetchData = () => {
    fetch("https://fuel.udarax.me/api/fuel/" + typeID)
      .then((response) => response.json())
      .then((data) => {
        const res = data["respond"];
        setName(res["name"]);
        setPrice(res["price"]);
        setLoading(false);
      });
  };

  const deleteFuelType = () => {
    Alert.alert(
      //title
      "Warning!",
      //body
      "Are you sure, Do you really wants to delete this fuel type?",
      [
        {
          text: "Yes",
          onPress: () => {
            fetch("https://fuel.udarax.me/api/fuel/delete/" + typeID)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                navigation.navigate("Fuel");
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

  useEffect(() => {
    fetchData();
  }, [loading]);

  return (
    <View style={styles.container}>
      <View style={styles.mb5}>
        <Text>Fuel Type</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          onChangeText={setName}
          value={name}
        />
      </View>
      <View style={styles.mb5}>
        <Text>Price (LKR)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          onChangeText={setPrice}
          value={price}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={deleteFuelType}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#560cce" }]}
          onPress={updateFuelType}
        >
          <Text style={styles.buttonText}>Update Fuel Type</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
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
