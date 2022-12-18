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
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import { useIsFocused } from "@react-navigation/native";

export default function Gasprices() {
    const [loading, setLoading] = useState(true);
    const [fuel, setFuel] = useState([]);
    const isFocused = useIsFocused();
  
    const fetchData = () => {
      fetch("https://fuel.udarax.me/api/fuel/")
        .then((response) => response.json())
        .then((data) => {
          setFuel(data["respond"]);
          setLoading(false);
        });
    };
  
    useEffect(() => {
      if (isFocused) {
        fetchData();
      }
    }, [loading, isFocused]);
  
    const Item = ({ item }) => (
      <View
        style={styles.box}
      >
        <View style={styles.row}>
          <View style={styles.col70}>
            <Text style={styles.boxTitle}>{item.name}</Text>
            <Text style={styles.boxtext}>{item.price}</Text>
          </View>
          <View style={[styles.col30, styles.center]}>
            <MaterialCommunityIcons name="fuel" size={50} color="black" />
          </View>
        </View>
      </View>
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
            data={fuel}
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
      alignItems:'center'
    },
    tinyLogo:{
      backgroundColor:"#f00",
      justifyContent:'center',
      alignItems:'center'
    },
    row:{
      flexDirection:'row'
    },
    col70:{
      width:"70%"
    },
    col30:{
      width:"30%"
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