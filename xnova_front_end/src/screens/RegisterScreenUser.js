import React, { useState } from 'react';
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
  Button
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { useNavigation } from '@react-navigation/native';

export default function RegisterUser() {
  const [nom, setNom] = useState('');
  const [domicile, setDomicile] = useState('');
  const [numero, setNumero] = useState('');
  const [profession, setProfession] = useState('');
  const [mdp, setMdp] = useState('');
  const [confirmerPassword, setConfirmerPassword] = useState('');
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleRegistration = () => {
    // Perform registration logic here
    setIsLoading(true);

    // Simulating an asynchronous operation
    setTimeout(() => {
     Reservation()
      setIsLoading(false);
    }, 2000);
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
          placeholder="Nom"
          value={nom}
          onChangeText={setNom}
          placeholderTextColor="#AAA1A1"
          textContainerStyle={{ color: 'white' }}
        />

        <TextInput
          style={styles.TextInput}
          underlineColorAndroid="transparent"
          placeholder="Domicile"
          value={domicile}
          onChangeText={setDomicile}
          placeholderTextColor="#AAA1A1"
        />

<TextInput
          style={styles.TextInput}
          underlineColorAndroid="transparent"
          placeholder="profession"
          value={profession}
          onChangeText={setProfession}
          placeholderTextColor="#AAA1A1"
        />

        <PhoneInput
          defaultValue={value}
          defaultCode="CI"
          onChangeText={(text) => {
            setValue(text);
            setNumero(text);
          }}
          onChangeFormattedText={(text) => {
            setNumero(text);
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
          value={mdp}
          onChangeText={setMdp}
          secureTextEntry={true}
          placeholderTextColor="#AAA1A1"
        />

        <TextInput
          style={styles.TextInput}
          underlineColorAndroid="transparent"
          placeholder="Confirmer mot de passe"
          value={confirmerPassword}
          onChangeText={setConfirmerPassword}
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
            <Text style={styles.buttonText}>s'enregistrer</Text>
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
