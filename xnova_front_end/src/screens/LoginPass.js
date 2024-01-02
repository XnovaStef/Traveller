import React, { useState } from 'react';
import { StatusBar, TouchableWithoutFeedback, Keyboard, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons'; // Import de l'icône

export default function LoginPass() {
  const [code, setCode] = useState('');
  const [tel, setTel] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); 
  const [value, setValue] = useState('');
  const [enter, setEnter] = useState('');

  const Ticket = () => {
    setLoading(true);
    const data = {
      code: code,
      tel: tel
    };

    axios
    .post('https://xnova-back-end.onrender.com/api/user/LoginPass', data)
    .then(response => {
      AsyncStorage.setItem('token', response.data.accessToken);
      AsyncStorage.setItem('passId', response.data.passId);
      setLoading(false);
      console.log(tel)
      navigation.navigate('Ticket', { tel: tel });
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      
        if (error.response && error.response.status === 400) {
          Alert.alert('Code expiré');
        } else if (error.response && error.response.status === 401) {
          Alert.alert('Accès non autorisé. Veuillez vérifier le code ou le numéro de téléphone.');
        } else {
          Alert.alert('Une erreur s\'est produite. Veuillez réessayer plus tard.');
        }
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <StatusBar style='dark' />
        <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          top: 30,
          left: 20,
          padding: 10,
        }}
      >
        {/* Utilisation de l'icône de flèche */}
        <Icon name="arrow-back" size={30} color="#246EC3" />
      </TouchableOpacity>
        <Text style={styles.text}>Veuillez saisir le code envoyé par SMS</Text>
        <TextInput
  style={styles.TextInput}
  underlineColorIos="rgba(0,0,0,0)"
  placeholder="T-2304"
  value={code}
  onChangeText={setCode}
  keyboardType="numeric" // Utilisation du clavier numérique
  placeholderTextColor="#AAA1A1"
/>

<PhoneInput
            defaultValue={value}
            defaultCode="CI"
            onChangeText={(text) => {
              setValue(text);
              setTel(text);
              setEnter(text);
            }}
            onChangeFormattedText={(text) => {
              setTel(text);
            }}
            withDarkTheme
            withShadow
            containerStyle={styles.TextInput1}
            textContainerStyle={{ backgroundColor: '#fff', color: 'white' }}
            placeholder="Numéro"
            textInputStyle={{ color: "#000" }}
            codeTextStyle={{ color: '#AAA1A1' }}
          />


        <TouchableOpacity style={styles.btn} onPress={Ticket} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Voir</Text>
          )}
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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

  TextInput1: {
    top: '30%',
    left: -5,
    width: 300,
    height: 50,
    borderWidth: 1,
    backgroundColor: '#fff',
    fontSize: 20,
    paddingHorizontal: 5,
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
