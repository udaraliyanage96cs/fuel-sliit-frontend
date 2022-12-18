import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function Gasstockadd({route}) {
  const { user_id } = route.params;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState();
  const [qty, setQty] = useState();

  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch("https://fuel.udarax.me/api/fuel/capacity/dropdown")
    .then((response) => response.json())
    .then((data) => {
    setItems(data["respond"]);
    setLoading(false);
    console.log(data["respond"]);
    });
  };

  const resetInput = () => {
    console.log("aaaa");
    setQty("");
    setOpen(false)
    setValue(null);
  }

  const addStocks = () =>{ 
    if(qty != "" && qty != null && value != "" && value != null ){
      console.log(value,qty,user_id);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fid:value,qty:qty,uid:user_id }),
      };
      fetch("https://fuel.udarax.me/api/fuel/capacity/create", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if(data['message'] == 'success'){
            resetInput();
            alert("New Stock successfully created!");
        }else{
            alert(data['message']);
        }
      });
    }else{
      alert('Input fields cannot be empty. Please fill all the details and try again!');
    }
  }

  useEffect(() => {
      fetchData();
  }, [loading]);

  return (
    <View style={styles.container}>
      <View style={styles.mb5}>
        <Text>Fuel Quantity</Text>
        <TextInput
          style={styles.input}
          onChangeText={setQty}
          value={qty}
          placeholder="Enter Amount of Leaters"
          keyboardType="numeric"
        />
      </View>
      {!loading && (<View style={styles.mb5}>
        <Text style={{ marginBottom: 5 }}>Fuel Type</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>)}
      <TouchableOpacity style={styles.button} onPress={addStocks}>
        <Text style={styles.buttonText}>Add Station</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#fff",
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
