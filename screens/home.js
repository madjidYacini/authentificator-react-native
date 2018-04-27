import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView,Alert, AsyncStorage} from 'react-native';
import { StackNavigator } from "react-navigation";
import { ScanScreen } from "./scan";
import  _  from "lodash" ;
import { connect } from 'react-redux';
import TOTP from '../mlib/totp'


 class HomeScreen extends React.Component {
 
  state = {
    timer: null
}
    async componentWillMount(){
        try {
        //   const result = await AsyncStorage.getItem('listing')
        await AsyncStorage.getItem("listing").then(result => {
           
          if (result) {
            let listing  = JSON.parse(result) ;
            // this.setState({listing:JSON.parse(result)});
            this.props.dispatch({ type: "INIT_DATA", payload: { listing } });

          }
        });
        } catch (e) {
          console.log(e);
        }
      }
    
    
    //   async pushItem(listing){
    //     try {
    //         await AsyncStorage.setItem('listing',listing);
    //       } catch (error) {
    //         console.log(error)
    //     }
    //   }
    
    //   _add = obj => {
     
    //         list = JSON.stringify(this.props.listing)
            
    //         this.pushItem(listing)
    //     }
    

    
      clear = () => {
        this.props.dispatch({ type: 'QRCODE_CLEAR' })
          AsyncStorage.removeItem("listing")
        
      }

      clearItem = (id)=>{
        Alert.alert(
              "Remove",
              `are you sure to remove item ${this.props.listing[id].label}?`,
              [
                {
                  'text':"no"
                },
                { text: "Sure", style: "destructive" ,
               onPress :()=>{
                 let updated_qr_list = [...this.props.listing]
                 updated_qr_list.splice(id,1)
                 const str = JSON.stringify(updated_qr_list)
                 AsyncStorage.setItem('listing',str).then(()=>{
                   this.props.dispatch({
                   type : 'REMOVE_AT',
                   payload: {
                     listing : updated_qr_list
                   }
                  })
                 })
               }
              }
            ],
              { cancelable: false }
         );
      
      }
   
    
    
      static navigationOptions = {
        title: "Authentificator",
        headerStyle:{
            backgroundColor:'#b0ed6f',
        },
        style: {
            textAlign: 'center',
         },
      };
    
      componentDidUpdate(){
        const duration = 5000;
        // if(!this.state.timer){
        setInterval(() => {
            this.setState({ timer: this.state.timer + duration })
        }, duration)
      // }
    }
    // componentWillUnmount(){
    //   clearInterval(this.myInterval)
    // }
      render()
       {
        //    console.log("test",this.props.listing);
           const list = this.props.listing.map((item , id ) => {
            const token = new TOTP(item.secret, 5).generate()

               return (
                   <View  key = {id}>
                   <TouchableOpacity key = {id} onLongPress= {()=>this.clearItem(id)}  >
                
                       <Text style={styles.ListText}>
                        {token} {item.secret} {item.label} {item.issuer}
                       </Text>
                       </TouchableOpacity>
                       
                 
                   </View>
               )
           })
    
           return (
               <View style={styles.container}>
                   <TouchableOpacity
                       style={styles.buttonAdd}
                       onPress={() =>
                           this.props.navigation.navigate("scan", {
                            //    add: this._add
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