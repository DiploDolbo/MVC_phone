import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import Shop from '../Shop/Shop';
// import Upgrade from '../Upgrade/Upgrade';
import Click from '../Click/Click';

const CreateFrame = ({
    frame, activeFrame, library_VC, upgrade_VC, auto_click,
    buy_click, sell_click, masClick, onClick, money, up_voltage,
    voltage_VC, max_voltage_VC, onAlert, turn_on_off_VC
}) => {
    // const elements = frame.map((item, i) => {
    //     const { nameF } = item;
    //     const { name } = activeFrame;
    //     let clas = [], element;
    //     if (`${name}_${i}` === `${nameF}_${i}`) {
    //         clas = [styles.Frame, styles.FrameActive]
    //     }
    //     else {
    //         clas = [styles.Frame]
    //     }
    //     // eslint-disable-next-line default-case
        
    //     return (
    //         <View
    //             key={`${nameF}_${i}`}
    //             style={clas}
    //         >
    //             {element}
    //         </View>
    //     )
    // })
    const { name } = activeFrame;
    let element;
    switch (name) {
        case 'Shop':
            element = <Shop
                library_VC={library_VC}
                buy_click={buy_click}
            // onAlert = {onAlert}
            >
            </Shop>
            break;
        case 'Upgrade':
            element = <Upgrade
                upgrade_VC={upgrade_VC}
            // onAlert={onAlert}
            ></Upgrade>
            break;
        case 'Click':
            element = 
             <Click
                masClick={masClick}
                onClick={onClick}
                money={money}
                sell_click={sell_click}
                auto_click={auto_click}
                up_voltage={up_voltage}
                voltage_VC={voltage_VC}
                max_voltage_VC={max_voltage_VC}
                onAlert={onAlert}
                turn_on_off_VC={turn_on_off_VC}
            >
            </Click>
    }

    return (
        <>
            {element}
        </>
    )
}

const styles = StyleSheet.create({
    Frame: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    FrameActive: {
        position: "absolute",
    }
})

export default CreateFrame;