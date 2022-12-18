import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert
} from "react-native";
import React, { useState } from "react";

export default function Registeruser({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const redirectPopup = () => {
    Alert.alert(
        "Alert!",
        "Account Successfully Created! Please Login",
        [
          {
            text: "Yes",
            onPress: () => {
                navigation.navigate("Login");
            },
          },
        ],
        { cancelable: false }
      );
  }
  const signup = () => {
    console.log(name,email,phone,password);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        pwd: password,
      }),
    };
    fetch("https://fuel.udarax.me/api/user/create", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data["message"] == "success") {
            redirectPopup();
        } else {
          alert(data["message"]);
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containersub}>
        <Image style={styles.tinyLogo} source={require("../assets/logo.png")} />
      </View>
      <Text style={styles.title}>Gas Tracker</Text>
      <Text style={styles.subtitle}>
        The easiest way to manage fuel distribution in your area.
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Enter name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPhone}
        value={phone}
        placeholder="Enter Phone"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter Password"
      />
      <TouchableOpacity style={styles.button} onPress={signup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#f05a36" }]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Already have an account ? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  containersub: {
    alignItems: "center",
  },
  tinyLogo: {
    width: 100,
    height: 120,
  },
  title: {
    marginTop: 20,
    fontWeight: "700",
    fontSize: 30,
    color: "#560cce",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  input: {
    height: 45,
    marginHorizontal: 12,
    marginTop: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#560cce",
    marginHorizontal: 12,
    marginTop: 20,
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
  },
});
