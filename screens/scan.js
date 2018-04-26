import React from 'react';
import {StyleSheet, Text, View, Alert, head, Button,Dimensions,AsyncStorage} from 'react-native';
import {Constants, BarCodeScanner, Permissions} from 'expo';


export default class Scan extends React.Component {

    state = {
        hasCameraPermission: null,
        didScanned : false,
    };

    componentDidMount() {
        this._requestCameraPermission();
    }

    

    _requestCameraPermission = async () => {
        
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };


    _handleBarCodeRead = ({data}) => {
      const {state, goBack } = this.props.navigation
        
        const regex = (/^otpauth:\/\/totp\/(.+)\?secret=(.+)&issuer=(.*)/)
        
        let values =  data.match(regex);
        if(values != null){
        label = values[1]
        secret =  values[2]
        issuer =  values[3]
        const obj =  {
            label,
            secret,
            issuer
          }
        state.params.add(obj)
        this.props.navigation.goBack() ;
        }else{
            Alert.alert(
                'Information',
                'this QR Code doesn\'t match sorry :(',
                [
                 
                  
                  {text: 'OK', onPress: () =>  this.props.navigation.goBack() },
                ],
                { cancelable: false }
              )
        
            
        }
        

        



    };
    static navigationOptions = {
        title: "Scanner",
        headerStyle:{
            backgroundColor:'#b0ed6f',
        },
        titleStyle :{
            textAlign : 'center',
        }
      };

    render() {
        return (

            
            <View style={styles.container}>
                {this.state.hasCameraPermission === null ?
                    <Text>Requesting for camera permission</Text> :
                    this.state.hasCameraPermission === false ?
                        <Text>Camera permission is not granted</Text> :
                        <BarCodeScanner
                            onBarCodeRead={this._handleBarCodeRead}
                            style={{flex: 0,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'transparent',
                                height: Dimensions.get('window').width,
                                width: Dimensions.get('window').width,}}
                        />
                }
                <Text> {this.state.secret}  {this.state.label}  {this.state.issuer} </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    buttonAdd: {
        alignItems: 'center',
        backgroundColor: '#8bc900',
        padding: 10,
        marginBottom: 30,
        marginTop: 50
    },

});