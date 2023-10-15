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

  const [numero, setNumero] = useState('');
  const [password, setPassword] = useState('');
  const [pattern, setPattern] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const setNumeroWithCountryCode = (text) => {
    if (text.startsWith('+225')) {
      setNumero(text);
    } else {
      setNumero('+225' + text);
    }
  };

  const handleDelete = () => {
    if (numero === '' || password === '' || pattern === '') {
      Alert.alert("Veuillez remplir tous les champs");
      return;
    }

    // Set isLoading to true when the request starts
    setIsLoading(true);

    axios.post('http://192.168.1.9:3005/api/users/RequestUser', {
      tel: numero,
      password: password,
      pattern: pattern,
    })
    .then(function (response) {
      console.log(response);
      Alert.alert("Opération réussie");
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(() => {
      // Set isLoading to false when the request is completed
      setIsLoading(false);
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
            value={numero}
            onChangeText={setNumeroWithCountryCode}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TextInput
            style={styles.patternInput}
            placeholder="Motif de suppression"
            multiline
            numberOfLines={4}
            value={pattern}
            onChangeText={text => setPattern(text)}
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
