import React, { useState, useCallback } from 'react';
import { StatusBar, Dimensions, ImageBackground, View, TouchableOpacity, Image, Linking, StyleSheet, Text, TextInput, Keyboard, TouchableWithoutFeedback, Alert, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { ListItem } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';
import Nav from '../components/nav';
import axios from 'axios';

export default function DeleteScreen() {
  const navigation = useNavigation();

  const LoginUser = () => {
    navigation.navigate("LoginUser");
  }

  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const setNumeroWithCountryCode = (text) => {
    if (text.startsWith('+225')) {
      setTel(text);
    } else {
      setTel('+225' + text);
    }
  };
  const handleDelete = () => {
    if (tel === '' || password === '') {
      Alert.alert("Veuillez remplir tous les champs");
      return;
    }
  
    // Make an HTTP request to your API to delete the user account
    axios.delete('http://192.168.8.166:3005/api/deleteUser', {
      tel: tel,
      password: password,
    })
      .then(response => {
        // Handle a successful response from the server
        if (response.data.message === 'utilisateur supprimé') {
          // Handle success, for example, navigate to a different screen
          // You can use the `navigation` object for navigation.
          navigation.navigate('LoginUser');
        } else {
          // Handle other cases as needed
          Alert.alert(response.data.message);
        }
      })
      .catch(error => {
        // Handle error cases
        console.error(error);
        Alert.alert('An error occurred');
      });
  };
  

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.global}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 25 }}>Suppression de compte</Text>
        </View>
        <View style={styles.delete}>
          <TextInput
            style={styles.input}
            placeholder="Numéro"
            value={tel}
            onChangeText={setNumeroWithCountryCode}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
          
          {isLoading ? (
            <ActivityIndicator size="large" color="#246EC3" />
          ) : (
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.deleteButtonText}>Supprimer</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  global: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#246EC3',
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  delete: {
    backgroundColor: '#fff',
    width: '85%',
    height: '80%',
    top: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    padding: 20,
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#246EC3',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    top: 17,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 3,
    borderColor: '#246EC3',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  patternInput: {
    height: 100,
    borderWidth: 3,
    borderColor: '#246EC3',
    borderRadius: 5,
    padding: 4,
  },
});
