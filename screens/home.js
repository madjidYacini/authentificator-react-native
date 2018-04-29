import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView,Alert, AsyncStorage,Image} from 'react-native';
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
       
        await AsyncStorage.getItem("listing").then(result => {
           
          if (result) {
            let listing  = JSON.parse(result) ;
            
            this.props.dispatch({ type: "INIT_DATA", payload: { listing } });

          }
        });
        } catch (e) {
          console.log(e);
        }
      }
      //////////////////////////////////////////////////////

      clear = () => {
        Alert.alert(
          "Remove",
          `are you sure to remove all codes ?`,
          [
            {
              'text':"no"
            },
            { text: "Sure", style: "destructive" ,
           onPress :()=>{
            this.props.dispatch({ type: 'QRCODE_CLEAR' })
          AsyncStorage.removeItem("listing")
           }
          }
        ],
          { cancelable: false }
     );
       
        
      }

      ///////////////////////////////////////////////////////////////////

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
   
        setInterval(() => {
            this.setState({ timer: this.state.timer + duration })
        }, duration)
    
    }
   
      render()
       {
         if(this.props.listing.length==0){
          return (
            <View style={styles.container}>
                <Text style={styles.textTitle}>Welcome<Text style={{fontWeight: 'bold'}}> to M-Authentificator</Text>{`\n`}In first time, clic  the button below to add a code </Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("scan")}>
                    <Image source={require("../assets/02.png")} style={styles.buttonAddFirst} />
                </TouchableOpacity>
            </View>
        );
      
         }
         
           const list = this.props.listing.map((item , id ) => {
            const token = new TOTP(item.secret, 5).generate()

               return (
                   <View  key = {id}>
                   <TouchableOpacity key = {id} onLongPress= {()=>this.clearItem(id)}  >
                
                       <Text style={styles.ListText}>
                      
                       <Text style={{fontWeight: 'bold'}}> •issuer :</Text> {`${item.issuer} \n`}<Text style={{fontWeight: 'bold'}}>•password• :</Text>  {`${token} \n`}<Text style={{fontWeight: 'bold'}}>•totp• : </Text>{`${item.label}\n `}  
                      
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
    },
    textTitle: {
        textAlign: "center",
        fontSize: 20
    },
    buttonAddFirst:{
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',

    }
    });