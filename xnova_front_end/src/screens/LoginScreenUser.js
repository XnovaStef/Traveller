import { StatusBar, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Image,Alert } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ionicons,  MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginUser() {
  const [value, setValue] = useState("");
  const [tel, setTel] = useState('');
  const [enter, setEnter] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour contrôler la connexion
  const [showRatingPopup, setShowRatingPopup] = useState(false); // État pour afficher la pop-up

  const navigation = useNavigation(); 

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const Forgot = () => {
    navigation.navigate("Forgot");
  };

  const RegisterUser = () => {
    navigation.navigate("RegisterUser");
  };

  const Reservation = () =>{
    navigation.navigate("Reservation");
};

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  


  const handleLogin = () => {
    setLoading(true);

    const data = {
      tel: tel,
      password: password,
    };

    axios
      .post('https://xnova-back-end-dgb2.onrender.com/api/user/login', data)
      .then(response => {
        AsyncStorage.setItem('token', response.data.accessToken);
        AsyncStorage.setItem('userId', response.data.userId);
        setLoading(false);
        navigation.navigate('history', { tel: tel});
        
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        Alert.alert('Numéro ou mot de passe incorrect');
        if (error.response && error.response.status === 400) {
          Alert.alert('Numéro ou mot de passe incorrect');
        }
      });
  };

  
  



  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Image style={{  width: 200, height: 120, marginHorizontal: '40%', top: '-10%' }} source={require('../assets/images/logo4.png')} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled
        >
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
            containerStyle={styles.TextInput}
            textContainerStyle={{ backgroundColor: '#fff', color: 'white' }}
            placeholder="Numéro"
            textInputStyle={{ color: "#000" }}
            codeTextStyle={{ color: '#AAA1A1' }}
          />



<TextInput 
  
                    // Set secureTextEntry prop to hide  
                    //password when showPassword is false 
                    secureTextEntry={!showPassword} 
                    value={password} 
                    onChangeText={setPassword} 
                    style={styles.TextInput1} 
                    placeholder="Mot de passe"
                    placeholderTextColor="#aaa"
                /> 
                <MaterialCommunityIcons 
                    name={showPassword ? 'eye-off' : 'eye'} 
                    size={24} 
                    color="#aaa"
                    style={styles.icon} 
                    onPress={toggleShowPassword} 
                /> 

          <TouchableOpacity style={styles.forgot} onPress={Forgot}>
            <Text style={{ color: '#F36210', fontSize: 11, fontWeight: '500' }}>Mot de passe oublié</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Se connecter</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.Text}>Vous n'avez de compte?
            <TouchableOpacity style={styles.Btn} onPress={RegisterUser}>
              <Text style={styles.header}> S'enregistrer</Text>
            </TouchableOpacity>
          </Text>
        </KeyboardAvoidingView>

        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#246EC3',
  },
  TextInput: {
    top: 0,
    left: -5,
    width: '80%',
    borderWidth: 1,
    fontSize: 5,
    borderRadius: 4,
    borderColor: '#fff'
  },
  TextInput1: {
    top: 40,
    left: -5,
    width: 300,
    height: 50,
    borderWidth: 1,
    backgroundColor: '#fff',
    fontSize: 15,
    paddingHorizontal: 30,
    borderColor: '#fff'
  },
  forgot: {
    top: -70,
    left: 180,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#F36210',
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    left: 70,
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    marginTop: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  Text: {
    top: 10,
    fontWeight: 'bold',
    left: 20,
    color:'#fff',
  },
  header: {
    color: '#F36210',
    top: 3,
    fontWeight: 'bold',
  },
  icon: { 
    marginLeft: '70%', 
}, 
});