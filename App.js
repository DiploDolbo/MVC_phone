// import * as Updates from "expo-updates";
import { StatusBar } from 'expo-status-bar';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Alert from './src/components/alert/alert'
import Tab from './src/components/tab/create_tab';
import Frame from './src/components/tab/create_frame';

import autoclick_img from './src/img/autoclick.png';
import room1 from './src/img/home_img/home_lvl1.png';
// import BP_img from './src/img/bp.png';

export default class App extends PureComponent {

  constructor(props) {
    super(props);
    this.time_payment = 72;//время до налогов
    this.coef_watts = 0.01;//коэф Вт в день
    this.count_Buff = 0;
    this.max_count_Buff = 3;
    this.count_VC = 0;
    this.max_count_VC = 3;
    this.count_Cooler = 0;
    this.max_count_Cooler = 5;
    this.count_Energy = 0;
    this.max_count_Energy = 4;
    this.count_Place = 0;
    this.max_count_Place = 3;
    this.count_Room = 1;
    this.max_count_Room = 3;
    this.payment = 0
    this.count_buy_VC = 0;//количество за всё время купленых видюх
    // this.nowork_temp = 0.2;//коэф неработающей VC 
    this.fine_temp = 4;//коэф за перегрев
    this.empty_VC = { text: 'empty', price: 0, voltage: 0 },
      this.empty_Upgrade = { name: 'empty', properties: 0 }
    this.library_Buff = [
      { name: 'autoclick', img: autoclick_img},
    ]
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
        text: 'Помощь братана', func: this.autoClick, price: 100, coef: 0.1,
      },

