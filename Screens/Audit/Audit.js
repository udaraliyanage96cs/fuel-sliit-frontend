import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export default function Audit({ route, navigation }) {
  const { user_id, role } = route.params;
  const [audit, setAudit] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const fetchData = () => {
    fetch("https://fuel.udarax.me/api/audit/" + user_id + "/" + role)
      .then((response) => response.json())
      .then((data) => {
        console.log(data["response"]);
        setAudit(data["response"]);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
      console.log("aaaaaaaaaaaaa");
      console.log(audit.list);
    }
  }, [loading, isFocused]);

  const Item = ({ item }) => (
    <View
      style={[
        styles.box,
        styles.boxfull,
        styles.row,
        styles.auditboxes,
        styles.mb5,
      ]}
    >
      <View style={styles.row}>
        <View style={styles.col8}>
          <Text style={styles.boxTitle}>
            {item.ftyoe} - {item.qty} (L)
          </Text>
          <Text style={styles.boxTextlist}>
            {item.vtype} - {item.vno}
          </Text>
          <Text style={styles.boxTextlist}>Rs. {item.amount}</Text>
          <Text style={styles.boxTextlist}>
            {item.created_at.split("T")[0]}{" "}
            {item.created_at.split("T")[1].slice(0, 8)}
          </Text>
          <Text style={styles.boxTextlist}>{item.sname}</Text>
        </View>
        <View style={[styles.col2, styles.right]}>
          <MaterialCommunityIcons name="fuel" size={50} color="black" />
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <View style={styles.container}>
      {!loading && !audit.list && 
        <View>
          <View style={[styles.row, styles.mb5]}>
            <View style={[styles.box, styles.boxfull, styles.row]}>
              <View style={[styles.col4, { justifyContent: "center" }]}>
                <FontAwesome5 name="money-bill-alt" size={45} color="white" />
                <Text style={styles.boxText}>Total Amount</Text>
              </View>
              <View style={styles.col6}>
                <Text style={styles.quetext}>{audit.amount}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.row, styles.mb5]}>
            <View
              style={[styles.box, styles.boxfull, styles.row, styles.yellow]}
            >
              <View style={[styles.col4, { justifyContent: "center" }]}>
                <MaterialCommunityIcons
                  name="car-3-plus"
                  size={45}
                  color="white"
                />
                <Text style={styles.boxText}>Filled Vehicles</Text>
              </View>
              <View style={styles.col6}>
                <Text style={styles.quetext}>{audit.filled}</Text>
              </View>
            </View>
          </View>
        </View>
      }
      {!loading && role == 'user' && (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={audit.list}
          renderItem={renderItem}
          keyExtractor={(item) => item.aid}
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
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mb5: {
    marginBottom: 20,
  },
  box: {
    backgroundColor: "#f05a36",
    width: "47%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
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
  col4: {
    width: "40%",
  },
  col6: {
    width: "60%",
  },
  col8: {
    width: "80%",
  },
  col2: {
    width: "20%",
  },
  quetext: {
    color: "#fff",
    fontSize: 40,
    textAlign: "right",
  },
  quetext2: {
    color: "#fff",
    fontSize: 18,
    textAlign: "right",
  },
  yellow: {
    backgroundColor: "#E49B0F",
  },
  boxtext: {
    color: "#000",
  },
  auditboxes: {
    backgroundColor: "#8eff78",
  },
  right: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
});
