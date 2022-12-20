import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Fillig({ route }) {
  const { user_id } = route.params;

  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [stations, setStations] = useState([]);
  const isFocused = useIsFocused();

  const [queueData, setQueueData] = useState([]);
  const [queue, setQueue] = useState();

  const fetchData = () => {
    fetch("https://fuel.udarax.me/api/station/")
      .then((response) => response.json())
      .then((data) => {
        setStations(data["respond"]);
      });

    fetch("https://fuel.udarax.me/api/user/vehicle/getqueue/" + user_id)
      .then((response) => response.json())
      .then((data) => {
        if (data["respond"] != null) {
          setQueueData(Object.values(data["respond"]));
        }
        setQueue(data["queue"]);
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
  

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [loading, isFocused]);

  const Item = ({ item }) => (
    <TouchableOpacity
      style={styles.box}
      onPress={() =>
        navigation.navigate("FillingStation", {
          stationID: item.id,
          user_id: user_id,
        })
      }
    >
      <View style={styles.row}>
        <View style={styles.col70}>
          <Text style={styles.boxTitle}>{item.name}</Text>
          <Text style={styles.boxtext}>{new Date().toJSON().slice(0, 10)}</Text>
          <Text style={styles.boxtext}>2.6 KM</Text>
          <Text style={styles.boxtext}>{item.availability}</Text>
        </View>
        <View style={[styles.col30, styles.center]}>
          <MaterialCommunityIcons name="gas-station" size={50} color="white" />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => <Item item={item} />;

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

      {queueData.length > 0 && (
        <View style={[styles.quebox,styles.mb5]}>
          <Text style={[styles.text, styles.title]}>
            Your Queue {new Date().toJSON().slice(0, 10)}{" "}
          </Text>
          <View>
            <Text style={styles.text}>Your Possition : {queueData[2]}</Text>
            <Text style={styles.text}>Queue : {queue}</Text>
            <Text style={styles.text}>Queue Type : {queueData[1]}</Text>
            <Text style={styles.text}>Queue Station : {queueData[0]}</Text>
            <TouchableOpacity
              style={[styles.button, styles.mt5]}
              onPress={leftQueue}
            >
              <Text style={styles.text}>Left Queue</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!loading && (
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={stations}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onRefresh={() => fetchData()}
            refreshing={loading}
          />
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mb5: {
    marginBottom: 20,
  },
  boxfull: {
    width: "100%",
    backgroundColor: "#00539CFF",
    padding: 20,
  },
  boxText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },
  quetext: {
    color: "#fff",
    fontSize: 70,
    textAlign: "right",
  },
  box: {
    backgroundColor: "#f7c469",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  boxTitle: {
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
  },
  boxtext: {
    color: "#000",
  },
  mt5: {
    marginTop: 20,
  },
  quebox: {
    backgroundColor: "#00539CFF",
    padding: 20,
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#f05a36",
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontWeight: "700",
    fontSize: 15,
  },
  text: {
    color: "#fff",
  },
  
});
