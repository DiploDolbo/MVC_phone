// import * as Updates from "expo-updates";
import { StatusBar } from 'expo-status-bar';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import Alert from './src/components/alert/alert'
import Tab from './src/components/tab/create_tab';
import Frame from './src/components/tab/create_frame';

import autoclick_img from './src/img/autoclick.png';


export default class App extends PureComponent {

  constructor(props) {
    super(props);
    this.time_payment = 72;//время до налогов
    this.coef_watts = 0.01;//коэф Вт в день
    this.count_buy_VC = 0;//количество за всё время купленых видюх
    // this.nowork_temp = 0.2;//коэф неработающей VC 
    this.fine_temp = 4;//коэф за перегрев
    this.empty_VC = { text: 'empty', price: 0, voltage: 0 },
    this.library_Buff = [{name: 'autoclick', img: autoclick_img}]
    this.library_VC =
      [
        { time_1_percent: 2.4, text: 'ATI4600', plus: 1, price: 30, voltage: 20, coif_volt: 0.5, temp: 40, temp_room: 4, oldChil: 0 },
        { time_1_percent: 2.4, text: 'GT730', plus: 2, price: 50, voltage: 30, coif_volt: 0.5, temp: 40, temp_room: 4, oldChil: 0 },
        { time_1_percent: 2.4, text: 'GT750', plus: 3, price: 80, voltage: 50, coif_volt: 0.5, temp: 35, temp_room: 3, oldChil: 0 },
        { time_1_percent: 2.4, text: 'GT760', plus: 4, price: 160, voltage: 100, coif_volt: 0.5, temp: 35, temp_room: 3, oldChil: 0 },
        { time_1_percent: 2.4, text: 'HP_G6', plus: 3, price: 200, voltage: 60, coif_volt: 0.5, temp: 20, temp_room: 2, oldChil: 0 },
        { time_1_percent: 2.4, text: 'i5_6400', plus: 5, price: 200, voltage: 30, coif_volt: 0.5, temp: 20, temp_room: 2, oldChil: 0 },
      ];
    this.upgrade_VC = [
      {
        buy: true, description: 'Братан будет кликать за тебя',
        name_properties: 'Время задержки', properties: 0.5, name: 'autoclick',
        text: 'Помощь братана', func: this.autoClick, price: 100, coef: 0.1
      },

      {
        buy: true, description: 'Aerocool топ за сови деньги',
        name_properties: 'Ватт', properties: 220, name: 'BP',
        text: 'БП по лучше', func: this.pluce_voltage_VC, price: 100, coef: 0
      },

      {
        buy: true, description: 'Ещё одна полочка',
        name_properties: 'Плюс место', properties: 1, name: 'FP',
        text: "Освободить место", func: this.plus_count_VC, price: 200, coef: 0
      },

      {
        buy: true, description: 'Охлади свою видюху',
        name_properties: 'Меньше жара', properties: 10, name: 'Cooler',
        text: 'Aeroheat', func: this.plus_chilling, price: 75, coef: 5
      }
    ]
    this.masCooler = []
  }

  state = {
    money: 0,
    spentWatts: 0,
    day: 0,
    count: 0,
    payment: 0,
    count_VC: 0,
    max_count_VC: 3,
    voltage_VC: 0,
    max_voltage_VC: 220,
    temp_VC: 30,
    max_temp_VC: 80,
    count_Cooler: 0,
    max_count_Cooler: 5,
    auto_click: { can: false, time: 0 },
    masClick: [],
    masBuff: [],
    activeAlert: {},
    tab: [
      { nameWP: "Click", text: "ГЛАВНОЕ" },
      { nameWP: "Shop", text: "МАГАЗИН" },
      { nameWP: "Upgrade", text: "УЛУЧШИТЬ" },
      { nameWP: "Test_1", text: "Text_1" },
      { nameWP: "Test_2", text: "Text_2" },
      { nameWP: "Test_3", text: "Text_3" },
    ],
    frame: [
      { nameF: "Click" },
      { nameF: "Shop" },
      { nameF: "Upgrade" },
      { nameF: "Equipment"}
    ],
    activeFrame: { name: "Equipment" },
    curtain: false
  }

