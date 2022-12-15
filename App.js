import * as React from "react";
import { Button, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "./Screens/Home";
import SettingsScreen from "./Screens/Settings";
import LoginScreen from "./Screens/Login";

import StationScreen from "./Screens/Admin/Station";
import StationAddScreen from "./Screens/Admin/Stationadd";
import StationViewScreen from "./Screens/Admin/Stationview";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Dashboard({ route, navigation }) {
  const { user_id, role } = route.params;
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        initialParams={{ userid: user_id, role: role }}
        options={{
          title: "Dashboard",
          headerStyle: {
            backgroundColor: "#560cce",
          },
          headerTintColor: "#fff",
        }}
        component={HomeScreen}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Dashboard"
          options={{ headerShown: false }}
          component={Dashboard}
        />
        <Stack.Screen
          name="Station"
          component={StationScreen}
          options={{
            title: "Gas Stations",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="StationAdd"
          component={StationAddScreen}
          options={{
            title: "New Gas Station",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="StationView"
          component={StationViewScreen}
          options={{
            title: "Gas Station",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
