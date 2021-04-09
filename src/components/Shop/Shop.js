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
import React from "react";

import gt730_notwork from '../../img/Nofancard_notwork.png';
import gt750_notwork from '../../img/2fancard_notwork.png';
import gt760_notwork from '../../img/Watercard_notwork.png';

const Shop = ({ buy_click, library_VC }) => {

    const mas_VC =
    {
        GT730: gt730_notwork,
        GT750: gt750_notwork,
        GT760: gt760_notwork,
    }


    const element = library_VC.map((item, i) => {
        const { text, price, voltage, plus, temp } = item;
        return (
            <View key={`shop_item_${i}`} style={styles.ShopItem}>
                <View>
                    {/* <button className={`name_upgrade ${name}`} onClick={click}><div>{text}</div></button> */}
                    <TouchableOpacity activeOpacity={0.9} style={styles.button}  onPress={() => { buy_click({ text: text, price: price, votage: voltage }) }}>
                        <Image style={styles.Image} source={mas_VC[text]}></Image>
                        <Text style={{ fontSize: 20, textAlign: "center" }}>{text}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.InofShopClick}>
                    <Text style={styles.TextInfo}>Доход: {plus}</Text>
                    <Text style={styles.TextInfo}>Ватт: {voltage}</Text>
                    <Text style={styles.TextInfo}>Жарит: {temp} С°</Text>
                    <Text style={styles.PriceShop}>Стоит: {price}</Text>
                </View>

            </View>
        )
    })

    return (
        // <Text>MAGAZIN</Text>
        <View style={styles.Shop}>
            <ScrollView style={styles.StyleList}>
                {element}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    Shop: {
        height: 400,
        width: "100%"
    },
    button: {
        height: 122,
        width: 122,
        backgroundColor: "#A38D8A",
        borderWidth: 3.3,
        borderColor: "#131212",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginRight: 5
    },
    StyleList: {
        marginTop: 20,
    },
    ShopItem: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        marginBottom: 5
    },
    TextInfo: {
        textAlign: "left",
        width: 140,
        fontSize: 20
    },
    InofShopClick: {
        flexDirection: "column",
        backgroundColor: "#A38D8A",
        borderColor: "black",
        borderWidth: 3.3,
        width: 267,
        height: 122,
        padding: 5,
        position: "relative"
    },
    PriceShop: {
        textAlign: "right",
        position: "absolute",
        right: 0,
        bottom: 0
    },
    Image: {
        width: 125,
        height: 75,
        resizeMode: 'contain'
    }
})

export default Shop;