import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function RegisterUser() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [pseudo, setPseudo] = useState('');
  const [residence, setResidence] = useState('');
  const [tel, setTel] = useState('');
  const [occupation, setOccupation] = useState('');
  const [password, setPassword] = useState('');
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword]= useState('');
  const phoneInput = useRef<PhoneInput>(null);

  const navigation = useNavigation();

  const Reservation = () =>{
    navigation.navigate("Reservation");
};

const Login = () =>{
    navigation.navigate("LoginUser");
};

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const setNumeroWithCountryCode = (text) => {
    if (text.startsWith('+225')) {
      setTel(text);
    } else {
      setTel('+225' + text);
    }
  };

  const handleRegistration = async () => {
    // Vérifier si les mots de passe correspondent
    if (password !== confirmPassword) {
      Alert.alert("Mot de passe non conforme", "Les mots de passe ne correspondent pas.");
      return;
    }
  
    setIsLoading(true);
  
    const data = {
      pseudo: pseudo,
      residence: residence,
      occupation: occupation,
      tel: tel,
      password: password,
    };
  
    axios
      .post('https://xnova-back-end-dgb2.onrender.com/api/user/register', data)
      .then((response) => {
        console.log(data);
        console.log(response.data);
        Alert.alert('Compte créé avec succès !');
        setIsLoading(false);
        navigation.navigate('LoginUser');
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          Alert.alert('Numéro déjà utilisé !');
        }
        setIsLoading(false);
      });
  };
  

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <Image
            style={{ width: windowWidth * 0.3, height: windowHeight * 0.1, marginTop: windowHeight * 0.05 }}
            source={require('../assets/images/logo4.png')}
          />
          <TextInput
            style={styles.TextInput}
            underlineColorAndroid="transparent"
            placeholder="Pseudo"
            value={pseudo}
            onChangeText={setPseudo}
            placeholderTextColor="#AAA1A1"
            textContainerStyle={{ color: 'white' }}
          />
          <TextInput
            style={styles.TextInput}
            underlineColorAndroid="transparent"
            placeholder="Residence"
            value={residence}
            onChangeText={setResidence}
            placeholderTextColor="#AAA1A1"
          />
          <TextInput
            style={styles.TextInput}
            underlineColorAndroid="transparent"
            placeholder="Profession"
            value={occupation}
            onChangeText={setOccupation}
            placeholderTextColor="#AAA1A1"
          />
         <TextInput
            style={styles.TextInput}
            underlineColorAndroid="transparent"
            placeholder="Numéro"
            value={tel}
            onChangeText={setNumeroWithCountryCode}
            placeholderTextColor="#AAA1A1"
            keyboardType='numeric'
          />
          <TextInput
            style={styles.TextInput}
            underlineColorAndroid="transparent"
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholderTextColor="#AAA1A1"
          />
          <TextInput
            style={styles.TextInput}
            underlineColorAndroid="transparent"
            placeholder="confirmation mot de passe"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            placeholderTextColor="#AAA1A1"
          />
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegistration}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.buttonText}>S'enregistrer</Text>
            )}
          </TouchableOpacity>
          <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: windowHeight * 0.02 }}>
            Vous avez déjà un compte?
            <TouchableOpacity onPress={Login}>
              <Text style={{ color: '#F36210', fontWeight: 'bold' }}>Se connecter</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#246EC3',
    paddingVertical: 20,
  },
  TextInput: {
    marginTop: '5%',
    width: 300,
    height: 50,
    borderWidth: 1,
    backgroundColor: '#fff',
    fontSize: 15,
    paddingHorizontal: 20,
    borderColor: '#fff',
    top: 50,
  },
  TextInput1: {
    marginTop: '5%',
    width: 300,
    height: 50,
    borderWidth: 1,
    backgroundColor: '#fff',
    //fontSize: 10,
    paddingHorizontal: 5,
    borderColor: '#fff',
    top: 50,
  },
  registerButton: {
    marginTop: '25%',
    backgroundColor: '#F36210',
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

