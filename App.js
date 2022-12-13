import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './Screens/Home'
import SettingsScreen from './Screens/Settings'
import LoginScreen from './Screens/Login'

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Dashboard() {
  return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login"  options={{headerShown: false}}  component={LoginScreen} />
        <Stack.Screen name="Dashboard"  options={{headerShown: false}}  component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}