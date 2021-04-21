import React, {PureComponent} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import Shop from '../Shop/Shop';
import Upgrade from '../Upgrade/Upgrade';
import Click from '../Click/Click';

class CreateFrame extends PureComponent{
    render(){
        const {
            frame, activeFrame, library_VC, upgrade_VC, auto_click,
            buy_click, sell_click, masClick, onClick, money, up_voltage,
            voltage_VC, max_voltage_VC, onAlert, turn_on_off_VC, temp_VC
        } = this.props;
        const elements = frame.map((item, i) => {
            const { nameF } = item;
            const { name } = activeFrame;
            let clas = [], element, zIndex = 0;
            if (`${name}` === `${nameF}`) {
                clas = [styles.FrameActive]
                zIndex = 5;
            }
            else {
                clas = [styles.Frame]
            }
            // eslint-disable-next-line default-case
            if(`${name}` == 'Click' && `${nameF}` !== 'Click')
            {
                return(<View key={`${nameF}`}/>)
            }
    
            switch (nameF) {
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
                            temp_VC={temp_VC}
                        >
                        </Click>
                        break;
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
            }
    
            return (
                <View
                    key={`${nameF}`}
                    style={[clas, {zIndex: zIndex}]}
                    // hide = {hide}
                >
                    {element}
                </View>
            )
        })
    
        return (
            <>
                {elements}
            </>
        )
    }
}


const styles = StyleSheet.create({
    Frame: {
        position: "absolute",
        elevation: 0,
        opacity: 0,
        // zIndex: 0
    },
    FrameActive: {
        position: "absolute",
        elevation: 10,
        opacity: 1,
        // zIndex: 2
    }
})

export default CreateFrame;