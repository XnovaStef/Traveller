import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreenCompany1() {

  const [companyEmail, setCompanyEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const HomeCompany = () => {
    navigation.navigate("HomeCompany");
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const isNextButtonDisabled = () => {
    return loading || companyEmail === '' || code === '';
  };

  const handleNext = () => {
    if (isNextButtonDisabled()) {
      return;
    }
    setLoading(true);

    // Simulate an asynchronous action (e.g., saving to a database)
    setTimeout(() => {
      // Perform any actions you want when the "Next" button is pressed
      // For example, you can navigate to the next screen or perform validation

      setLoading(false);
      HomeCompany(); // Navigate to HomeCompany screen
    }, 2000);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Image style={{ width: 200, height: 40, marginHorizontal: '40%', marginTop: 50 }} source={require('../assets/images/logo.png')} />
        <TextInput
          style={styles.input}
          value={companyEmail}
          placeholder="Email"
          onChangeText={(text) => setCompanyEmail(text)}
        />

        <TextInput
          style={styles.input}
          value={code}
          onChangeText={(text) => setCode(text)}
          placeholder="G-1200"
          keyboardType="number-pad"
        />

        <TouchableOpacity
          style={[styles.LoginButton, isNextButtonDisabled() ? styles.nextButtonDisabled : null]}
          onPress={handleNext}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.nextButtonText}>Se connecter</Text>
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
    backgroundColor: '#246EC3'
  },
  input: {
    width: '80%',
    height: 60,
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    top: 180,
    backgroundColor: '#fff'
  },
  LoginButton: {
    backgroundColor: '#F58909',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    elevation: 20,
    top: 250,
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
