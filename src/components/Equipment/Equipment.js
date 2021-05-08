import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

import room1 from '../../img/home_img/home_lvl1.png';

class Equipment extends PureComponent{

    render(){
        const {masCooler, masEnergy, masPlace, masRoom } = this.props;
        return (
            <View style={styles.Equipment}>
                <View style={styles.Row_1}>
                    <View style={styles.ChillList}>
                        <Text style={styles.text}>ОХЛАЖДЕНИЕ</Text>
                        <View style={styles.Chill}>
                            {
                                masCooler.map((item, i) => {
                                    if (item.name == 'empty') { return (<View key={`empty_Cooler_${i}`} style={styles.Empty}></View>) }
                                    else {
                                        return (<View key={`Chill_${i}`}>
                                            <Image style={styles.Image} source={item.img}></Image>
                                        </View>)
                                    }
                                })
                            }
                        </View>
                    </View>
                    <View style={styles.EnergyList}>
                        <Text style={styles.text}>ЭНЕРГИЯ</Text>
                        <View style={styles.Energy}>
                            {
                                masEnergy.map((item, i) => {
                                    if (item.name == 'empty') { return (<View key={`empty_Energy_${i}`} style={styles.Empty}></View>) }
                                    else {
                                        return (<View key={`Energy_${i}`}>
                                            <Image style={styles.Image} source={item.img}></Image>
                                        </View>)
                                    }
                                })
                            }
                        </View>
                    </View>
                </View>
                <View style={styles.Row_2}>
                    <View style={styles.PlaceList}>
                        <Text style={styles.text}>МЕСТО</Text>
                        <View style={styles.Place}>
                            {
                                masPlace.map((item, i) => {
                                    if (item.name == 'empty') { return (<View key={`empty_Place_${i}`} style={styles.Empty}></View>) }
                                    else {
                                        return (<View key={`Place_${i}`}>
                                            <Image style={styles.Image} source={item.img}></Image>
                                        </View>)
                                    }
                                })
                            }
                        </View>
                    </View>
                </View>
                <View style={styles.Row_3}>
                    <View style={styles.RoomList}>
                        <Text style={styles.text}>ПОМЕЩЕНИЕ</Text>
                        <View style={styles.Room}>
                            {
                                masRoom.map((item, i) => {
                                    if (item.name == 'empty') { return (<View key={`empty_Room_${i}`} style={styles.Empty}></View>) }
                                    else {
                                        return (<View key={`Room_${i}`}>
                                            <Image style={styles.Image} source={room1}></Image>
                                        </View>)
                                    }
                                })
                            }
                        </View>
                    </View>
                </View>
            </View>
    
        )
    }
}

const styles = StyleSheet.create({
    Equipment: {
        height: 400,
        width: "100%",
        marginTop: 20,
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center"
    },
    Empty: {
        width: 52,
        height: 52,
        backgroundColor: '#67605E',
        borderWidth: 3.3,
        borderColor: "black",
        margin: 1
    },
    Image: {
        width: 52,
        height: 52,
        resizeMode: 'contain',
        margin: 1
    },
    Cell: {
        width: 52,
        height: 52,
        borderWidth: 3.3,
        borderColor: "black",
        margin: 5
    },
    text: {
        textAlign: "center",
        width: "100%",
        fontSize: 20
    },
    Row_1: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
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
        display: "flex",
        flexDirection: 'row',
        alignItems: "flex-start",
        flexWrap: "wrap",
        marginTop: 5,
        // borderWidth: 1,
        // borderColor: "#131212",
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
        flexDirection: 'row',
        alignItems: "flex-start",
        flexWrap: "wrap",
        // borderWidth: 1,
        // borderColor: "#131212",
    },
    Row_2: {
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "center",
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
        flexDirection: 'row',
        alignItems: "flex-start",
        flexWrap: "wrap",
        // borderWidth: 1,
        // borderColor: "#131212",
    },
    Row_3: {
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "center",
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
        flexDirection: 'row',
        alignItems: "flex-start",
        flexWrap: "wrap",
        // borderWidth: 1,
        // borderColor: "#131212",
    }

})

export default Equipment