  componentDidMount() {
    this.add_click({ text: 'GT730', price: 0 })
    // for(let i = 1; i < this.state.max_count_VC; i++) setTimeout(() => {this.add_click({text: 'empty', price: 0})}, 10)
    // this.add_click({text: 'empty', price: 0})
    this.paymentInterval = setInterval(this.paymentTime, this.time_payment * 1000)
    this.spentWattsInterval = setInterval(this.spentWattsFunction, 2400)
  }

  give_test_money = () => {
    this.setState({
      money: 5000
    })
  }

  paymentTime = () => {
    const { money, payment, spentWatts } = this.state;
    let pay = spentWatts + payment;
    let mon = (+money - pay).toFixed(1);
    this.onAlert(`ПЛАТИ НАЛОГИ ${pay}!`)
    console.log(pay)
    this.setState({
      money: mon,
      spentWatts: 0,
      day: 0
    })
  }

  spentWattsFunction = () => {
    const { spentWatts, voltage_VC, day } = this.state;
    let pay = +(spentWatts + voltage_VC * this.coef_watts).toFixed(1)
    let d = day + 1;
    this.setState({
      spentWatts: pay,
      day: d
    })

  }

  // Update

  autoClick = (time, price) => {
    const { money, payment, masBuff} = this.state;
    if (money >= price) {
      this.upgrade_VC[0].buy = false;
      let mon = (+money - price).toFixed(1);
      const auto = this.library_Buff.find(item => item.name == 'autoclick')
      const autoclick = Object.assign({}, auto);
      this.setState({
        masBuff: [...masBuff, autoclick],
        money: mon,
        payment: +payment + price * this.upgrade_VC[0].coef,
        auto_click: { can: true, time: time },
      })
    }
    else if (money < price) {
      this.onAlert('Не хватает')
    }
  }

  pluce_voltage_VC = (count, price) => {
    const { money, payment } = this.state;
    if (money >= price) {
      let mon = (+money - price).toFixed(1);
      this.setState({
        money: mon,
        payment: +payment + price * this.upgrade_VC[1].coef,
        max_voltage_VC: this.state.max_voltage_VC + count
      })
    }
    else if (money < price) {
      this.onAlert('Не хватает')
    }
  }

  plus_count_VC = (count, price) => {
    const { money, payment, masClick } = this.state;
    const emptyClick = Object.assign({}, this.empty_VC);

    const newMasClick = [...masClick, emptyClick]
    if (money >= price) {
      let mon = (+money - price).toFixed(1);

      this.setState({
        money: mon,
        masClick: newMasClick,
        payment: +payment + price * this.upgrade_VC[2].coef,
        max_count_VC: this.state.max_count_VC + count
      })
    }
    else if (money < price) {
      this.onAlert('Не хватает')
    }
  }

  plus_chilling = (count, price) => {
    const { money, voltage_VC, count_Cooler, max_count_Cooler } = this.state;
    if (money >= price && count_Cooler < max_count_Cooler) {
      let mon = (+money - price).toFixed(1);
      this.masCooler.push(count / 100);
      this.setState({
        money: mon,
        voltage_VC: voltage_VC + this.upgrade_VC[3].coef,
        count_Cooler: count_Cooler + 1
      })
    }
    else if (money < price) {
      this.onAlert('Не хватает')
    }
    else if (count_Cooler > max_count_Cooler) {
      this.onAlert('Некуда ставить')
    }

  }

  // 

