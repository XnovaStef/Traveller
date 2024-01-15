import { StyleSheet, Text, View, Alert, Button, TextInput,TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons'; // Import de l'icône
import DropDownPicker from 'react-native-dropdown-picker';
import RNPickerSelect from "react-native-picker-select";

export default function VoyagesScreen() {
  const [selectedPlaces, setSelectedPlaces] = useState(null);
  const [selectedDepartureTime, setSelectedDepartureTime] = useState('');
  const [placesCount, setPlacesCount] = useState(1);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [tel, setTel] = useState('');
  const [tarif, setTarif] = useState('');
  const [numberOfPlaces, setNumberOfPlaces] = useState(0);


  const navigation = useNavigation();

  const route = useRoute();
  const { companyName, companyDestinations } = route.params || {};
  const firstDestination = companyDestinations && companyDestinations.length > 0 ? companyDestinations[0] : null;

  const [selectedDestination, setSelectedDestination] = useState(firstDestination ? firstDestination.destinationTravel : null);
  const [selectedStation, setSelectedStation] = useState(firstDestination ? firstDestination.gareTravel : null);
  const defaultTarifTravel = firstDestination ? firstDestination.tarifTravel ?? '' : '';

  const [tarifTravel, setTarifTravel] = useState(defaultTarifTravel);

// Update tariff based on the number of places
useEffect(() => {
  const calculatedTarif = numberOfPlaces * parseFloat(defaultTarifTravel);
  setTarifTravel(isNaN(calculatedTarif) ? '' : calculatedTarif.toString());
}, [numberOfPlaces, defaultTarifTravel]);
  

  
  const reservationData = {
    tel: tel,
    nombre_place: numberOfPlaces,
    heure_depart: selectedTime || '',
    compagnie: companyName,
    destination: selectedDestination,
    gare: selectedStation,
    montant: tarifTravel,
  };


  const handlePayButtonPress = async () => {
    try {
      const response = await axios.post('https://xnova-back-end.onrender.com/api/user/Travel', reservationData);
      console.log('Code de réservation:', response.data.code);
      Alert.alert('Votre code de réservation est:', `Code: ${response.data.code}\nVous êtes prié de vous rendre à la gare pour le paiement avant la date du : ${response.data.codeExpiration}`);
      setShowTicket(true);
    } catch (error) {
      console.error('Error:', error.message); // Log the detailed error message
      if (error.response) {
        console.error('Erreur de requête :', error.response.data);
        Alert.alert('Réservation non effectuée. Veuillez vérifier le numéro de téléphone.');
      } else {
        console.error('Erreur lors de la requête :', error.message);
      }
    }
    
  };

  const handleShowTicketPress = () => {
    // Actions pour afficher le ticket
    navigation.navigate("Pass");
  };

  const setNumeroWithCountryCode = (text) => {
    if (text.startsWith('+225')) {
      setTel(text);
    } else {
      setTel('+225' + text);
    }
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
      <TextInput
  style={styles.textInput}
  placeholder="Nombre de places"
  value={String(numberOfPlaces)}
  onChangeText={(text) => {
    const numericValue = parseInt(text);
    setNumberOfPlaces(isNaN(numericValue) ? 1 : numericValue);
  }}
/>


<TextInput
          style={styles.textInput}
          placeholder="Numéro"
          value={tel}
          onChangeText={setNumeroWithCountryCode}
        />

<TextInput
  style={styles.textInput}
  placeholder="Tarif"
  value={String(tarifTravel)}
  onChangeText={(text) => {
    const numericValue = parseFloat(text); // Convert text to number
    setTarifTravel(isNaN(numericValue) ? '' : numericValue.toString()); // Keep as string or set back to an empty string if not a valid number
  }}
  keyboardType="numeric"
/>

        {/* DropDown pour les heures de départ */}
        <RNPickerSelect
onValueChange={(value) => setSelectedTime(value)}
  items={companyDestinations.map((destination) => ({
    label: destination.depart,
    value: destination.depart, // Utiliser la propriété "depart" comme valeur
  }))}
  style={pickerSelectStyles}
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
    width: 340,
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    top: 30,
    backgroundColor: '#fff',
    left: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30 ,// to ensure the text is never behind the icon
    backgroundColor : "#fff",
    marginTop: 50,
  },
  inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: '#fff',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
      backgroundColor : "black",
      marginTop: 50,
  }
});
