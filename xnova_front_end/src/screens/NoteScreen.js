import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Lottie from 'lottie-react-native';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import de l'icône

export default function CocarScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar style='dark' />
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
        <Icon name="arrow-back" size={30} color="#246EC3" />
      </TouchableOpacity>
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 300, height: 300 }}>
        <Lottie source={require('../assets/images/unvailable.json')} autoPlay loop />
      </View>
      <Text>Service bientôt disponible</Text>
    </View>
  );
}