  click = (plus, temperature) => {
    const { money, max_temp_VC } = this.state;
    let mon, minus;
    if (temperature <= max_temp_VC) {
      mon = (+money + plus).toFixed(1);
    }
    else {
      minus = 1 - ((temperature / max_temp_VC) - 1) * this.fine_temp;
      mon = (+money + plus * minus).toFixed(1)
    }
    this.setState({
      money: mon,
    })

  }

  up_voltage = (voltage, working, index, coef, temp, temp_room, oldChil) => {
    let volt, t, chil = 0;

    this.masCooler.map((item) => chil += item)
    // const indexClick = this.state.masClick.findIndex((item) => { return item.id === id && item.text === text })
    const fClick = this.state.masClick.slice(0, index);
    const sClick = this.state.masClick.slice(index + 1);
    let click = Object.assign({}, this.state.masClick[index]);
    if (!working) {
      volt = this.state.voltage_VC + voltage;
      t = +((this.state.temp_VC + temp_room * (1 - chil)).toFixed(1));
      click.working = true;
    }
    else {
      if (oldChil < chil) { chil = oldChil; }
      volt = this.state.voltage_VC - voltage;
      t = +((this.state.temp_VC - temp_room * (1 - chil)).toFixed(1));
      click.working = false;
    }
    click.oldChil = chil;
    this.setState({
      masClick: [...fClick, click, ...sClick],
      voltage_VC: volt,
      temp_VC: t
    })
  }

  add_click = ({ text, price }) => {
    const { masClick, money, count_VC, voltage_VC, max_count_VC } = this.state;
    const indexClick = this.library_VC.findIndex(item => item.text === text)
    const nClick = this.library_VC.slice(indexClick, indexClick + 1);
    const newClick = Object.assign({}, nClick[0]);
    let masEmpty = [];

    const newMasClick = masClick.filter(item => item.text != 'empty')

    this.count_buy_VC++;
    newClick.working = false;
    newClick.id = this.count_buy_VC;
    let mon = (+money - price).toFixed(1)
    if (newMasClick.length + 1 < max_count_VC) {
      for (let i = newMasClick.length + 1; i < max_count_VC; i++) {
        const emptyClick = Object.assign({}, this.empty_VC);
        masEmpty.push(emptyClick);
      }
    }

    this.setState({
      masClick: [...newMasClick, newClick, ...masEmpty],
      money: mon,
      count_VC: count_VC + 1,
      voltage_VC: voltage_VC + newClick.voltage,
    })
  }

  buy_click = ({ text, price }) => {
    const { money, count_VC, max_count_VC } = this.state;
    if (money >= price && count_VC < max_count_VC) { this.add_click({ text, price }) }
    else if (money < price) {
      this.onAlert('Не хватает')
    }
    // else if (voltage_VC >= max_voltage_VC){
    //   this.onAlert('БП не потянет')
    // }
    else if (count_VC >= max_count_VC) {
      this.onAlert('Нет места')
    }
  }

  sell_click = (index, working, temp_room) => {
    const { masClick, money, count_VC, voltage_VC} = this.state;
    // const index = masClick.findIndex((item) => { return item.id === id && item.text === text })
    const emptyClick = Object.assign({}, this.empty_VC);

    const newMasClick = [...masClick.slice(0, index), ...masClick.slice(index + 1), emptyClick]
    const price = masClick[index].price;
    // const pay = (+payment - price * 0.1).toFixed(1);
    let mon = +(+money + price * 0.9).toFixed(1);
    let volt, t, chil = 0;
    if (working) {
      volt = masClick[index].voltage * 2;
      this.masCooler.map((item) => chil += item);
      t = +((this.state.temp_VC - temp_room * (1 - chil)).toFixed(1));
    }
    else {
      volt = masClick[index].voltage
      t = this.state.temp_VC;
    };
    this.setState({
      money: mon,
      masClick: newMasClick,
      count_VC: count_VC - 1,
      voltage_VC: voltage_VC - volt,
      temp_VC: t
    })
  }

