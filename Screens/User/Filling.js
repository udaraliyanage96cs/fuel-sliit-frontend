import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

export default function Fillig({ route }) {
  const { user_id } = route.params;

  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [stations, setStations] = useState([]);
  const isFocused = useIsFocused();

  const [queueData, setQueueData] = useState([]);
  const [queue, setQueue] = useState();
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [opt, setOpt] = useState(1);

  const fetchData = () => {

    let url = "";
    if(opt == 1){
      url =  `https://fuel.udarax.me/api/station/nearest/dis?lat=${lat}&lng=${long}`
    }else if(opt == 2){
      url =  `https://fuel.udarax.me/api/station/nearest/oil?lat=${lat}&lng=${long}&uid=${user_id}`
    }

    fetch(
      url
    )
      .then((response) => response.json())
      .then((data) => {
        setStations(data["respond"]);
        console.log("her2e");
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
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log(location.coords.latitude);
      console.log(location.coords.longitude);
      setLat(location.coords.latitude);
      setLong(location.coords.longitude);
    })();
    if (isFocused) {
      fetchData();
    }
  }, [loading, isFocused,opt]);

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
          <Text style={styles.boxtext}>Straight Distance {item.distance} Km</Text>
          <Text style={styles.boxtext}>Route Distance {item.api_distance}</Text>
          {item.queue != null && <Text style={styles.boxtext}>Queue {item.queue}</Text>}
          {item.capacity != null && <Text style={styles.boxtext}>Capatity {item.capacity}</Text>}
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
      <>
        {loading && (
          <View>
            <Image
              style={styles.tinyLogo}
              source={require("../../assets/gasloading.gif")}
            />
          </View>
        )}
        <View style={[{flexDirection:'row'},{justifyContent:'space-around'},{marginBottom:20}]}>
          <TouchableOpacity onPress={()=> setOpt(1)}><Text style={[styles.buttonswitch]}>Option 1</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=> setOpt(2)}><Text style={styles.buttonswitch}>Option 2</Text></TouchableOpacity>
        </View>
        {queueData.length > 0 && (
          <View style={[styles.quebox, styles.mb5]}>
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
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonswitch:{
    backgroundColor:"#f00",
    padding:10,
    color:"#fff",
    borderRadius:10
  },
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
