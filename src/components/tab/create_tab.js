import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const CreateTab = ({ tab, onSwitch, activeFrame, curtain, switch_curtain }) => {
    let elements_1, elements_2, style = [styles.Curtain]
    elements_1 = tab.map((item, i) => {
        if (i < 3) {
            const { nameWP, text } = item;
            const { name } = activeFrame;
            let clas;
            const full_name = `${nameWP}_tab_${i}`
            if (`${name}_tab_${i}` === full_name) {
                clas = [styles.TabWp, styles.TabWpActive]
            }
            else {
                clas = [styles.TabWp]
            }
            return (
                <TouchableOpacity key={full_name} style={clas} onPress={() => onSwitch(nameWP, i)}>
                    <Text>{text ? text : 'Tab'}</Text>
                </TouchableOpacity>
            )
        }
    })
    if (curtain) {
        style = [styles.Curtain ,styles.ActiveCurtain]
        elements_2 = tab.map((item, i) => {
            if (i < 6 && i > 2) {
                const { nameWP, text } = item;
                const { name } = activeFrame;
                let clas;
                const full_name = `${nameWP}_tab_${i}`
                if (`${name}_tab_${i}` === full_name) {
                    clas = [styles.TabWp, styles.TabWpActive]
                }
                else {
                    clas = [styles.TabWp]
                }
                return (
                    <TouchableOpacity key={full_name} style={clas} onPress={() => onSwitch(nameWP, i)}>
                        <Text>{text ? text : 'Tab'}</Text>
                    </TouchableOpacity>
                )
            }
        })
    }


    return (
        <>
            <View style={styles.elements_1}>{elements_1}</View>
            <View>{elements_2}</View>
            <TouchableOpacity style={style} onPress={switch_curtain}><Text>☰</Text></TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    TabWp: {
        height: 44,
        borderWidth: 3.3,
        borderColor: "#131212",
        backgroundColor: "#A38D8A",
        textAlign: "center",
        fontSize: 24,
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    TabWpActive: {
        backgroundColor: "#B7A7A1",
        opacity: 1
    },
    elements_1:{
        flexDirection: "row",
        
    },
    Curtain: {
        width: "100%",
        height: 25,
        backgroundColor: "#A38D8A",
        borderWidth: 3.3,
        borderTopWidth: 0,
        borderColor: "black",
        alignItems: "center",
        zIndex: 1
    },
    ActiveCurtain: {
        backgroundColor: "#B7A7A1"

    }

})

export default CreateTab