import React, { PureComponent } from 'react';
import { StyleSheet, Text, ScrollView, View, Image, Alert, Pressable } from 'react-native';

const Equipment = () =>{

    return(
        <View style={styles.Equipment}>
            <View style={styles.Row_1}>
                <View style={styles.ChillList}>
                    <Text style={styles.text}>ОХЛАЖДЕНИЕ</Text>
                    <View style={styles.Chill}></View>
                </View>
                <View style={styles.EnergyList}>
                    <Text style={styles.text}>ЭНЕРГИЯ</Text>
                    <View style={styles.Energy}></View>
                </View>
            </View>
            <View style={styles.Row_2}>
                <View style={styles.PlaceList}>
                    <Text style={styles.text}>МЕСТО</Text>
                    <View style={styles.Place}></View>
                </View>
            </View>
            <View style={styles.Row_3}>
                <View style={styles.RoomList}>
                    <Text style={styles.text}>ПОМЕЩЕНИЕ</Text>
                    <View style={styles.Room}></View>
                </View>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    Equipment: {
        height: 400,
        width: "100%",
        marginTop: 20,
        display: 'flex',
        flexDirection: "column"
    },
    text: {
        textAlign: "center",
        width: "100%",
        fontSize: 20
    },
    Row_1:{
        display: "flex",
        flexDirection: "row",
        width: '100%',
    },
    ChillList: {
        height: 167,
        width: 228,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#A38D8A",
        borderWidth: 3.3,
        borderColor: "#131212",
    },
    Chill: {
        height: 109,
        width: 166,
        marginTop: 5,
        borderWidth: 1,
        borderColor: "#131212",
    },
    EnergyList: {
        height: 167,
        width: 158,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#A38D8A",
        borderWidth: 3.3,
        borderColor: "#131212",
        marginLeft: 10
    },
    Energy: {
        height: 109,
        width: 109,
        marginTop: 5,
        borderWidth: 1,
        borderColor: "#131212",
    },
    Row_2: {
        marginTop: 10
    },
    PlaceList: {
        height: 105,
        width: 397,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#A38D8A",
        borderWidth: 3.3,
        borderColor: "#131212",

    },
    Place: {
        height: 52,
        width: 335,
        marginTop: 5,
        borderWidth: 1,
        borderColor: "#131212",
    },
    Row_3: {
        marginTop: 10
    },
    RoomList: {
        height: 105,
        width: 397,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#A38D8A",
        borderWidth: 3.3,
        borderColor: "#131212",
    },
    Room: {
        height: 52,
        width: 335,
        marginTop: 5,
        borderWidth: 1,
        borderColor: "#131212",
    }

})

export default Equipment