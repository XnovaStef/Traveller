import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable'; // Import the library

export default function ChooseScreen1() {
  const navigation = useNavigation();

  const [button1Style, setButton1Style] = useState(styles.button1);
  const [button2Style, setButton2Style] = useState(styles.button2);

  const LoginUser = () => {
    navigation.navigate("LoginUser");
  }

  const LoginCompany = () => {
    navigation.navigate("LoginCompany");
  }

  return (
    <View style={styles.global}>
      <Image
        source={require('../assets/images/logo4.png')}
        style={{ width: 200, height: 150, alignSelf: 'center', marginTop: '20%' }}
      />
      <View>
        <Animatable.View animation="lightSpeedIn" duration={2000} style={button1Style}>
          <TouchableOpacity onPress={LoginUser}>
            <Text style={styles.buttonText}>Voyageur</Text>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View animation="lightSpeedIn" duration={2000} style={button2Style}>
          <TouchableOpacity onPress={LoginCompany}>
            <Text style={styles.buttonText}>Compagnie</Text>
          </TouchableOpacity>
        </Animatable.View>
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
