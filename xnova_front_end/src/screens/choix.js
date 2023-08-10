import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ChooseScreen() {
    
  const navigation = useNavigation();

  const [button1Style, setButton1Style] = useState(styles.button1);
  const [button2Style, setButton2Style] = useState(styles.button2);

  const User = () => {
    navigation.navigate("RegisterUser");
  }

  const Company = () => {
    navigation.navigate("RegisterCompany");
  }

  return (
    <View style={styles.global}>
      <Image
        source={require('../assets/images/logo.png')}
        style={{ width: 200, height: 50, alignSelf: 'center', marginTop: '15%' }}
      />
      <View>
        <TouchableOpacity style={button1Style} onPress={User}>
          <Text style={styles.buttonText}>Voyageur</Text>
        </TouchableOpacity>

        <TouchableOpacity style={button2Style} onPress={Company}>
          <Text style={styles.buttonText}>Compagnie</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  global: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#246EC3'
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  button1: {
    backgroundColor: '#F36210',
    width: 250,
    height: 80,
    marginTop: '50%',
    borderRadius: 20,
    shadowOpacity: 0.7,
    shadowColor: '#fff',
    shadowOffset: { width: 2, height: 2 },
    elevation: 4,
  },
  button2: {
    backgroundColor: '#F36210',
    width: 250,
    height: 80,
    marginTop: '10%',
    borderRadius: 20,
    shadowOpacity: 0.7,
    shadowColor: '#fff',
    shadowOffset: { width: 2, height: 2 },
  }
});
