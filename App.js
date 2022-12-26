import * as React from "react";
import { Button, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "./Screens/Home";
import SettingsScreen from "./Screens/Settings";
import LoginScreen from "./Screens/Login";

import StationScreen from "./Screens/Station/Station";
import StationAddScreen from "./Screens/Station/Stationadd";
import StationViewScreen from "./Screens/Station/Stationview";
import StationEditcreen from "./Screens/Station/Stationedit";
import FuelScreen from "./Screens/Fuel/Fuel";
import FuelAddScreen from "./Screens/Fuel/Fueladd";
import FuelEditScreen from "./Screens/Fuel/Fueledit";

import StationSingle from "./Screens/Station/Stationsingle";
import Gasprices from "./Screens/Station/Gasprices";
import Gasstock from "./Screens/Station/Gasstock";
import Gasstockadd from "./Screens/Station/Gasstockadd";
import Gasstockedit from "./Screens/Station/Gasstockedit";
import Queue from "./Screens/Station/Queue";
import Fillingqueue from "./Screens/Station/Fillingqueue";

import Browser from './Screens/Bowser/Browser'
import Bowseradd from './Screens/Bowser/Bowseradd'
import Bowserview from './Screens/Bowser/Bowserview'
import BowserEdit from './Screens/Bowser/Browseredit'

import Registeruser from './Screens/Registeruser'
import UserStations from './Screens/User/Stations'
import MyVehicle from './Screens/User/Vehicle'
import VehicleAdd from './Screens/User/Vehicleadd'
import Vehicleedit from './Screens/User/Vehicleedit'
import UserStationsView from './Screens/User/Stationview'
import Filling from './Screens/User/Filling'
import FillingStation from './Screens/User/Fillingstation'


import Audit from './Screens/Audit/Audit'
import Userslist from './Screens/Admin/Users'


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
          title: role.charAt(0).toUpperCase() + role.slice(1) +" Dashboard",
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
        <Stack.Screen
          name="StationEdit"
          component={StationEditcreen}
          options={{
            title: "Gas Station",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Fuel"
          component={FuelScreen}
          options={{
            title: "Fuel Details",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="FuelAdd"
          component={FuelAddScreen}
          options={{
            title: "New Fuel Details",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="FuelEdit"
          component={FuelEditScreen}
          options={{
            title: "Update Fuel Details",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="GasPrices"
          component={Gasprices}
          options={{
            title: "Gas Prices",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="GasStock"
          component={Gasstock}
          options={{
            title: "Inventory",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="GasStockAdd"
          component={Gasstockadd}
          options={{
            title: "Inventory Add",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="GasStockEdit"
          component={Gasstockedit}
          options={{
            title: "Inventory Update",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />

        <Stack.Screen
          name="Browser"
          component={Browser}
          options={{
            title: "Browsers",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="BowserAdd"
          component={Bowseradd}
          options={{
            title: "New Browser",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
         <Stack.Screen
          name="BowserView"
          component={Bowserview}
          options={{
            title: "Browser",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="BowserEdit"
          component={BowserEdit}
          options={{
            title: "Update Browser",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="RegisterUser"
          component={Registeruser}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="UserStations"
          component={UserStations}
          options={{
            title: "Gas Stations",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="MyVehicle"
          component={MyVehicle}
          options={{
            title: "My Vehicle",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="VehicleAdd"
          component={VehicleAdd}
          options={{
            title: "New Vehicle",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="VehicleEdit"
          component={Vehicleedit}
          options={{
            title: "Update Vehicle",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="UserStationsView"
          component={UserStationsView}
          options={{
            title: "Stations View",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Filling"
          component={Filling}
          options={{
            title: "Filling ( Select a Gas Station )",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="FillingStation"
          component={FillingStation}
          options={{
            title: "Filling Station",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Queue"
          component={Queue}
          options={{
            title: "Queue Management",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="FillingQueue"
          component={Fillingqueue}
          options={{
            title: "Filling Queue",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Audit"
          component={Audit}
          options={{
            title: "Audit Report",
            headerStyle: {
              backgroundColor: "#560cce",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Userslist"
          component={Userslist}
          options={{
            title: "Users List",
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
