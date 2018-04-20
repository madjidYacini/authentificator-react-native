import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import { StackNavigator } from "react-navigation";
import { ScanScreen } from "./scan";

export default class HomeScreen extends React.Component {
 
    state = {
      listing: []
    };
  

  // add = () => {
  //   console.log("add")
  //   this.props.navigaton.navigate('scan');
  // };

  _add = obj => {
    this.setState({listing:[...this.state.listing, obj]});

    // console.log(listing)

  };

  clear = () => {
   this.setState({ listing :[]})
  };

  static navigationOptions = {
    title: "Authentificator"
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
               <TouchableOpacity style={styles.buttonClear} onPress={this.clear}>
                   <Text> CLEAR</Text>
               </TouchableOpacity>
               <ScrollView>{list}</ScrollView>


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
    backgroundColor: "#6da0f2",
    padding: 10,
    marginBottom: 30,
    marginTop: 50
  },
  buttonClear: {
    alignItems: "center",
    backgroundColor: "#f96c20",
    padding: 10
  },
  ListText: {
    alignItems: "center",
    color: '#000000',
    backgroundColor: "#ffff66",
    marginTop : 10,
    padding: 10
}
});