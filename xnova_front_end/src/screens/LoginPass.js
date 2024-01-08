import React, { useState } from 'react';
import {
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

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
      tel: tel,
    };

    axios
      .post('https://xnova-back-end.onrender.com/api/user/LoginPass', data)
      .then((response) => {
        AsyncStorage.setItem('token', response.data.accessToken);
        AsyncStorage.setItem('passId', response.data.passId);
        setLoading(false);
        console.log(tel, code);
        navigation.navigate('Ticket', { tel: tel, code: code });
      })
      .catch((error) => {
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
      <View style={styles.container}>
        <StatusBar style='dark' />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={30} color="#246EC3" />
        </TouchableOpacity>
        <Text style={styles.text}>Veuillez saisir le code envoyé par SMS</Text>

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
          containerStyle={styles.textInput1}
          textContainerStyle={{ backgroundColor: '#fff', color: 'white' }}
          placeholder="Numéro"
          textInputStyle={{ color: '#000' }}
          codeTextStyle={{ color: '#AAA1A1' }}
        />

        <TextInput
          style={styles.textInput}
          underlineColorIos="rgba(0,0,0,0)"
          placeholder="T-2304"
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '20%',
  },
  textInput: {
    marginTop: '10%',
    width: '80%',
    height: 50,
    borderWidth: 1,
    backgroundColor: '#fff',
    fontSize: 20,
    paddingHorizontal: 20,
    borderColor: '#fff',
  },
  textInput1: {
    marginTop: '10%',
    width: '80%',
    height: 50,
    borderWidth: 1,
    backgroundColor: '#fff',
    fontSize: 20,
    paddingHorizontal: 5,
    borderColor: '#fff',
  },
  btn: {
    backgroundColor: '#F36210',
    width: '40%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: '10%',
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
});