  turn_on_off_VC = (voltage, working, index, VC_on, coif_volt, temp, temp_room, oldChil) => {
    let volt, t = this.state.temp_VC, chil = 0;
    // const indexClick = this.state.masClick.findIndex((item) => { return item.id === id && item.text === text })
    this.masCooler.map((item) => chil += item)
    const fClick = this.state.masClick.slice(0, index);
    const sClick = this.state.masClick.slice(index + 1);
    let click = Object.assign({}, this.state.masClick[index]);
    if (working && !VC_on) {
      if (oldChil < chil) {
        chil = oldChil;
      }
      volt = this.state.voltage_VC - voltage * 2;
      t = +((this.state.temp_VC - temp_room * (1 - chil)).toFixed(1))

    }
    else if (!working && !VC_on) {
      volt = this.state.voltage_VC - voltage;
    }
    else if (VC_on) {
      volt = this.state.voltage_VC + voltage;
    }
    click.working = false;
    click.oldChil = chil;

    this.setState({
      masClick: [...fClick, click, ...sClick],
      voltage_VC: volt,
      temp_VC: t
    })

  }

  //Alert
  onAlert = (message) => {
    const newAlert = { text: message, id: 0 };
    this.setState({
      activeAlert: newAlert
    })
  }

  closeAlert = () => {
    this.setState({
      activeAlert: {}
    })
  }

  //Tab
  onSwitch = (nameWP) => {
    const { name} = this.state.activeFrame;

    if (nameWP === name) return;
    else {
      this.setState({
        activeFrame: { name: nameWP}
      })
    }
  }

  switch_curtain = () => {
    const { curtain } = this.state
    this.setState({
      curtain: !curtain
    })
  }

  render() {
    const {
      money, masClick, masBuff, activeAlert, tab, frame,
      activeFrame, auto_click, count_VC, max_count_VC,
      voltage_VC, max_voltage_VC, temp_VC, max_temp_VC,
      count_Cooler, max_count_Cooler, spentWatts, day,
      curtain
    } = this.state;
    return (
      <View className='App'>
        <View style={styles.AppHeader}>
          <TouchableOpacity onPress = {this.give_test_money} style={[{borderWidth: 1, borderColor: 'black',width:20, height:20}]}>
            <Text>$</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 30 }}>MINER VIDEOCARD</Text>
        </View>
        <Alert
          activeAlert={activeAlert}
          closeAlert={this.closeAlert}
        ></Alert>
        <GamePlace
          masClick={masClick}
          masBuff={masBuff}
          money={money}
          onClick={this.click}
          buy_click={this.buy_click}
          sell_click={this.sell_click}
          library_VC={this.library_VC}
          upgrade_VC={this.upgrade_VC}
          auto_click={auto_click}
          tab={tab}
          frame={frame}
          activeFrame={activeFrame}
          onSwitch={this.onSwitch}
          count_VC={count_VC}
          max_count_VC={max_count_VC}
          up_voltage={this.up_voltage}
          voltage_VC={voltage_VC}
          max_voltage_VC={max_voltage_VC}
          temp_VC={temp_VC}
          max_temp_VC={max_temp_VC}
          count_Cooler={count_Cooler}
          max_count_Cooler={max_count_Cooler}
          onAlert={this.onAlert}
          turn_on_off_VC={this.turn_on_off_VC}
          spentWatts={spentWatts}
          day={day}
          curtain={curtain}
          switch_curtain={this.switch_curtain}
        ></GamePlace>
        <StatusBar hidden={true}></StatusBar>
      </View>
    )
  }
}

