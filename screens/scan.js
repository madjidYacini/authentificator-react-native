import React from 'react';
import { StyleSheet, Text, View, Header,TouchableOpacity,Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
export default class Scan extends React.Component {
    
    static navigationOptions = ({ navigation, navigationOptions }) => {
      const { params } = navigation.state;
  
      return {
        title: params ? params.otherParam : 'A Nested Details Screen',
        /* These values are used instead of the shared configuration! */
        headerStyle: {
          backgroundColor: navigationOptions.headerTintColor,
        },
       
      };
    };
  
    render() {
      /* 2. Read the params from the navigation state */
      const { params } = this.props.navigation.state;
      const itemId = params ? params.itemId : null;
      const otherParam = params ? params.otherParam : null;
  
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Details Screen</Text>
         
         
        </View>
      );
    }
  }