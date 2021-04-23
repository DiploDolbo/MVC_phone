import React, { PureComponent } from 'react';
import { StyleSheet, Text, ScrollView, View, Image, Alert, Pressable } from 'react-native';
// Видеокарты
import ATI4600_notwork from '../../img/red1fancard_notwork.png';
import ATI4600_work from '../../img/red1fancard_work.gif';
import gt730_notwork from '../../img/Nofancard_notwork.png';
import gt730_work from '../../img/Nofancard_work.gif';
import gt750_notwork from '../../img/2fancard_notwork.png';
import gt750_work from '../../img/2fancard_work.gif';
import gt760_notwork from '../../img/Watercard_notwork.png';
import gt760_work from '../../img/Watercard_work.gif';
//Ноуты
import HP_G6_notwork from '../../img/laptop1_notwork.png';
import HP_G6_work from '../../img/laptop1_work.gif';
//Процессоры
import i5_6400_notwork from '../../img/cpu1_notwork.png';
import i5_6400_work from '../../img/cpu1_work.gif';

import VC_on_img from '../../img/switch1_on.png';
import VC_off_img from '../../img/switch1_off.png';


// Инфо
// import info_click_img from '../../img/work/InfoClick.png'


const click = (
  { masClick, onClick, money, sell_click, auto_click, up_voltage,
    voltage_VC, max_voltage_VC, onAlert, turn_on_off_VC, temp_VC }
) => {
  const mas_VC =
  {
    ATI4600_notwork: ATI4600_notwork,
    ATI4600_work: ATI4600_work,
    GT730_notwork: gt730_notwork,
    GT730_work: gt730_work,
    GT750_notwork: gt750_notwork,
    GT750_work: gt750_work,
    GT760_notwork: gt760_notwork,
    GT760_work: gt760_work,
    HP_G6_notwork: HP_G6_notwork,
    HP_G6_work: HP_G6_work,
    i5_6400_notwork: i5_6400_notwork,
    i5_6400_work: i5_6400_work
  }

  const element = masClick.map((item, i) => {
    if (item.text == 'empty') {return (<View key={`empty_click_${i}`} style={styles.Empty}></View>)}
    else {
      const { time_1_percent, text, id, plus, voltage, working, coif_volt, temp, temp_room, oldChil } = item;
      const notwork = mas_VC[`${text}_notwork`];
      const work = mas_VC[`${text}_work`];

      return (
        <View style={styles.Click} key={`${text}_${id}`}>
          <Click
            time_1_percent={time_1_percent}
            text={text}
            onClick={onClick}
            plus={plus}
            sell_click={sell_click}
            index={i}
            auto_click={auto_click}
            notwork_img={notwork}
            work_img={work}
            voltage={voltage}
            up_voltage={up_voltage}
            working={working}
            voltage_VC={voltage_VC}
            max_voltage_VC={max_voltage_VC}
            onAlert={onAlert}
            coif_volt={coif_volt}
            temp={temp}
            temp_room={temp_room}
            oldChil={oldChil}
            temp_VC={temp_VC}
            turn_on_off_VC={turn_on_off_VC}
          ></Click>
        </View>
      )
    }

  })
  return (
    <ScrollView style={styles.ListClick}>
      <View style={styles.List}>
        {element}
      </View>
    </ScrollView>
  )
}

class Click extends PureComponent {

  constructor(props) {
    super(props)
    this.time_auto_click = 0;
    this.time_interval_cooldown = 0;
    this.VC_on = true;
  }

  state = {
    cooldown: 0,
    temperature: 30
  }

  componentDidMount() {
    this.auto_click();
  }

  componentWillUnmount() {
    clearInterval(this.time_auto_click)
    clearTimeout(this.time_interval_cooldown)
  }


  turn_VC = () => {
    const { voltage, working, index, coif_volt, temp, temp_room, oldChil } = this.props
    if (this.VC_on) {
      this.VC_on = false;
      clearInterval(this.time_auto_click)
      clearTimeout(this.time_interval_cooldown)
      this.props.turn_on_off_VC(voltage, working, index, this.VC_on, coif_volt, temp, temp_room, oldChil)
    }
    else {
      this.VC_on = true;
      this.props.turn_on_off_VC(voltage, working, index, this.VC_on, coif_volt, temp, temp_room, oldChil)
    }
    this.setState({
      cooldown: 0,
      temperature: 30
    })
  }

  auto_click = () => {
    if (this.props.auto_click.can && this.VC_on) {
      this.time_auto_click = setTimeout(() => this.click(this.props.plus, this.props.voltage), this.props.auto_click.time * 1000)
    }
  }

  click = () => {
    const { voltage_VC, max_voltage_VC, plus, voltage } = this.props;

    if (!this.props.working && voltage_VC + voltage <= max_voltage_VC && this.VC_on) {
      this.start_cooldown(plus, voltage)
    }
    else if (voltage_VC + voltage > max_voltage_VC) {
      this.props.onAlert('БП не потянет')
    }
  }
  start_cooldown = (plus, voltage) => {
    const { time_1_percent, working, index, coif_volt, temp, temp_room, oldChil } = this.props;
    this.props.up_voltage(voltage, working, index, 1, temp, temp_room, oldChil);
    this.time_interval_cooldown = setInterval(() => this.plus_cooldown(plus, voltage), time_1_percent * 10)
  }

