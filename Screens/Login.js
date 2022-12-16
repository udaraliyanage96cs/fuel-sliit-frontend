import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { FancyAlert } from "react-native-expo-fancy-alerts";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("admin@gt.com");
  const [password, setPassword] = useState("123");
  const [visible, setVisible] = React.useState(false);

  const signIn = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };
    fetch("https://fuel.udarax.me/api/user/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data["status"] == "success") {
          navigation.navigate("Dashboard", {
            user_id: data["user"],
            role:data["role"],
          });
        }else{
          setVisible(true);
          alert("Login Faild. Please check your email and password!");
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
      <TouchableOpacity style={[styles.button,{backgroundColor:"#f05a36"}]} onPress={signIn}>
        <Text style={styles.buttonText}>Don’t have an account? Sign up</Text>
      </TouchableOpacity>
      {/* <FancyAlert
        visible={visible}
        icon={
          <View
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
              borderRadius: 50,
              width: "100%",
            }}
          >
            <Text>🤓</Text>
          </View>
        }
        style={{ backgroundColor: "white" }}
      >
        <Text style={{ marginTop: -16, marginBottom: 32 }}>Hello there</Text>
      </FancyAlert> */}
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
