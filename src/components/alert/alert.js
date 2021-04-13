import React, { PureComponent } from 'react';
import { StyleSheet, Text, View} from 'react-native';

const Alert = ({ activeAlert, closeAlert }) => {
    let element = null;
    if(activeAlert.text != undefined){
        element = (<Al
            text={activeAlert.text}
            id={activeAlert.id}
            closeAlert = {closeAlert}
        />)
        
    }
    return (
        <View style={styles.AlertCont}>
            {element}
        </View>
    )
}

class Al extends PureComponent {

    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        const {closeAlert, id} = this.props;
        setTimeout(() => closeAlert(id), 1000)
    }

    render() {
        const { text, id} = this.props;
        return (
            <View style={styles.AlertWin}>
                <Text id={`alert_text_${id}`} className='alert_text'>{`${text}`}</Text>
                {/* <div className = 'close_alert' onClick = {() => {closeAlert(id)}}>X</div> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    AlertCont:{
        position: "absolute",
        marginHorizontal: "25%",
        zIndex: 10
    },
    AlertWin:{
        minWidth: 200,
        minHeight: 50,
        borderColor: "black",
        borderWidth: 3.3,
        borderRadius: 0.1,
        margin: 0,
        flexDirection: "column",
        backgroundColor: "white",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center"
    }
})

export default Alert;
