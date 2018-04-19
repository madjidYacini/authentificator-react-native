import React from 'react';
import { StyleSheet, Text, View, Header,TouchableOpacity,Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
    
        return {
            headerTitle:"AUTHENTIFICATOR",
            
        };
      };
  render() {
    return (
      
    
      <View style={styles.container}>
      
      <TouchableOpacity onPress={() => {
        /* 1. Navigate to the Details route with params */
        this.props.navigation.navigate('Scan', {
         
        });
      }}>
      <Text style = {styles.button}>
         ADD
      </Text>
   </TouchableOpacity>
   <TouchableOpacity>
   <Text style = {styles.buttonTwo}>
      CLEAR
   </Text>
</TouchableOpacity>
      </View>
     
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width : 350,
    textAlign : "center",
    color : "white",
    padding: 25,
    backgroundColor: "#7facf4"
 },buttonTwo: {
   marginTop : 5,
  width : 350,
  textAlign : "center",
  color : "white",
  padding: 25,
  backgroundColor: "#f98100"
}
});