const GamePlace = ({
  masClick, masBuff, money, onClick, buy_click, sell_click,
  library_VC, upgrade_VC, auto_click, tab, frame,
  activeFrame, onSwitch, max_count_VC, count_VC,
  up_voltage, max_voltage_VC, voltage_VC, temp_VC,
  max_temp_VC, count_Cooler, max_count_Cooler, onAlert,
  turn_on_off_VC, spentWatts, day, curtain, switch_curtain,
}) => {
  return (
    <View style={styles.GamePlace}>
      <View style={styles.ShopUpgrade}>
        <View style={styles.TabSU}>
          {/* <Text>Тут будет вкладки</Text> */}
          <Tab
            tab={tab}
            activeFrame={activeFrame}
            onSwitch={onSwitch}
            curtain={curtain}
            switch_curtain={switch_curtain}
          >
          </Tab>
        </View>
        <View style={styles.GameInfoImg}>
          <View style={[{ width: 164, height: 108, borderWidth: 3.3, borderColor: 'black' }]}>
            <View style={[{flexDirection: 'row', height: 54}]}>
              {
                masBuff.map((item, i) => {
                  const {img} = item;
                  return(
                    <View style={[{width: 50, height: 50, padding: 5}]}>
                      <Image style={[{width: 48, height: 48, resizeMode: 'contain'}]} key = {`buff_${i}`} source = {img}></Image>
                    </View>
                  )
                })
              }
            </View>
            <View style={[{alignItems: 'center'}]}>
              <TouchableOpacity activeOpacity={0.6} onPress={() => {onSwitch('Equipment')}} style={styles.Equipment}>
                <Text style={[{textAlign: "center", fontSize: 26}]}>Оснащение</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.GameInfo}>
            <View style={[{ textAlign: 'left' }]}>
              <Text>Баланс:</Text>
              <Text>Мощность:</Text>
              <Text>Температура:</Text>
              <Text>День:</Text>
              <Text>Налоги:</Text>
            </View>
            <View style={[{position: "absolute", right: 0 }]}>
              <Text style={[{ textAlign: 'right' }]}>{money} $</Text>
              <Text style={[{ textAlign: 'right' }]}>{voltage_VC}/{max_voltage_VC} Вт</Text>
              <Text style={[{ textAlign: 'right' }]}>{temp_VC}/{max_temp_VC} С°</Text>
              <Text style={[{ textAlign: 'right' }]}>{day}</Text>
              <Text style={[{ textAlign: 'right' }]}>{spentWatts} $</Text>
            </View>
          </View>
        </View>
        <View style={styles.Frames}>
          {/* <Text>Тут будет экраны</Text> */}
          <Frame
            frame={frame}
            activeFrame={activeFrame}
            buy_click={buy_click}
            sell_click={sell_click}
            library_VC={library_VC}
            upgrade_VC={upgrade_VC}
            auto_click={auto_click}
            masClick={masClick}
            onClick={onClick}
            up_voltage={up_voltage}
            money={money}
            voltage_VC={voltage_VC}
            max_voltage_VC={max_voltage_VC}
            onAlert={onAlert}
            turn_on_off_VC={turn_on_off_VC}
            temp_VC={temp_VC}
          >
          </Frame>
        </View>
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  AppHeader: {
    backgroundColor: '#B7A6A1',
    width: "100%",
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#131212',
  },
  GamePlace: {
    flexDirection: "row",
    height: "100%",
    width: "100%"
  },
  ShopUpgrade: {
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "#2C2D2F"
  },
  TabSU: {
    flexDirection: "column",
    height: 74,
    width: "100%"
  },
  GameInfoImg: {
    marginTop: 15,
    height: 128,
    width: 390,
    borderWidth: 3.3,
    borderColor: "black",
    backgroundColor: "#A38D8A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  GameInfo: {
    width: 198,
    height: 108,
    flexDirection: "column",
    paddingRight: 10,
    textAlign: "left",
    flexWrap: 'wrap',
    fontSize: 16,
    borderWidth: 3.3,
    borderColor: "black",
    backgroundColor: "#5484AF",
  },
  Frames: {
    position: 'relative',
    width: "100%"
  },
  Equipment: {
    width:150,
    height: 42,
    justifyContent:"center",
    borderColor: 'black',
    borderWidth: 3.3
  }
});
