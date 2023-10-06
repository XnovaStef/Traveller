import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export default function ChooseScreen() {
  const navigation = useNavigation();

  const User = () => {
    navigation.navigate("RegisterUser");
  }

  const Company = () => {
    navigation.navigate("RegisterCompany");
  }

  // State to control animation
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Add a delay before triggering the animation
    const animationTimeout = setTimeout(() => {
      setAnimationComplete(true);
    }, 1); // Adjust the delay as needed

    return () => clearTimeout(animationTimeout);
  }, []);

  return (
    <View style={styles.global}>
      <Image
        source={require('../assets/images/logo.png')}
        style={{ width: 200, height: 50, alignSelf: 'center', marginTop: '15%' }}
      />
      <View>
        <Animatable.View
          animation={animationComplete ? 'zoomIn' : undefined}
          style={styles.buttonWrapper}
        >
          <TouchableOpacity style={styles.button1} onPress={User}>
            <Text style={styles.buttonText}>Voyageur</Text>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View
          animation={animationComplete ? 'zoomIn' : undefined}
          style={styles.buttonWrapper}
        >
          <TouchableOpacity style={styles.button2} onPress={Company}>
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
  buttonWrapper: {
    alignItems: 'center',
    marginTop: 50,
    top:'30%'
  },
  button1: {
    backgroundColor: '#F36210',
    width: 250,
    height: 80,
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
    borderRadius: 20,
    shadowOpacity: 0.7,
    shadowColor: '#fff',
    shadowOffset: { width: 2, height: 2 },
  }
});
