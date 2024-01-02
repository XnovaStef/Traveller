import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreenCompany1() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); 

  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const ForgotComp = () => {
    navigation.navigate('ForgotComp');
  };

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
      .post('https://xnova-back-end.onrender.com/api/company/login', data) // Replace with your API endpoint
      .then(response => {
        // Assuming your API returns a valid token and companyId
        AsyncStorage.setItem('token', response.data.accessToken);
        AsyncStorage.setItem('companyId', response.data.companyId);
        setLoading(false);
        navigation.navigate('HomeCompany');
      })
      .catch(error => {
        setLoading(false);
        if (error.response && error.response.status === 401) {
          Alert.alert('Email ou mot de passe incorrect');
        } else {
          console.log(error);
          Alert.alert('Une erreur s\'est produite lors de la connexion.');
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
          onChangeText={text => setEmail(text)}
        />

<TextInput
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="G-1200"
          secureTextEntry={!passwordVisible} // Affichage sécurisé en fonction de l'état passwordVisible
        />
        {/* Bouton pour basculer entre afficher et masquer le mot de passe */}
        <TouchableOpacity
          style={{ position: 'absolute', right: 45, top: '44%' }} // Ajustez la position selon votre mise en page
          onPress={togglePasswordVisibility}
        >
          <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={24} color="black" />
        </TouchableOpacity>

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

        <TouchableOpacity style={{ top: '22%', marginLeft: '37%' }} onPress={ForgotComp}>
          <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Mot de passe oublié</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#246EC3',
  },
  input: {
    width: '80%',
    height: 60,
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    top: 180,
    backgroundColor: '#fff',
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
