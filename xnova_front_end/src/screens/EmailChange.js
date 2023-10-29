import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ImageBackground, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Nav from '../components/nav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function EmailScreen() {
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlemodif = () => {
    AsyncStorage.getItem('accessToken')
      .then(token => {
        AsyncStorage.getItem('companyId')
          .then(companyId => {
            axios.put(`http://192.168.1.11:3005/api/companies/${companyId}/updateCompanyEmail`, {
              newEmail: newEmail,
              password: password
            }, {
              headers: { Authorization: `Bearer ${token}` }
            })
              .then(response => {
                console.log(response.data);
                Alert.alert("Succès", "Email modifié")
              })
              .catch(error => {
                console.log(error);
                console.log('set');
              });
          })
          .catch(error => {
            console.log(error);
            console.log('AsyncStorage');
          });
      })
      .catch(error => {
        console.log(error);
        console.log('AccessToken');
      });
  }

  return (
    <ImageBackground
      source={require('../assets/images/download.jpg')}
      style={styles.global}
    >
      <View style={styles.global}>
        <Nav />
        <View style={styles.cadre}>
          <Text style={styles.text}>Modifier Email </Text>
          <TextInput
            style={styles.TextInput}
            underlineColorIos="rgba(0,0,0,0)"
            placeholder="nouveau email"
            value={newEmail}
            onChangeText={setNewEmail}
            secureTextEntry={false}
            placeholderTextColor="#AAA1A1"
          />
          <TextInput
            style={styles.TextInput}
            underlineColorIos="rgba(0,0,0,0)"
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={false}
            placeholderTextColor="#AAA1A1"
          />
          <TouchableOpacity style={styles.btn} onPress={handlemodif}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Modifier</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  global: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    top: -50,
    color: '#fff'
  },
  cadre: {
    width: '85%',
    height: '65%',
    backgroundColor: '#246EC3',
    marginTop: '20%',
    marginLeft: '7%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
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
    marginTop: 10
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
});
