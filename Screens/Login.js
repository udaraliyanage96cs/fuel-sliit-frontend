import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    //navigation.navigate("Dashboard");
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password})
    };
    fetch('http://192.168.8.100:8000/api/user/login', requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data);
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
        onChangeText={setEmail}
        value={email}
        placeholder="Enter Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter Password"
      />
      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={styles.buttonText}>Don’t have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
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
