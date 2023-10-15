import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function RegisterScreenCompany1() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const HomeCompany = () => {
    navigation.navigate("HomeCompany");
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const isNextButtonDisabled = () => {
    return loading || email === '' || password === '';
  };

  const handleNext = () => {
    if (isNextButtonDisabled()) {
      return;
    }

    setLoading(true);

    const data = {
      email: email,
      password: password,
    };

    axios
      .post('http://192.168.1.9:3005/api/login1', data)
      .then(response => {
        AsyncStorage.setItem('token', response.data.accessToken);
        AsyncStorage.setItem('companyId', response.data.companyId);
        setLoading(false);
        navigation.navigate('HomeCompany');
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        Alert.alert('Email ou mot de passe incorrect');
        if (error.response && error.response.status === 400) {
          Alert.alert('Email ou mot de passe incorrect');
        }
      });
   
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Image style={{ width: 200, height: 40, marginHorizontal: '40%', marginTop: 50 }} source={require('../assets/images/logo.png')} />
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="G-1200"
          keyboardType="number-pad"
        />

        <TouchableOpacity
          style={[styles.LoginButton, isNextButtonDisabled() ? styles.nextButtonDisabled : null]}
          onPress={handleNext}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.nextButtonText}>Se connecter</Text>
          )}
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#246EC3'
  },
  input: {
    width: '80%',
    height: 60,
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    top: 180,
    backgroundColor: '#fff'
  },
  LoginButton: {
    backgroundColor: '#F58909',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    elevation: 20,
    top: 250,
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
