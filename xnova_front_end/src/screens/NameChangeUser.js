import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity,ImageBackground, TextInput , ActivityIndicator, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Nav from '../components/nav';
import Navbar1 from '../components/tab1';
import NavUser from '../components/navUser';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

export default function NameScreen() {
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const handlemodif = () => {
    setLoading(true); // Start loading indicator

    AsyncStorage.getItem('accessToken')
      .then((token) => {
        AsyncStorage.getItem('userId')
          .then((userId) => {
            axios
              .put(
                `https://xnova-back-end.onrender.com/api/user/users/${userId}/updateName`,
                {
                  pseudo: pseudo,
                  password: password,
                },
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              )
              .then((response) => {
                console.log(response.data);
                Alert.alert(
                  'Succès',
                  'Reconnectez-vous pour voir les modifications'
                );
              })
              .catch((error) => {
                console.log(error);
                console.log('set');
              })
              .finally(() => {
                setLoading(false); // Stop loading indicator regardless of success or failure
              });
          })
          .catch((error) => {
            console.log(error);
            console.log('Asyncstorga');
            setLoading(false); // Stop loading indicator on error
          });
      })
      .catch((error) => {
        console.log(error);
        console.log('AcessToken');
        setLoading(false); // Stop loading indicator on error
      });
  };
  return (
   
    <ImageBackground
      source={require('../assets/images/download.jpg')}
      style={styles.global}
    >
        <View style= {styles.global}>
        <NavUser/>
        <View style = {styles.cadre}>
        <Text style={styles.text}>Modifier nom </Text>
        <TextInput
        style={styles.TextInput}
        underlineColorIos="rgba(0,0,0,0)"
        placeholder="Nouveau nom"
        value={pseudo}
        onChangeText={setPseudo}
        secureTextEntry={false}
        placeholderTextColor="#AAA1A1"
      />
      <TextInput
        style={styles.TextInput}
        underlineColorIos="rgba(0,0,0,0)"
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholderTextColor="#AAA1A1"
      />
      <TouchableOpacity style={styles.btn} onPress={handlemodif}>
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" /> // Display the loader when loading is true
            ) : (
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Modifier</Text>
            )}
          </TouchableOpacity>
        </View>
        </View>
      </ImageBackground>
   
  );
}

styles = StyleSheet.create({
  global:{
    flex:1,
    
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    top: -50,
    color:'#fff'
  },
  cadre:{
    width:'85%',
    height:'65%',
    backgroundColor:'#246EC3',
    marginTop:'20%',
    marginLeft:'7%',
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center'
  },
  TextInput: {
    top: 0,
    left: -5,
    width: 250,
    height: 50,
    borderWidth: 1,
    backgroundColor: '#fff',
    fontSize: 20,
    paddingHorizontal: 50,
    borderColor: '#fff',
    marginTop:10
  },
  btn: {
    backgroundColor: '#F36210',
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    left: '2%',
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    top: '40%',
  },
})