  plus_cooldown = (plus, voltage) => {
    const { cooldown, temperature } = this.state;
    const { working, index, coif_volt, temp, temp_room, temp_VC, oldChil } = this.props
    let t = +((temp + temp_VC).toFixed(1))
    if (cooldown !== 100) {
      this.setState({
        cooldown: cooldown + 1,
        temperature: t
      })
    }
    else {
      clearInterval(this.time_interval_cooldown);
      this.props.onClick(plus, temperature);
      this.props.up_voltage(voltage, working, index, 1, temp, temp_room, oldChil);
      this.auto_click();
      this.setState({
        cooldown: 0,
        temperature: 30
      })
    }
  }

  sell = (question) => {
    if (question) {
      const { sell_click, index, temp_room } = this.props;
      clearTimeout(this.time_auto_click);
      clearInterval(this.time_interval_cooldown);
      sell_click(index, this.props.working, temp_room)
    }
  }

  sellQuestion = () =>
    Alert.alert(
      "Барыга спрашивает",
      "Видюху продаж?",
      [
        { text: "OK", onPress: () => this.sell(true) },
        {
          text: "Нет",
          onPress: () => this.sell(false),
          style: "cancel"
        }
      ]
    );

  render() {

    const { cooldown, temperature } = this.state;
    const { time_1_percent, text, plus, notwork_img, work_img, voltage, working } = this.props
    let img, img_on;
    if (!working) { img = notwork_img; }
    else { img = work_img }
    if (this.VC_on) { img_on = VC_on_img }
    else { img_on = VC_off_img }
    return (
      <>
        <View style={styles.InfoClick}>
          <View style={styles.InfoClickText}>
            <View><Text style={styles.NameClick}>{text}</Text></View>
            <View><Text style={styles.TempClick}>{temperature}С°</Text></View>
            <View><Text style={styles.TimeCooldown}>{(time_1_percent - cooldown * time_1_percent / 100).toFixed(2)} с</Text></View>
          </View>
        </View>
        <Pressable style={styles.ImgVC_TO} onPress={this.click}>
          <Image style={styles.ImgVCImage} source={img}></Image>
        </Pressable>
        <View style={styles.SellOn}>
          <Pressable activeOpacity={1} style={styles.SellClick_TO} onPress={this.sellQuestion}>
            <Text>Sell</Text>
          </Pressable>
          <Pressable activeOpacity={1} style={styles.ImgOn_TO} onPress={() => { this.turn_VC(plus, voltage) }}>
            <Image style={styles.ImgOnImage} source={img_on}></Image>
          </Pressable>
        </View>
      </>
    )
  }
}


const styles = StyleSheet.create({
  ListClick: {
    height: 400,
    width: "100%",
    marginTop: 20,
  },
  List: {
    maxHeight: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  Empty: {
    width: 120,
    height: 124,
    marginTop: 0,
    marginBottom: 2,
    backgroundColor: '#67605E',
    borderWidth: 3.3,
    borderColor: "black",
  },
  Click: {
    flexDirection: "column",
    alignItems: "center",
    width: 120,
    height: 128,
    marginTop: 0,
    marginBottom: 2,
  },
  InfoClick: {
    height: 46,
    width: 120,
    borderWidth: 3.3,
    borderColor: "black",
    backgroundColor: "#A38D8A",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  InfoClickText: {
    width: 90,
    height: 35,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
    position: "relative",
    color: "#112533",
    borderWidth: 3.3,
    borderColor: "black",
    backgroundColor: "#5484AF",
  },
  NameClick: {
    // height: "max-content",
    // width: "max-content",
    textAlign: "center",
    width: 80,
    fontSize: 11
  },
  TimeCooldown: {
    // height: "max-content",
    // width: "max-content",
    textAlign: "center",
    width: 41,
    fontSize: 11
  },
  TempClick: {
    textAlign: "center",
    width: 41,
    fontSize: 11
  },
  ImgVC_TO: {
    width: 115,
    height: 52,
    backgroundColor: "#67605E",
    borderColor: "black",
    borderLeftWidth: 3.3,
    borderRightWidth: 3.3,
  },
  ImgVCImage: {
    position: "relative",
    width: 115,
    height: 52,
    resizeMode: 'contain'
  },
  SellOn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#A38D8A",
    width: 120,
    height: 26,
    borderColor: "black",
    borderWidth: 3.3
  },
  SellClick_TO: {
    fontSize: 16,
    width: 30,
    height: 20,
    borderColor: "black",
    borderRightWidth: 3.3,
    backgroundColor: "#5484AF",
    alignContent: "center"

  },
  ImgOn_TO: {
    marginTop: 5,
  },
  ImgOnImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  }
})

export default click;