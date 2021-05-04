import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    Image,
    Alert,
    Pressable,
    TouchableOpacity
} from 'react-native';
import React from 'react';

import autoclick_img from '../../img/autoclick.png';
import BP_img from '../../img/bp.png';
import FP_img from '../../img/mesto.png';
import Cooler_img from '../../img/fan.png'

const Upgrade = ({ upgrade_VC }) => {

    const mas_Upgrade =
    {
        autoclick: autoclick_img,
        BP: BP_img,
        FP: FP_img,
        Cooler: Cooler_img
    }

    const element = upgrade_VC.map((item, i) => {
        const { buy, text, func, properties, name, name_properties, description } = item;
        let {price} = item;
        let img = mas_Upgrade[name];
        let classN = styles.UpgradeItem, info_upgrade = '', click = () => func(properties, price, name, img);
        if(!buy) 
        {
            // classN = [styles.UpgradeItem, styles.buy ];
            price = 'Куплено';
            click = () => {};
        }
        return (
            <View key={`upgrade_${i}`} style={classN}>
                <View>
                    <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={click}>
                        <Image style={styles.Image} source={mas_Upgrade[name]}></Image>
                        <Text style={{fontSize: 16, textAlign: "center" }}>{text}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.InfoUpgrade} >
                    <View style={styles.DiscriptionUpdate}><Text>{description}</Text></View>
                    <View><Text>{name_properties}: {properties}</Text></View>
                    <View style={styles.PriceUpgrade}><Text>Стоит: {price}$</Text></View>
                </View>
            </View>
        )
    })

    return (
        <View style= {styles.Upgrade}>
            <ScrollView style={styles.UpgradeList}>
                {element}
            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    Upgrade: {
        height: 400,
        width: "100%"
    },
    button: {
        flexDirection: "column",
        height: 122,
        width: 122,
        fontSize: 20,
        backgroundColor: "#A38D8A",
        borderWidth: 3.3,
        borderColor: "black",
        marginRight: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

    },
    UpgradeList: {
        marginTop: 20,
        height: "100%",
        width: "100%"
    },
    UpgradeItem: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5
    },
    InfoUpgrade: {
        height: 122,
        width: "65%",
        fontSize: 20,
        backgroundColor: "#A38D8A",
        borderWidth: 3.3,
        borderColor: "black",
        textAlign: "left",
        padding: 5,
        position: "relative"
    },
    DiscriptionUpdate: {
        fontSize: 16,
        borderColor: "black",
        borderBottomWidth: 1 
    },
    PriceUpgrade: {
        textAlign: "right",
        position: "absolute",
        right: 0,
        bottom: 0
    },
    buy: {
        backgroundColor: "gray"
    },
    Image: {
        width: 125,
        height: 75,
        resizeMode: 'contain'
    }
})

export default Upgrade