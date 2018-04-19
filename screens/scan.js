import React from 'react';
import { StyleSheet, Text, View, Header,TouchableOpacity,Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { BarCodeScanner, Permissions } from 'expo';



export default class Scan extends React.Component {
    state = {
        hasCameraPermission: null,
      }
    
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

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
        }

  
    render() {
        const { hasCameraPermission } = this.state;
    
        if (hasCameraPermission === null) {
          return <Text>Requesting for camera permission</Text>;
        } else if (hasCameraPermission === false) {
          return <Text>No access to camera</Text>;
        } else {
          return (
            <View style={{ flex: 1 }}>
              <BarCodeScanner
                onBarCodeRead={this._handleBarCodeRead}
                style={StyleSheet.absoluteFill}
              />
            </View>
          );
        }
      }
    
      _handleBarCodeRead = ({ type, data }) => {
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);

        const values = data.match(/^otpauth:\/\/totp\/(\w+)\?secret=(\w+)&issuer=(\w+)?$/)
        console.log(values)
      }
  }