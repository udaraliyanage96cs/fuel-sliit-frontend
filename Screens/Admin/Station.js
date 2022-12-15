import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';

export default function Station({navigation}) {

    function FloatButton() {
        return(
            <TouchableOpacity style = {[styles.floatButton,styles.center]} onPress={() => navigation.navigate("StationAdd")}>
                <Entypo name="plus" size={30} color="white" />
            </TouchableOpacity>
        );
    }
    return (
        <View style={styles.container}>
            <Text>Station</Text>
            <FloatButton/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:30
    },
    center: {
        alignItems:'center',
        justifyContent: 'center'
    },
    floatButton:{
        width:65,
        height:65,
        backgroundColor:"#f05a36",
        borderRadius:100,
        position:'absolute',
        right: 20,
        bottom:20
    },
})