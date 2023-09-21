import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Navbar from '../components/tab';
import Background from '../components/background';
import { useNavigation } from '@react-navigation/native';

export default function LoginPass() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation(); 

  const Ticket = () => {
    // Simulate loading for 2 seconds
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Navigate to the "Ticket" screen here
      navigation.navigate("Ticket");
    }, 2000); // Adjust the delay as needed
  };

  return (
    <View style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
      <StatusBar style='dark' />
      <Navbar />
      <Text style={styles.text}>Veuillez saisir le code envoyé par SMS</Text>
      <TextInput
        style={styles.TextInput}
        underlineColorIos="rgba(0,0,0,0)"
        placeholder="T-2304"
        value={code}
        onChangeText={setCode}
        secureTextEntry={false}
        placeholderTextColor="#AAA1A1"
      />
      <TouchableOpacity style={styles.btn} onPress={Ticket} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Voir</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '20%',
  },
  TextInput: {
    top: '30%',
    left: -5,
    width: 250,
    height: 50,
    borderWidth: 1,
    backgroundColor: '#fff',
    fontSize: 20,
    paddingHorizontal: 50,
    borderColor: '#fff',
  },
  btn: {
    backgroundColor: '#F36210',
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    left: '2%',
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    top: '40%',
  },
});
