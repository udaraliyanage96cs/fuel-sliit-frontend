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

export default function Vehicle({ route, navigation }) {
  const { user_id } = route.params;

  const [loading, setLoading] = useState(true);
  const [vehi, setVehi] = useState([]);
  const isFocused = useIsFocused();

  const fetchData = () => {
    fetch("https://fuel.udarax.me/api/user/vehicle/" + user_id)
      .then((response) => response.json())
      .then((data) => {
        setVehi(data["respond"]);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [loading, isFocused]);

  function FloatButton() {
    return (
      <TouchableOpacity
        style={[styles.floatButton, styles.center]}
        onPress={() => navigation.navigate("VehicleAdd",{
          user_id:user_id
        })}
      >
        <Entypo name="plus" size={30} color="white" />
      </TouchableOpacity>
    );
  }

  const Item = ({ item }) => (
    <TouchableOpacity
      style={styles.box}
      onPress={() => navigation.navigate("VehicleEdit", { vehicleID: item.vid,user_id:user_id })}
    >
      <View style={styles.row}>
        <View style={styles.col70}>
          <Text style={styles.boxTitle}>{item.type.toUpperCase()} | {item.vehicle_no}</Text>
          <Text style={styles.boxtext}>Capacity : {item.capacity}</Text>
          <Text style={styles.boxtext}>Fuel Type : {item.ftype}</Text>
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

      {!loading && (
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={vehi}
            renderItem={renderItem}
            keyExtractor={(item) => item.vid}
            onRefresh={() => fetchData()}
            refreshing={loading}
          />
        </View>
      )}
      <FloatButton />
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
});
