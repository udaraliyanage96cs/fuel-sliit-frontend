import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function Queue({ route, navigation }) {
  const { user_id } = route.params;
  const [loading, setLoading] = useState(true);
  const [queue, setQueue] = useState([]);
  const isFocused = useIsFocused();

  const fetchData = () => {
    console.log(queue.length);
    fetch("https://fuel.udarax.me/api/station/queue/" + user_id)
      .then((response) => response.json())
      .then((data) => {
        console.log("aaa");
        console.log(data["respond"]);
        if (data["respond"] == "error") {
          setQueue([]);
        } else {
          setQueue(data["respond"]);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [loading, isFocused]);

  const Item = ({ item }) => (
    <TouchableOpacity
      style={styles.box}
      onPress={() =>
        navigation.navigate("FillingQueue", {
          user_id: item.uid,
          vehicle_id: item.vid,
          station_id: item.sid,
          fueltype_id: item.fid,
          ftype: item.fname,
          username: item.uname,
          vehicle: item.vtype,
          no: item.no,
          qid: item.id,
          stuid: user_id,
        })
      }
    >
      <View style={styles.row}>
        <View style={styles.col70}>
          <Text style={styles.boxTitle}>Queue No : {item.no}</Text>
          <Text style={styles.boxtext}>Fuel Type : {item.fname}</Text>
          <Text style={styles.boxtext}>User : {item.uname}</Text>
          <Text style={styles.boxtext}>Vehicle Type : {item.vtype}</Text>
        </View>
        <View style={[styles.col30, styles.center]}>
          {item.vtype == "Car" && (
            <Ionicons name="car-sport" size={30} color="black" />
          )}
          {item.vtype == "Motorbike" && (
            <MaterialCommunityIcons name="motorbike" size={30} color="black" />
          )}
          {item.vtype == "Bus" && (
            <Ionicons name="bus" size={30} color="black" />
          )}
          {item.vtype == "Van" && (
            <MaterialCommunityIcons
              name="van-utility"
              size={30}
              color="black"
            />
          )}
          {item.vtype == "Lorry" && (
            <FontAwesome5 name="truck-moving" size={30} color="black" />
          )}
          {item.vtype == "Threewheeler" && (
            <AntDesign name="fork" size={30} color="black" />
          )}
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
      {queue.length == 0 && (<Text> No Details</Text>)}
      {!loading && (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={queue}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onRefresh={() => fetchData()}
          refreshing={loading}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  tinyLogo: {
    backgroundColor: "#f00",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  col70: {
    width: "70%",
  },
  col30: {
    width: "30%",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  floatButton: {
    width: 65,
    height: 65,
    backgroundColor: "#f05a36",
    borderRadius: 100,
    position: "absolute",
    right: 20,
    bottom: 20,
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
});