      {
        buy: true, description: 'Охлади свою видюху',
        name_properties: 'Меньше жара', properties: 10, name: 'Cooler',
        text: 'Aeroheat', func: this.plus_chilling, price: 75, coef: 5
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
    ]
  }

  state = {
    money: 160,
    spentWatts: 0,
    day: 0,
    voltage_VC: 0,
    max_voltage_VC: 0,
    temp_VC: 30,
    max_temp_VC: 80,
    auto_click: { can: false, time: 0 },
    masClick: [],
    masBuff: [],
    masCooler: [],
    masEnergy: [],
    masPlace: [],
    masRoom: [{name: "Room1", img: room1}],
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
      { nameF: "Equipment" }
    ],
    activeFrame: { name: "Click" },
    curtain: false
  }

  componentDidMount() {
    // this.add_click({ text: 'GT730', price: 0,  })
    // this.pluce_voltage_VC(220, 0, 'BP', BP_img)
    // for(let i = 1; i < this.state.max_count_VC; i++) setTimeout(() => {this.add_click({text: 'empty', price: 0})}, 10)
    // this.add_click({text: 'empty', price: 0})
    this.new_game()
    // this.paymentInterval = setInterval(this.paymentTime, this.time_payment * 1000)
    this.spentWattsInterval = setInterval(this.spentWattsFunction, 2400)
  }

  //Тестовые кнопки
  give_test_money = () => {
    this.setState({
      money: 5000
    })
  }

  new_game = () =>{
    this.start_empty();
    this.count_VC = 0;
    this.payment = 0;
    this.count_Cooler = 0;
    this.count_Energy = 0;
    this.count_Place = 0;
    this.count_Buff = 0;
    this.max_count_VC = 0;
    this.count_buy_VC = 0;
    // setTimeout(() => this.add_click({ text: 'GT730', price: 0, newGame: true }), 10)
    this.setState({
      money: 160,
    })
  }

  continue = () => {
    this.getData();
  }

  clearStoreData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys)
    } catch (e) {
      
    }
  }

  ///Сохранения
  storeDataNum = async (num, name) => {
    try {
      await AsyncStorage.setItem(name, num)
    } catch (e) {
      // saving error
    }
  }

  storeDataObj = async (mas, name) => {
    try {
      const jsonValue = JSON.stringify(mas)
      await AsyncStorage.setItem(name, jsonValue)
    } catch (e) {
      
      // saving error
    }
  }



  //

  getData = async () => {
    try {
      const money = await AsyncStorage.getItem('money');
      const payment = await AsyncStorage.getItem('payment');
      const count_VC = await AsyncStorage.getItem('count_VC') ;
      const count_Cooler = await AsyncStorage.getItem('count_Cooler');
      const count_Energy = await AsyncStorage.getItem('count_Energy');
      const count_Place = await AsyncStorage.getItem('count_Place');
      const max_count_VC = await AsyncStorage.getItem('max_count_VC');
      const count_buy_VC = await AsyncStorage.getItem('count_buy_VC')

      const jsonAuto = await AsyncStorage.getItem('auto_click') ;
      const jsonClick = await AsyncStorage.getItem('masClick');
      const jsonBuff = await AsyncStorage.getItem('masBuff');
      const jsonCooler = await AsyncStorage.getItem('masCooler');
      const jsonEnergy = await AsyncStorage.getItem('masEnergy');
      const jsonPlace = await AsyncStorage.getItem('masPlace');

      // console.log(value);
      // if(money && payment && jsonBuff && jsonAuto && jsonClick
      //   && jsonBuff && jsonCooler && jsonEnergy && jsonPlace) {
      if(money){
        this.count_VC = count_VC || this.count_VC;
        this.payment = payment || this.payment;
        this.count_Cooler = count_Cooler || this.count_Cooler;
        this.count_Energy = count_Energy || this.count_Energy;
        this.count_Place = count_Place || this.count_Place;
        this.max_count_VC = max_count_VC || this.max_count_VC;
        this.count_buy_VC = count_buy_VC || this.count_buy_VC;

        this.setState({
          money: money || this.state.money,
          auto_click: JSON.parse(jsonAuto) || this.state.auto_click,
          masClick: JSON.parse(jsonClick) || this.state.masClick,
          masBuff: JSON.parse(jsonBuff) || this.state.masBuff,
          masCooler: JSON.parse(jsonCooler) || this.state.masCooler,
          masEnergy: JSON.parse(jsonEnergy) || this.state.masEnergy,
          masPlace: JSON.parse(jsonPlace) || this.state.masPlace
        })
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }

  // getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('@storage_Key')
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch(e) {
  //     // error reading value
  //   }
  // }
  ///

  // paymentTime = () => {
  //   const { money, spentWatts } = this.state;
    
  //   this.setState({
  //     money: mon,
  //     spentWatts: 0,
  //     day: 0
  //   })
  // }

  spentWattsFunction = () => {
    const { spentWatts, voltage_VC, day, money } = this.state;
    let pay, mon, d;
    if(day == 30){
      pay = spentWatts + this.payment;
      mon = +((+money - pay).toFixed(1));
      this.onAlert(`ПЛАТИ НАЛОГИ ${pay}!`)
      this.storeDataNum(mon, 'money')
      d = 0;
    }
    else{
      pay = +(spentWatts + voltage_VC * this.coef_watts).toFixed(1);
      mon = money
      d = day + 1;
    }
    
    this.setState({
      spentWatts: pay,
      money: mon,
      day: d
    })

  }

  // Update

  start_empty = () => {
    let masClick = [], masBuff = [], masCooler = [], masEnergy = [], masPlace = [];
    const empty = Object.assign({}, this.empty_Upgrade);
    const click = Object.assign({}, this.empty_VC)
    for(let i = 0; i < this.max_count_VC; i++) {masClick.push(click)}
    for (let i = 0; i < this.max_count_Buff; i++) {masBuff.push(empty)}
    for (let i = 0; i < this.max_count_Cooler; i++) {masCooler.push(empty)}
    for (let i = 0; i < this.max_count_Energy; i++) {masEnergy.push(empty)}
    for (let i = 0; i < this.max_count_Place; i++) {masPlace.push(empty)}

    // this.storeDataObj(masBuff, 'masBuff')
    // for (let i = 1; i < this.max_count_Room; i++) {
    //   const empty = Object.assign({}, this.empty_Upgrade);
    //   masRoom.push(empty)
    // }

    this.setState({
      masClick: masClick,
      masBuff: masBuff,
      masCooler: masCooler,
      masEnergy: masEnergy,
      masPlace: masPlace,
      auto_click: { can: false, time: 0 },
      // masRoom: masRoom
    })
  }

  autoClick = (time, price) => {
    const { money, masBuff } = this.state;
    if (money >= price) {
      this.upgrade_VC[0].buy = false;
      let mon = +((+money - price).toFixed(1));
      const auto = this.library_Buff.find(item => item.name == 'autoclick')
      const autoclick = Object.assign({}, auto);

      let masEmpty = [], mas = [], auto_click = { can: true, time: time };

      const oldMas = masBuff.filter(item => item.name != 'empty')

      if (oldMas.length + 1 < this.max_count_Buff) {
        for (let i = oldMas.length + 1; i < this.max_count_Buff; i++) {
          const empty = Object.assign({}, this.empty_Upgrade);
          masEmpty.push(empty);
        }
      }
      this.payment +=  +price * this.upgrade_VC[0].coef
      mas = [...oldMas, autoclick, ...masEmpty]
      this.storeDataNum(mon, 'money');
      this.storeDataNum(this.payment, 'payment')
      this.storeDataObj(mas, 'masBuff');
      this.storeDataObj(auto_click, 'auto_click')
      this.setState({
        masBuff: mas,
        money: mon,
        auto_click: auto_click,
      })
    }
    else if (money < price) {
      this.onAlert('Не хватает')
    }
  }

  pluce_voltage_VC = (count, price, name, img) => {
    const { money, masEnergy } = this.state;
    if (money >= price && this.count_Energy < this.max_count_Energy) {
      let mon = +((+money - price).toFixed(1));
      this.count_Energy += 1;
      let masEmpty = [];

      const oldMas = masEnergy.filter(item => item.name != 'empty')

      if (oldMas.length + 1 < this.max_count_Energy) {
        for (let i = oldMas.length + 1; i < this.max_count_Energy; i++) {
          const empty = Object.assign({}, this.empty_Upgrade);
          masEmpty.push(empty);
        }
      }
      const newMas = [...oldMas, {name: name, properties: count, img: img}, ...masEmpty]
      this.storeDataNum(mon, 'money');
      this.storeDataNum(this.count_Energy, 'count_Energy')
      this.storeDataObj(newMas, 'masEnergy')
      this.setState({
        money: mon,
        masEnergy: newMas,
        max_voltage_VC: this.state.max_voltage_VC + count
      })
    }
    else if (money < price) {
      this.onAlert('Не хватает')
    }
    else if (this.count_Energy == this.max_count_Energy) {
      this.onAlert('Некуда ставить')
    }
  }

  plus_count_VC = (count, price, name, img) => {
    const { money, masClick, masPlace } = this.state;
    if (money >= price && this.count_Place < this.max_count_Place) {
      let mon = +((+money - price).toFixed(1));
      this.max_count_VC += count
      this.count_Place += 1

      let masEmpty = [];

      const emptyClick = Object.assign({}, this.empty_VC);
      const newMasClick = [...masClick, emptyClick]

      const oldMas = masPlace.filter(item => item.name != 'empty')

      if (oldMas.length + 1 < this.max_count_Place) {
        for (let i = oldMas.length + 1; i < this.max_count_Place; i++) {
          const empty = Object.assign({}, this.empty_Upgrade);
          masEmpty.push(empty);
        }
      }
      const newMas = [...oldMas, {name: name, properties: count, img: img}, ...masEmpty]
      this.storeDataNum(mon, 'money');
      this.storeDataNum(this.count_Place, 'count_Place')
      this.storeDataNum(this.max_count_VC, 'max_count_VC')
      this.storeDataObj(newMas, 'masPlace');
      this.storeDataObj(newMasClick, 'masClick')
      this.setState({
        money: mon,
        masClick: newMasClick,
        masPlace: newMas
      })
    }
    else if (money < price) {
      this.onAlert('Не хватает')
    }
    else if (this.count_Place == this.max_count_Place) {
      this.onAlert('Некуда ставить')
    }
  }

  plus_chilling = (count, price, name, img) => {
    const { money, voltage_VC, masCooler } = this.state;
    if (money >= price && this.count_Cooler < this.max_count_Cooler) {
      let mon = +((+money - price).toFixed(1));
      this.count_Cooler += 1;
      let masEmpty = [];

      const oldMas = masCooler.filter(item => item.name != 'empty')

      if (oldMas.length + 1 < this.max_count_Cooler) {
        for (let i = oldMas.length + 1; i < this.max_count_Cooler; i++) {
          const empty = Object.assign({}, this.empty_Upgrade);
          masEmpty.push(empty);
        }
      }
      const newMas = [...oldMas, { name: name, properties: count / 100, img: img}, ...masEmpty]
      this.storeDataNum(mon, 'money');
      this.storeDataNum(this.count_Cooler, 'count_Cooler')
      this.storeDataObj(newMas, 'masCooler')
      this.setState({
        money: mon,
        masCooler: newMas,
        voltage_VC: voltage_VC + this.upgrade_VC[3].coef,
      })
    }
    else if (money < price) {
      this.onAlert('Не хватает')
    }
    else if (this.count_Cooler == this.max_count_Cooler) {
      this.onAlert('Некуда ставить')
    }

  }

  // 

  click = (plus, temperature) => {
    const { money, max_temp_VC } = this.state;
    let mon, minus;
    if (temperature <= max_temp_VC) {
      mon = +((+money + plus).toFixed(1));
    }
    else {
      minus = 1 - ((temperature / max_temp_VC) - 1) * this.fine_temp;
      mon = +((+money + plus * minus).toFixed(1))
    }

    this.storeDataNum(mon);
    this.setState({
      money: mon,
    })

  }

  up_voltage = (voltage, working, index, temp_room, oldChil) => {
    let volt, t, chil = 0;

    this.state.masCooler.map((item) => chil += item.properties)
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

  add_click = ({ text, price, newGame }) => {
    const { masClick, money} = this.state;
    const indexClick = this.library_VC.findIndex(item => item.text === text)
    const nClick = this.library_VC.slice(indexClick, indexClick + 1);
    const newClick = Object.assign({}, nClick[0]);
    let masEmpty = [];

    const oldMasClick = masClick.filter(item => item.text != 'empty')

    this.count_buy_VC++;
    newClick.working = false;
    newClick.id = this.count_buy_VC;
    let mon = +((+money - price).toFixed(1))
    if (oldMasClick.length + 1 < this.max_count_VC) {
      for (let i = oldMasClick.length + 1; i < this.max_count_VC; i++) {
        const emptyClick = Object.assign({}, this.empty_VC);
        masEmpty.push(emptyClick);
      }
    }
    const newMas = [...oldMasClick, newClick, ...masEmpty]
    this.count_VC += 1;
    if(!newGame){
      this.storeDataNum(mon, 'money');
      this.storeDataNum(this.count_VC, 'count_VC')
      this.storeDataObj(newMas, 'masClick')
    }
    this.setState({
      masClick: newMas,
      money: mon,
    })
  }

  buy_click = ({ text, price }) => {
    const { money } = this.state;
    if (money >= price && this.count_VC < this.max_count_VC) { this.add_click({ text, price, newGame: false}) }
    else if (money < price) {
      this.onAlert('Не хватает')
    }
    // else if (voltage_VC >= max_voltage_VC){
    //   this.onAlert('БП не потянет')
    // }
    else if (this.count_VC >= this.max_count_VC) {
      this.onAlert('Нет места')
    }
  }

  sell_click = (index, working, temp_room) => {
    const { masClick, money, voltage_VC } = this.state;
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
    this.count_VC -= 1;
    this.storeDataNum(mon, 'money');
    this.storeDataNum(this.count_VC, 'count_VC')
    this.setState({
      money: mon,
      masClick: newMasClick,
      voltage_VC: voltage_VC - volt,
      temp_VC: t
    })
  }

  turn_on_off_VC = (voltage, working, index, VC_on, temp_room, oldChil) => {
    let volt, t = this.state.temp_VC, chil = 0;
    // const indexClick = this.state.masClick.findIndex((item) => { return item.id === id && item.text === text })
    this.state.masCooler.map((item) => chil += item.properties)
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
    const { name } = this.state.activeFrame;

    if (nameWP === name) return;
    else {
      this.setState({
        activeFrame: { name: nameWP }
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
      money, masClick, masCooler, masEnergy, masPlace, masRoom,
      masBuff, activeAlert, tab, frame, activeFrame, auto_click,
      voltage_VC, max_voltage_VC, temp_VC, max_temp_VC, spentWatts, day, curtain
    } = this.state;
    return (
      <View className='App'>
        <View style={styles.AppHeader}>
          <TouchableOpacity onPress={this.give_test_money} style={[{ borderWidth: 1, borderColor: 'black', width: 20, height: 20 }]}>
            <Text>$</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.new_game} style={[{ borderWidth: 1, borderColor: 'black', width: 20, height: 20 }]}>
            <Text>N</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.continue} style={[{ borderWidth: 1, borderColor: 'black', width: 20, height: 20 }]}>
            <Text>C</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.clearStoreData} style={[{ borderWidth: 1, borderColor: 'black', width: 20, height: 20 }]}>
            <Text>D</Text>
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
          masCooler={masCooler}
          masEnergy={masEnergy}
          masPlace={masPlace}
          masRoom={masRoom}
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
          up_voltage={this.up_voltage}
          voltage_VC={voltage_VC}
          max_voltage_VC={max_voltage_VC}
          temp_VC={temp_VC}
          max_temp_VC={max_temp_VC}
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
  masClick, masBuff, masCooler, masEnergy, masPlace, masRoom,
  money, onClick, buy_click, sell_click,
  library_VC, upgrade_VC, auto_click, tab, frame,
  activeFrame, onSwitch, up_voltage, max_voltage_VC, voltage_VC, temp_VC,
  max_temp_VC, onAlert, turn_on_off_VC, spentWatts, day, curtain, switch_curtain,
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
          <View style={[{ width: 164, height: 108}]}>
            <View style={[{ flexDirection: 'row', height: 54 }]}>
              {
                masBuff.map((item, i) => {
                  if (item.name == 'empty'){return (<View key={`empty_Buff_${i}`} style={styles.Empty}></View>) }
                  else {
                    const { img } = item;
                    return (
                      <View key={`empty_Buff_${i}`} style={[{ width: 50, height: 50, margin: 1 }]}>
                        <Image style={[{ width: 50, height: 50, resizeMode: 'contain' }]} key={`buff_${i}`} source={img}></Image>
                      </View>
                    )
                  }
                })
              }
            </View>
            <View >
              <TouchableOpacity activeOpacity={0.6} onPress={() => { onSwitch('Equipment') }} style={styles.Equipment}>
                <Text style={[{ textAlign: "center", fontSize: 26 }]}>Оснащение</Text>
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
            <View style={[{ position: "absolute", right: 0 }]}>
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
            masBuff={masBuff}
            masCooler={masCooler}
            masEnergy={masEnergy}
            masPlace={masPlace}
            masRoom={masRoom}
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
    width: 156,
    height: 52,
    justifyContent: "center",
    borderColor: 'black',
    borderWidth: 3.3
  },
  Empty: {
    width: 50,
    height: 50,
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
});
