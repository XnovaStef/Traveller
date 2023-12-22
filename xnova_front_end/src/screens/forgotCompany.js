import {
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
  } from 'react-native';
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
  } from 'react-native';
  import axios from 'axios';
  import { useNavigation } from '@react-navigation/native';
  
  export default function ForgotCompany() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [enter, setEnter] = useState('');
  
    const navigation = useNavigation();
  
    const dismissKeyboard = () => {
      Keyboard.dismiss();
    };
  
    const handleForgotPassword = async () => {

        // Set isLoading to true when starting the password reset process
      setLoading(true);
      
        const data = {
            email: email
        }

        axios
        .post('https://xnova-back-end.onrender.com/api.company/forgot', data)
        .then((response) => {
          // Set isLoading to false when password reset is successful
          setLoading(false);
  
          // Display the generated code in an alert
          Alert.alert('Votre nouveau mot de passe est: xnova@@');
        })
        .catch((error) => {
            console.log(error);
            if (error.response && error.response.status === 400) {
              Alert.alert('Email inconnu !');
            }
    
            // Set isLoading to false when there's an error
            setLoading(false);
          });
    };
  
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.container}>
            <Image
              style={{ width: 200, height: 40, marginHorizontal: '40%', marginTop: 70 }}
              source={require('../assets/images/logo.png')}
            />
  
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled>
              <TextInput
                placeholder="Email"
                style={styles.TextInput}
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
    },
    scrollViewContent: {
      flexGrow: 4,
    },
    TextInput: {
      top: 200,
      backgroundColor: 'white',
      width: 300,
      height: 40,
      borderRadius: 2,
      paddingLeft: 10,
    },
    button: {
      top: '55%',
      backgroundColor: '#F36210',
      borderRadius: 5,
      width: 150,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      shadowOpacity: 0.5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      elevation: 4,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
  