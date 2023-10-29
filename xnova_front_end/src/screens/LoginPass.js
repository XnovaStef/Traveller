import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Text, View, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Navbar from '../components/tab';
import Background from '../components/background';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function LoginPass() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation(); 

  const Ticket = () => {
    setLoading(true);

    const data = {
      code: code
    };

    axios
      .post('http://192.168.1.11:3005/api/user/loginPass', data)
      .then(response => {
        AsyncStorage.setItem('token', response.data.accessToken);
        AsyncStorage.setItem('passId', response.data.passId);
        setLoading(false);
        navigation.navigate('Ticket');
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      
        if (error.response && error.response.status === 400) {
          Alert.alert('Code expiré');
        } else if (error.response && error.response.status === 401) {
          Alert.alert('Accès non autorisé. Veuillez vérifier le code.');
        } else {
          Alert.alert('Une erreur s\'est produite. Veuillez réessayer plus tard.');
        }
      });
      
  };

  return (
    <View style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
      <StatusBar style='dark' />
      <Navbar />
      <Text style={styles.text}>Veuillez saisir le code envoyé par SMS</Text>
      <TextInput
        style={styles.TextInput}
        underlineColorIos="rgba(0,0,0,0)"
        placeholder="T-2304"
        value={code}
        onChangeText={setCode}
        secureTextEntry={false}
        placeholderTextColor="#AAA1A1"
      />
      <TouchableOpacity style={styles.btn} onPress={Ticket} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Voir</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '20%',
  },
  TextInput: {
    top: '30%',
    left: -5,
    width: 250,
    height: 50,
    borderWidth: 1,
    backgroundColor: '#fff',
    fontSize: 20,
    paddingHorizontal: 50,
    borderColor: '#fff',
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
