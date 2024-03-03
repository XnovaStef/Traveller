import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import de l'icône

export default function ForgotCompany() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    
    const data = {
      email: email
    };

    axios.post('https://xnova-back-end-dgb2.onrender.com/api/company/forgot', data)
      .then((response) => {
        setLoading(false);
        Alert.alert('Votre nouveau mot de passe est: xnova@@');
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 400) {
          Alert.alert('Email inconnu !');
        }
        setLoading(false);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>

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
        <Icon name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>
          <Image
            style={styles.logo}
            source={require('../assets/images/logo4.png')}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            enabled
            style={styles.keyboardAvoidingContainer}
          >
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              onChangeText={(text) => setEmail(text)}
              value={email}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#246EC3',
    paddingTop: 50,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  logo: {
    width: '50%',
    height: '20%',
    resizeMode: 'contain',
    marginTop: 50,
  },
  keyboardAvoidingContainer: {
    width: '80%',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    borderRadius: 2,
    paddingLeft: 10,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#F36210',
    borderRadius: 8,
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
