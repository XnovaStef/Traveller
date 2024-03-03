import { StyleSheet, Text, View, Alert, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';

const screenWidth = Dimensions.get('window').width;

export default function VoyagesScreen() {
  const [selectedPlaces, setSelectedPlaces] = useState(null);
  const [selectedDepartureTime, setSelectedDepartureTime] = useState('');
  const [placesCount, setPlacesCount] = useState(1);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [tel, setTel] = useState('');
  const [tarif, setTarif] = useState('');
  const [numberOfPlaces, setNumberOfPlaces] = useState('');
  const [tarifTravel, setTarifTravel] = useState(null);
  const [textInput1, setTextInput1] = useState('');
  const [textInput2, setTextInput2] = useState('');

  const navigation = useNavigation();

  const route = useRoute();
  const { companyName, companyDestinations, selectedDestination } = route.params || {};
  const firstDestination = selectedDestination || (companyDestinations && companyDestinations.length > 0 ? companyDestinations[0] : null);

  const handleTextInput1Change = (value) => {
    const intValue = parseInt(value, 10);
    setTextInput1(isNaN(intValue) ? '' : intValue.toString());
    const newValue = isNaN(intValue) ? 0 : intValue * tarifTravel;
    setTextInput2(newValue.toString());
  };

  const handleTextInput2Change = (value) => {
    const intValue = parseInt(value, 10);
    setTextInput2(isNaN(intValue) ? '' : intValue.toString());
    const newValue = isNaN(intValue) ? 0 : intValue * tarifTravel;
    setTextInput1(newValue.toString());
  };

  useEffect(() => {
    const tarifValue = selectedDestination?.tarif || (firstDestination ? firstDestination.tarif : '');
    setTarifTravel(tarifValue);
  }, [selectedDestination, firstDestination]);

  const reservationData = {
    tel: tel,
    nombre_place: textInput1,
    heure_depart: selectedTime || '',
    compagnie: companyName,
    destination: selectedDestination?.destination || firstDestination?.destination || '',
    gare: selectedDestination?.gare || firstDestination?.gare || '',
    montant: textInput2,
  };

  console.log('reservation :', reservationData);

  if (!reservationData.destination || !reservationData.gare) {
    console.error('Error: Destination and gare are required.');
    return (
      <View style={styles.container}>
        <Text>Error: Destination and gare are required.</Text>
      </View>
    );
  }

  const handlePayButtonPress = async () => {
    try {
      const response = await axios.post('https://xnova-back-end-dgb2.onrender.com/api/user/Travel', reservationData);
      console.log('Code de paiement:', response.data.code);
      Alert.alert(
        'Votre code de paiement est:',
        `Code: ${response.data.code}\nVous pouvez utiliser ce code pour voir votre ticket de voyage drectement sur l'aplication .`
      );
      setShowTicket(true);
    } catch (error) {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Erreur de requête :', error.response.data);
        Alert.alert("Réservation non effectuée. Veuillez vérifier le numéro de téléphone.");
      } else {
        console.error('Erreur lors de la requête :', error.message);
      }
    }
  };

  const handleShowTicketPress = () => {
    navigation.navigate('Pass');
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
          <Icon name="arrow-back" size={30} color="#246EC3" />
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>Paiement voyage</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Nombre de places"
          value={textInput1}
          onChangeText={handleTextInput1Change}
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
          value={textInput2}
          onChangeText={handleTextInput2Change}
          keyboardType="numeric"
        />

        <RNPickerSelect
          onValueChange={(value) => setSelectedTime(value)}
          items={companyDestinations.map((destination) => ({
            label: destination.depart,
            value: destination.depart,
          }))}
          style={pickerSelectStyles}
        />

        <TouchableOpacity
          onPress={handlePayButtonPress}
          disabled={paymentCompleted}
          style={[styles.btn, { backgroundColor: paymentCompleted ? '#CCC' : '#F36210' }]}
        >
          <Text style={{ color: '#fff' }}>Payer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleShowTicketPress}
          disabled={!showTicket}
          style={[styles.btn, { backgroundColor: !showTicket ? '#CCC' : '#F36210', marginTop: '5%' }]}
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
    paddingHorizontal: '5%',
    marginTop: '5%',
    marginBottom: '10%',
  },
  btn: {
    width: screenWidth > 600 ? '50%' : '70%',
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
    width: screenWidth > 600 ? '70%' : '90%',
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: '5%',
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
    paddingRight: 30,
    backgroundColor: "#fff",
    marginTop: '5%',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: "#fff",
    marginTop: '5%',
  },
});
