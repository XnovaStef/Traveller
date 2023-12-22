import { StatusBar, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ForgotScreen() {
  const [value, setValue] = useState("");
  const [numero, setNumero] = useState('');
  const [enter, setEnter] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [code, setCode] = useState('');
  const navigation = useNavigation();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleForgotPassword = async () => {
    // Set isLoading to true when starting registration
    setLoading(true);
  
    const data = {
      tel: numero
    };
  
    axios
      .post('https://xnova-back-end.onrender.com/api/user/users/forgot', data)
      .then((response) => {
        // Set isLoading to false when registration is successful
        setLoading(false);
  
        // Display the generated code in an alert
       Alert.alert('Votre nouveau mot de passe est: xnova@@')
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          Alert.alert('Numéro inconnu !');
        }
  
        // Set isLoading to false when there's an error
        setLoading(false);
      });
  };

 
  

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Image style={{ width: 200, height: 40, marginHorizontal: '40%', marginTop: 70 }} source={require('../assets/images/logo.png')} />

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled>
          <PhoneInput
            defaultValue={value}
            defaultCode="CI"
            onChangeText={(text) => {
              setValue(text);
              setNumero(text);
              setEnter(text);
            }}
            onChangeFormattedText={(text) => {
              setNumero(text);
            }}
            withDarkTheme
            withShadow
            containerStyle={styles.TextInput}
            textContainerStyle={{ backgroundColor: '#fff', color: 'white' }}
            placeholder="Numéro"
            textInputStyle={{ color: "#000" }}
            codeTextStyle={{ color: '#AAA1A1' }}
          />
        </KeyboardAvoidingView>

        <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.buttonText}>Envoyer</Text>
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
    backgroundColor: '#246EC3',
  },
  TextInput: {
    top:'50%',
  },
  button: {
    top:'55%',
    backgroundColor: '#F36210',
    borderRadius: 5,
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    shadowOpacity: 0.5,
    shadowColor:'#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight:'bold',
    fontSize:16
  },
});
