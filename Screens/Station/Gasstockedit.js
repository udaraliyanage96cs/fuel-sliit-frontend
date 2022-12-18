import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import React, { useState, useEffect } from "react";

export default function Gasstockedit({ route, navigation }) {
  const { stockID,user_id } = route.params;

  const [stock, setStock] = useState([]);
  const [qty, setQty] = useState();
  const [loading, setLoading] = useState(true);

  const updatestock = () => {
    if (qty != "" && qty != null) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current_qty: qty }),
      };
      fetch("https://fuel.udarax.me/api/station/stocks/update/" + stockID, requestOptions)
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
      alert("Input fields cannot be empty.");
    }
  };

  const fetchData = () => {
    fetch("https://fuel.udarax.me/api/station/stocks/specific/" + stockID)
      .then((response) => response.json())
      .then((data) => {
        const res = data["respond"][0];
        setStock(res);
        setQty(res["current_qty"]);
        setLoading(false);
        console.log(res);
      });
  };

  const deleteStock = () => {
    Alert.alert(
      //title
      "Warning!",
      //body
      "Are you sure, Do you really wants to delete this Inventory?",
      [
        {
          text: "Yes",
          onPress: () => {
            fetch("https://fuel.udarax.me/api/station/stocks/delete/" + stockID)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                navigation.navigate("GasStock",{user_id:user_id});
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
      {loading && (
        <View>
          <Image
            style={styles.tinyLogo}
            source={require("../../assets/gasloading.gif")}
          />
        </View>
      )}
      {!loading && (
        <View>
          <View style={styles.mb5}>
            <Text>Gas Type</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Qty"
              value={stock.name}
              editable={false}
            />
          </View>
          <View style={styles.mb5}>
            <Text>Initial Oil Volum</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Initial Qty"
              value={stock.ini_qty}
              editable={false}
            />
          </View>
          <View style={styles.mb5}>
            <Text>Stocks Qty</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Qty"
              onChangeText={setQty}
              value={qty}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={deleteStock}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#560cce" }]}
              onPress={updatestock}
            >
              <Text style={styles.buttonText}>Update Stocks</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
