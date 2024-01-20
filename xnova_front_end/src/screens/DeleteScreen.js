import React, { useState, useCallback } from 'react';
import { StatusBar, Dimensions, ImageBackground, View, TouchableOpacity, Image, Linking, StyleSheet, Text, TextInput, Keyboard, TouchableWithoutFeedback, Alert, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { ListItem } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';
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
  const handleDelete = async () => {
    if (tel === '' || password === '') {
      Alert.alert("Veuillez remplir tous les champs");
      return;
    }

    setIsLoading(true); // Définissez isLoading sur true pour afficher l'indicateur de chargement

    try {
      // Envoyez une demande DELETE à votre API pour supprimer l'utilisateur
      const response = await axios.delete('https://xnova-back-end-dgb2.onrender.com/api/user/deleteUser', {
        data: {
          tel: tel,
          password: password,
        },
      });

      // Vérifiez la réponse de l'API pour voir si la suppression a réussi
      if (response.status === 200) {
        Alert.alert("L'utilisateur a été supprimé avec succès.");
        // Réinitialisez les champs et isLoading après la suppression réussie
        setTel('');
        setPassword('');
        LoginUser()
      } else {
        Alert.alert("La suppression de l'utilisateur a échoué.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur : ", error);
      Alert.alert("Une erreur s'est produite lors de la suppression de l'utilisateur.");
    } finally {
      setIsLoading(false); // Réinitialisez isLoading après la suppression ou en cas d'erreur
    }
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
