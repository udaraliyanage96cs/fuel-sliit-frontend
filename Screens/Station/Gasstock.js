import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { useIsFocused } from "@react-navigation/native";

export default function Gasstock({ route, navigation }) {
  const { user_id } = route.params;
  const [loading, setLoading] = useState(true);
  const [stocks, setStocks] = useState([]);
  const isFocused = useIsFocused();

  const fetchData = () => {
    fetch("https://fuel.udarax.me/api/station/stocks/" + user_id)
      .then((response) => response.json())
      .then((data) => {
        setStocks(data["respond"]);
        setLoading(false);
      });
  };

  function FloatButton() {
    return (
      <TouchableOpacity
        style={[styles.floatButton, styles.center]}
        onPress={() =>
          navigation.navigate("GasStockAdd", {
            user_id: user_id,
          })
        }
      >
        <Entypo name="plus" size={30} color="white" />
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [loading, isFocused]);

  const Item = ({ item }) => (
    <TouchableOpacity
      style={styles.box}
      onPress={() => navigation.navigate("GasStockEdit", { stockID: item.fcid , user_id:user_id  })}
    >
      <View style={styles.row}>
        <View style={styles.col70}>
          <Text style={styles.boxTitle}>{item.name}</Text>
          <Text style={styles.boxtext}>Initial Volum : {item.ini_qty}</Text>
          <Text style={styles.boxtext}>Current Volum : {item.current_qty}</Text>
        </View>
        <View style={[styles.col30, styles.center]}>
          <View style={styles.delBox}>
            <AntDesign name="edit" size={20} color="white" />
          </View>
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
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={stocks}
          renderItem={renderItem}
          keyExtractor={(item) => item.fcid}
          onRefresh={() => fetchData()}
          refreshing={loading}
        />
      )}
      <FloatButton />
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
  delBox:{
    backgroundColor:"#f00",
    borderRadius:50,
    padding:15
  },
});
