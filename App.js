import React from 'react';
import { StyleSheet, Text, View, Header,TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/home';
import Scan from './screens/scan';
import { BarCodeScanner, Permissions } from 'expo';


console.disableYellowBox = true
export default class App extends React.Component {
  
  render() {
    return (
      
    <RootStack />
     
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
