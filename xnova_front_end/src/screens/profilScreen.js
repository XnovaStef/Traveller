import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,ImageBackground,View,TouchableOpacity,Image,Text} from 'react-native';
import { useFonts } from 'expo-font';
import { ListItem } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {  useNavigation } from '@react-navigation/native';
import Nav from '../components/nav';
import { Button } from "@react-native-material/core";


export default function ProfilScreen(){




    const navigation = useNavigation();

    const Delete = () =>{
      navigation.navigate("Delete")
    }

    const Name = () =>{
        navigation.navigate("Name")
      }

      const Email = () =>{
        navigation.navigate("Email")
      }

      const Password = () =>{
        navigation.navigate("Password")
      }

  const Location = () =>{
    navigation.navigate("Location")
  }


  const Reservation = () =>{
    navigation.navigate("Reservation")
  }

  const Welcome = () =>{
    navigation.navigate("welcome")
  }

    return(
      
        <ImageBackground
      source={require('../assets/images/download.jpg')}
      style={styles.backgroundImage}
    >
        <View style ={styles.Global}>
        <StatusBar style="dark" />
            
       
            <View style ={styles.Profil}>
        <Text style = {{color:'#fff', fontSize:30,fontWeight:'bold'}}>Profil</Text>
           
            <View style={{width: '80%', marginBottom: 20, marginTop: 20,shadowOpacity: 0.7,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    elevation: 4,}}>
            <ListItem
                title="Nom"
                leading={<Icon name="face-man-profile" size={24} />}
                trailing={props => <Icon name="chevron-right" {...props} />}
                onPress={ Name}
                style={{backgroundColor: '#2C333A', color: 'white'}}
            />                                 
            <ListItem
                title="Mot de passe"
                leading={<Icon name="account" size={24} />}
                trailing={props => <Icon name="chevron-right" {...props} />}
                onPress={Password}

            />            
            <ListItem
                title="Déconnexion"
                leading={<Icon name="logout" size={24} />}
                trailing={props => <Icon name="chevron-right" {...props} />}
                onPress={ ()=> navigation.navigate('welcome')}

            />

             <ListItem
                title="Suppression"
                leading={<Icon name="delete" size={24} />}
                trailing={props => <Icon name="chevron-right" {...props} />}
                onPress={ ()=> navigation.navigate('Delete')}

            />            
            <TouchableOpacity  style = {styles.Button}onPress={Reservation} >
                <Text style = {{fontWeight:'bold', alignSelf:'center',textAlign:'center',padding:6} } >Retour</Text>
              </TouchableOpacity>
            </View>
            



            
        </View>
            
      </View>
      </ImageBackground>
    )
}


const styles = StyleSheet.create({
    Global:{
     flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
      },

   Profil:{
    backgroundColor:'#246EC3',
    top:'10%',
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    height:'70%',
    width:'90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
},
Button:{
    marginTop:70,
    marginLeft:85,
    backgroundColor:'#fff',
    width:90,
    height:35,
  },














  
})