import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView,Alert, AsyncStorage} from 'react-native';
import { StackNavigator } from "react-navigation";
import { ScanScreen } from "./scan";
import  _  from "lodash" ;


export default class HomeScreen extends React.Component {
 
    state = {
      listing: []
    };
  

    async componentWillMount(){
        try {
          const result = await AsyncStorage.getItem('listing')
          if (result) {
            list  = JSON.parse(result) ;
            this.setState({listing:JSON.parse(result)});
          }
        } catch (e) {
          console.log(e);
        }
      }
    
    
      async pushItem(list){
        try {
            await AsyncStorage.setItem('listing',list);
          } catch (error) {
            console.log(error)
        }
      }
    
      _add = obj => {
        if(_.some(this.state.listing, obj )){
          alert(`The object ${obj.label} already exist`)
    
        } else {
            alert(`the object ${obj.label} added successefuly`)
          this.setState({listing:[...this.state.listing, obj]}, () => {
            list = JSON.stringify(this.state.listing)
            
            this.pushItem(list)
    
          });
    
    
        }
    
      };
    
   
      clear = () => {
          if(this.state.listing.length == 0){
            Alert.alert(
                'Message',
                'you don\'t have items to delete',
                [
                 
                  {text: 'Cancel', style: 'cancel'},
                  
                ],
                { cancelable: false }
              ) 
          }else{
        Alert.alert(
            'Confirm',
            'Are you sure to delete these items ?',
            [
             
              {text: 'Cancel', style: 'cancel'},
              {text: 'OK', onPress: () =>  this.setState({listing:[]})},
            ],
            { cancelable: false }
          )
        }
       
        
      };
    
      static navigationOptions = {
        title: "Authentificator",
        headerStyle:{
            backgroundColor:'#b0ed6f',
        },
        style: {
            textAlign: 'center',
         },
      };
    
      render()
       {
           const list = this.state.listing.map((item , id ) => {
            
               return (
                   <View  key = {id}>
                       <Text style={styles.ListText}>
                           {item.secret} {item.label} {item.issuer}
                       </Text>
                   </View>
               )
           })
    
           return (
               <View style={styles.container}>
                   <TouchableOpacity
                       style={styles.buttonAdd}
                       onPress={() =>
                           this.props.navigation.navigate("scan", {
                               add: this._add
                           })
                       }
                   >
                       <Text> ADD </Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.buttonClear} onPress={this.clear} >
                       <Text> CLEAR</Text>
                   </TouchableOpacity>
                   <ScrollView>
                   <Text>Items</Text>
                   {list}
                   </ScrollView>
    
    
               </View>
           );
       }
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
      
        paddingHorizontal: 10
      },
      buttonAdd: {
        alignItems: "center",
        backgroundColor: "#45c0f9",
        padding: 10,
        marginBottom: 20,
        marginTop: 20
      },
      buttonClear: {
        alignItems: "center",
        backgroundColor: "#ff0000",
        padding: 10
      },
      ListText: {
        alignItems: "center",
        color: '#000000',
        backgroundColor: "#f99c22",
      
        marginTop : 10,
        padding: 10
    }
    });