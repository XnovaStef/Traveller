import { StyleSheet, Text, View, Alert, Button, TextInput,TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons'; // Import de l'icône
import DropDownPicker from 'react-native-dropdown-picker';

export default function VoyagesScreen() {
  const [selectedPlaces, setSelectedPlaces] = useState(null);
  const [selectedDepartureTime, setSelectedDepartureTime] = useState('');
  const [placesCount, setPlacesCount] = useState(1);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showTicket, setShowTicket] = useState(false);

  const navigation = useNavigation();



  const handlePayButtonPress = () => {
    // Effectuer ici le traitement de paiement, puis activer les fonctionnalités suivantes :
    setPaymentCompleted(true);
    setShowTicket(true);
    Alert.alert('Payment');
  };

  const handleShowTicketPress = () => {
    // Actions pour afficher le ticket
    navigation.navigate("Pass");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>Paiement voyage</Text>
      </View>
      <View style={styles.inputsContainer}>
        {/* DropDown pour le nombre de places */}
        <DropDownPicker
          items={[
            { label: '1 place', value: 1 },
            { label: '2 places', value: 2 },
            
            
          ]}
          defaultValue={placesCount}
          containerStyle={{ height: 50, width: 300, marginBottom: 30 }}
          placeholder="Nombre de place"
          style={{ backgroundColor: '#FFF',  borderColor:"#FFF"  }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{ backgroundColor: '#FFF' }}
          onChangeItem={(item) => setPlacesCount(item.value)}
        />

        {/* DropDown pour les heures de départ */}
        <DropDownPicker
          items={[
            { label: '08:00', value: '08:00' },
            { label: '10:00', value: '10:00' },
           
          ]}
          defaultValue={selectedDepartureTime}
          containerStyle={{ height: 50, width: 300, marginBottom: 10 }}
          placeholder="Heures de départ"
          style={{ backgroundColor: '#FFF',  borderColor:"#FFF"  }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{ backgroundColor: '#FFF',}}
          onChangeItem={(item) => setSelectedDepartureTime(item.value)}
        />

<TouchableOpacity
          onPress={handlePayButtonPress}
          disabled={paymentCompleted} // Désactive le bouton une fois le paiement effectué
          style={[styles.btn, { backgroundColor: paymentCompleted ? '#CCC' : '#F36210' }]}
        >
          <Text style={{ color: '#fff' }}>Payer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleShowTicketPress}
          disabled={!showTicket} // Désactive le bouton tant que le ticket n'est pas disponible
          style={[styles.btn, { backgroundColor: !showTicket ? '#CCC' : '#F36210', marginTop: 20 }]}
        >
          <Text style={{ color: '#fff' }}>Voir ticket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: '13%',
    backgroundColor: '#F36210',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 100,
  },
  btn: {
    width: 100,
    height: 40,
    backgroundColor: '#F36210',
    top: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  textInput: {
    width: 300,
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    top: 30,
    backgroundColor: '#fff',
    left: 15,
  },
});
