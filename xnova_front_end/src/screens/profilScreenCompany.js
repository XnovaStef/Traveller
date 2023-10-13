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

    const Logo = () =>{
        navigation.navigate("Logo")
      }

    const Compagny = () =>{
        navigation.navigate("Compagny")
      }

      const Email = () =>{
        navigation.navigate("Email")
      }

      const PwdCompagny = () =>{
        navigation.navigate("PwdCompagny")
      }

      

 


  const HomeCompagny = () =>{
    navigation.navigate("HomeCompany")
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
        <Text style = {{color:'#fff', fontSize:30,fontWeight:'bold'}}>Profil compagnie</Text>
           
            <View style={{width: '80%', marginBottom: 20, top: 40,shadowOpacity: 0.7,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    elevation: 4,}}>
            <ListItem
                title="Nom compagnie"
                leading={<Icon name="face-man-profile" size={24} />}
                trailing={props => <Icon name="chevron-right" {...props} />}
                onPress={Compagny}
                style={{backgroundColor: '#2C333A', color: 'white'}}
            />            
            <ListItem
                title="Mot de passe"
                leading={<Icon name="account" size={24} />}
                trailing={props => <Icon name="chevron-right" {...props} />}
                onPress={ PwdCompagny}

            /> 
             <ListItem
                title="Email"
                leading={<Icon name="mail" size={24} />}
                trailing={props => <Icon name="chevron-right" {...props} />}
                onPress={ Email}

            />                       
            <ListItem
                title="Logo"
                leading={<Icon name="image" size={24} />}
                trailing={props => <Icon name="chevron-right" {...props} />}
                onPress={Logo}

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
                onPress={ ()=> navigation.navigate('DeleteCompany')}

            />            
            <TouchableOpacity  style = {styles.Button}onPress={HomeCompagny} >
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