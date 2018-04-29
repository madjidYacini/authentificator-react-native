import React from 'react';
import {StyleSheet, Text, View, Alert, head, Button,Dimensions,AsyncStorage} from 'react-native';
import {Constants, BarCodeScanner, Permissions} from 'expo';
import { connect } from 'react-redux'
import  _  from "lodash" ;



 class Scan extends React.Component {

    state = {
        hasCameraPermission: null,
         didScanned : false
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
    
      this.props.navigation.goBack() ;
           
       
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
        // state.params.add(obj)
        if(_.some(this.props.listing, obj )){
            // alert(`The object ${obj.label} already exist`)
            Alert.alert(
                "Info",
                `The object ${obj.label} already exist`,
                [
                  
                  { text: "Cancel", style: "destructive" ,
                 onPress :()=>{
                  this.props.navigation.goBack()
                 }
                },
              ],
                { cancelable: false }
           );
            
        }else{
          const new_list = [...this.props.listing,obj]
            try {
                let str = JSON.stringify(new_list);
                AsyncStorage.setItem("listing", str).then(() => {
                  this.props.dispatch({
                    type: "QRCODE_ADD",
                    payload: {
                      listing: new_list
                    }
                  });
                });
              } catch (error) {
                  console.log(error)
              }

        // this.props.dispatch({ type: 'QRCODE_ADD', payload: obj })
        Alert.alert(
            "Message ",
            `The object ${obj.label}  has been submitted.`,
            [
                {
                    'text':"View"
                  },
              { text: "Add another", style: "destructive" ,
             onPress :()=>{
                this.props.navigation.navigate("scan")
             }
            }
          ],
            { cancelable: false }
       );
        
        // this.props.navigation.goBack() ;
        }
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

function mapStateToProps(state) {
    return {
      listing: state.listing
    }
  }
  // console.log(this.state.listing)
  
  export default connect(mapStateToProps)(Scan)


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