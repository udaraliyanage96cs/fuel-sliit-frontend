import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

export default function Fillingstation({ route, navigation }) {
  const { stationID, user_id } = route.params;
  const [loading, setLoading] = useState(true);
  const [queueData, setQueueData] = useState([]);
  const [queue, setQueue] = useState();
  const isFocused = useIsFocused();

  const joinQueue = () => {
    setLoading(true);
    console.log(user_id, stationID);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user_id,
        station_id: stationID,
        date: new Date().toJSON().slice(0, 10),
      }),
    };
    fetch("https://fuel.udarax.me/api/user/vehicle/joinqueue", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data["respond"] == "success") {
          alert("You added into the queue!");
        } else {
          alert(data["respond"]);
        }
        setLoading(false);
      });
  };
  const leftQueue = () => {
    setLoading(true);
    fetch("https://fuel.udarax.me/api/user/vehicle/leftqueue/" + queueData[3])
      .then((response) => response.json())
      .then((data) => {
        alert(data["message"]);
        setQueueData([]);
        setLoading(false);
      });
  }
  
  const fetchData = () => {
    fetch("https://fuel.udarax.me/api/user/vehicle/joinqueue/" + user_id + "/" + stationID)
      .then((response) => response.json())
      .then((data) => {
        if (data["respond"] != null) {
          setQueueData(Object.values(data["respond"]));
        }
        setQueue(data["queue"]);
        setLoading(false);
        console.log(queueData);
      });
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [loading, isFocused]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={joinQueue}>
        <Text style={styles.buttonText}>Join Into Queue</Text>
      </TouchableOpacity>
      {!loading && (
        <View style={styles.quebox}>
          <Text style={[styles.text, styles.title]}>
            Current Queue {new Date().toJSON().slice(0, 10)}{" "}
          </Text>
          {queueData.length <= 0 && (
            <View>
              <Text style={styles.text}>You have no any Queue Yet</Text>
              <Text style={styles.text}>Queue : {queue}</Text>
            </View>
          )}
          {(queueData.length > 0 && stationID == queueData[4]) &&  (
            <View>
              <Text style={styles.text}>Your Possition : {queueData[2]}</Text>
              <Text style={styles.text}>Queue : {queue}</Text>
              <Text style={styles.text}>Queue Type : {queueData[1]}</Text>
              <Text style={styles.text}>Queue Station : {queueData[0]}</Text>
              <TouchableOpacity style={[styles.button,styles.mt5]} onPress={leftQueue}>
                <Text style={styles.buttonText}>Left Queue</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
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
  mt5: {
    marginTop: 20,
  },
  quebox: {
    backgroundColor: "#00539CFF",
    padding: 20,
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
  title: {
    fontWeight: "700",
    fontSize: 15,
  },
  text: {
    color: "#fff",
  },
});
