import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

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
      .then((response) => {
        // Assuming your API returns a valid token and companyId
        AsyncStorage.setItem('token', response.data.accessToken);
        AsyncStorage.setItem('companyId', response.data.companyId);
        setLoading(false);
        navigation.navigate('HomeCompany');
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.status === 401) {
          Alert.alert('Email ou mot de passe incorrect');
        } else {
          console.log(error);
          Alert.alert("Une erreur s'est produite lors de la connexion.");
        }
      });
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/images/logo4.png')} />
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
            style={styles.passwordInput}
            placeholder="Enter Password"
            placeholderTextColor="#aaa"
          />
          <MaterialCommunityIcons
            name={passwordVisible ? 'eye-off' : 'eye'}
            size={24}
            color="#aaa"
            style={styles.icon}
            onPress={togglePasswordVisibility}
          />
        </View>
        <TouchableOpacity
          style={[styles.loginButton, isNextButtonDisabled() ? styles.nextButtonDisabled : null]}
          onPress={handleNext}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.nextButtonText}>Se connecter</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPassword} onPress={ForgotComp}>
          <Text style={styles.forgotPasswordText}>Mot de passe oublié</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#246EC3',
  },
  logo: {
    width: '50%',
    height: '20%',
    resizeMode: 'contain',
    marginBottom: '10%',
  },
  input: {
    width: '80%',
    height: 60,
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 60,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  icon: {
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: '#F58909',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    elevation: 2,
    marginBottom: '10%',
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    position: 'absolute',
    bottom: '5%',
  },
  forgotPasswordText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
