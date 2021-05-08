import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import React, { PureComponent } from "react";

import ATI4600_notwork from '../../img/red1fancard_notwork.png';
import gt730_notwork from '../../img/Nofancard_notwork.png';
import gt750_notwork from '../../img/2fancard_notwork.png';
import gt760_notwork from '../../img/Watercard_notwork.png';
import HP_G6_notwork from '../../img/laptop1_notwork.png';
import i5_6400_notwork from '../../img/cpu1_notwork.png';

class Shop extends PureComponent {

    render() {
        const { buy_click, library_VC } = this.props;
        const mas_VC =
        {
            ATI4600: ATI4600_notwork,
            GT730: gt730_notwork,
            GT750: gt750_notwork,
            GT760: gt760_notwork,
            HP_G6: HP_G6_notwork,
            i5_6400: i5_6400_notwork
        }
        const element = library_VC.map((item, i) => {
            const { text, price, voltage, plus, temp, temp_room } = item;
            return (
                <View key={`shop_item_${i}`} style={styles.ShopItem}>
                    <View>
                        {/* <button className={`name_upgrade ${name}`} onClick={click}><div>{text}</div></button> */}
                        <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={() => { buy_click({ text: text, price: price }) }}>
                            <Image style={styles.Image} source={mas_VC[text]}></Image>
                            <Text style={{ fontSize: 20, textAlign: "center" }}>{text}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.InofShopClick}>
                        <Text style={styles.TextInfo}>Доход: {plus}</Text>
                        <Text style={styles.TextInfo}>Ватт: {voltage}</Text>
                        <Text style={styles.TextInfo}>Жарит: {temp + 30}С°</Text>
                        <Text style={styles.TextInfo}>Греет: {temp_room}С°</Text>
                        <Text style={styles.PriceShop}>Стоит: {price}$</Text>
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
        width: "65%",
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