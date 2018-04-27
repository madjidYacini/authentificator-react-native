import React from 'react';
import { StyleSheet, Text, View, Header,TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/home';
import Scan from './screens/scan';
import { BarCodeScanner, Permissions } from 'expo';
import { Provider } from 'react-redux'
import { createStore } from 'redux'


console.disableYellowBox = true

const initial_state = {
  listing : []
}

function reducer(prev_state = initial_state, action){
  // console.log("this is qrcodelist",qrcodeList)
 switch(action.type){
   case 'QRCODE_CLEAR':
    return Object.assign({},prev_state,{
      listing : []
    });
    case "QRCODE_ADD":
    const tmpList = [...prev_state.listing,action.payload]
    return Object.assign({},prev_state,{
      listing : tmpList
    });
    default:
    return prev_state
 }
}
const store = createStore(reducer)

export default class App extends React.Component {
  
  render() {
    return (
      <Provider store={store}>    
    <RootStack />
     </Provider>
    );
  }
}
const RootStack = StackNavigator ({
  home : {
    screen : HomeScreen,
  }, 
  scan: {
    screen: Scan,
  },
})
