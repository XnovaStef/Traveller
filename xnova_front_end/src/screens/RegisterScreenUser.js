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
  Button,
  Alert
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function RegisterUser() {
  const [pseudo, setPseudo] = useState('');
  const [residence, setResidence] = useState('');
  const [tel, setTel] = useState('');
  const [occupation, setOccupation] = useState('');
  const [password, setPassword] = useState('');
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  const handleRegistration = async () => {
    // Set isLoading to true when starting registration
    setIsLoading(true);
  
    const data = {
      pseudo: pseudo,
      residence: residence,
      occupation: occupation,
      tel: tel,
      password: password,
    };
  
    axios
      .post('http://192.168.1.9:3005/api/register', data)
      .then((response) => {
        console.log(data);
        console.log(response.data);
        Alert.alert('Compte créé avec succès !');
  
        // Set isLoading to false when registration is successful
        setIsLoading(false);
  
        navigation.navigate('LoginUser');
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          Alert.alert('Numéro déjà utilisé !');
        }
  
        // Set isLoading to false when there's an error
        setIsLoading(false);
      });
  };
  

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Image
          style={{ width: 150, height: 40, marginHorizontal: '40%', marginTop: 40 }}
          source={require('../assets/images/logo.png')}
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

        <PhoneInput
          defaultValue={value}
          defaultCode="CI"
          onChangeText={(text) => {
            setValue(text);
            setTel(text);
          }}
          onChangeFormattedText={(text) => {
            setTel(text);
          }}
          withDarkTheme
          withShadow
          containerStyle={styles.TextInput1}
          textContainerStyle={{ backgroundColor: '#fff', color: 'grey' }}
          placeholder="Numéro"
          textInputStyle={{ color: '#000' }}
          codeTextStyle={{ color: '#AAA1A1' }}
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

        

<TouchableOpacity
  style={styles.registerButton}
  onPress={handleRegistration}
  disabled={isLoading} // Disables the button when loading
>
  {isLoading ? (
    <ActivityIndicator size="small" color="white" /> // Show the loader
  ) : (
    <Text style={styles.buttonText}>s'enregistrer</Text> // Show the button text
  )}
</TouchableOpacity>

        <Text style = {{color:'#fff', fontWeight:'bold'}}>Vous avez déjà un compte?
        <TouchableOpacity onPress={Login}><Text style = {{color:'#F36210', fontWeight:'bold'}}>se connecter</Text></TouchableOpacity>
        </Text>
        
        
        
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
    marginTop: '5%',
    left: -5,
    width: 300,
    height: 50,
    borderWidth: 1,
    backgroundColor: '#fff',
    fontSize: 15,
    paddingHorizontal: 20,
    borderColor: '#fff',
    top:70
  },

  TextInput1: {
    marginTop: '5%',
    left: -5,
    width: 300,
    height: 50,
    borderWidth: 1,
    backgroundColor: '#fff',
    fontSize: 15,
    paddingHorizontal: 5,
    borderColor: '#fff',
    top:70,
    marginVertical:10
  },
  
  registerButton: {
    marginTop: '25%',
    backgroundColor: '#F36210',
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    justifyContent:'center',
    shadowOpacity: 0.5,
    shadowColor:'#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
});
