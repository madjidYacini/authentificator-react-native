import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView,Alert, AsyncStorage} from 'react-native';
import { StackNavigator } from "react-navigation";
import { ScanScreen } from "./scan";
import  _  from "lodash" ;
import { connect } from 'react-redux'


 class HomeScreen extends React.Component {
 

    async componentWillMount(){
        try {
          const result = await AsyncStorage.getItem('listing')
          if (result) {
            listing  = JSON.parse(result) ;
            this.setState({listing:JSON.parse(result)});
          }
        } catch (e) {
          console.log(e);
        }
      }
    
    
      async pushItem(listing){
        try {
            await AsyncStorage.setItem('listing',listing);
          } catch (error) {
            console.log(error)
        }
      }
    
      // _add = obj => {
      //   if(_.some(this.proo.listing, obj )){
      //     alert(`The object ${obj.label} already exist`)
    
      //   } else {
      //       alert(`the object ${obj.label} added successefuly`)
      //     this.setState({listing:[...this.state.listing, obj]}, () => {
      //       list = JSON.stringify(this.state.listing)
            
      //       this.pushItem(list)
    
      //     });
    
    
      //   }
    
      // };
    
      clear = () => {
        this.props.dispatch({ type: 'QRCODE_CLEAR' })
        this.removeItem()
      }
   
      // clear = () => {
      //     if(this.state.listing.length == 0){
      //       Alert.alert(
      //           'Message',
      //           'you don\'t have items to delete',
      //           [
                 
      //             {text: 'Cancel', style: 'cancel'},
                  
      //           ],
      //           { cancelable: false }
      //         ) 
      //     }else{
      //   Alert.alert(
      //       'Confirm',
      //       'Are you sure to delete these items ?',
      //       [
             
      //         {text: 'Cancel', style: 'cancel'},
      //         {text: 'OK', 
      //         onPress: () =>  this.setState({listing:[]}),
                
      //       },
      //       ],
      //       { cancelable: false }
      //     )
      //     AsyncStorage.removeItem("listing")
          
      //   }
       
        
      // };
    
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
           const list = this.props.listing.map((item , id ) => {
            
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
   

    function mapStateToProps(state) {
      return {
        listing: state.listing
        
      }
    }
    // console.log(this.state.listing)
    
    export default connect(mapStateToProps)(HomeScreen)





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
        fontSize : 15,
        backgroundColor: "#f99c22",
      
        marginTop : 10,
        padding: 10
    }
    });