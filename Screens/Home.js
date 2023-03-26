import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'

import Admin from './Admin/Admin'
import Stationsingle from './Station/Stationsingle'
import User from './User/User'
import BowserHome from './Bowser/Bowserhome'

export default function Home({ route,navigation }) {
  const { userid,role } = route.params;
  
  console.log(userid,role);
  return (
    <View  style={{ flex: 1,alignContent:'center'}}>
        <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#560cce" color="#fff" translucent = {true}/>
        {/* We need to specify what component need to render by user's role */}
        {role == 'admin' && (  <Admin userid = {userid} role = "admin" />) }
        {role == 'station' && (  <Stationsingle userid = {userid} />) }
        {role == 'user' && (  <User userid = {userid} />) }
        {role == 'bowser' && (  <BowserHome userid = {userid} />) }
    </View>
  )
}

const styles = StyleSheet.create({})