import { Dimensions, StyleSheet, Text, View, Alert, Button, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

const { width, height } = Dimensions.get('window');

export default function ReservScreen() {
  const [selectedPlaces, setSelectedPlaces] = useState('');
  const [tel, setTel] = useState('');
  const [showTicketButton, setShowTicketButton] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isReservationDisabled, setIsReservationDisabled] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { companyName, companyDestinations, selectedDestination } = route.params || {};
  const firstDestination = selectedDestination || (companyDestinations && companyDestinations.length > 0 ? companyDestinations[0] : null);

  const [tarifTravel, setTarifTravel] = useState(firstDestination ? firstDestination.tarifTravel ?? '' : '');

  const reservationData = {
    tel: tel,
    nombre_place: parseInt(selectedPlaces),
    heure_depart: selectedTime || '',
    compagnie: companyName,
    destination: selectedDestination?.destination || firstDestination?.destination || '', // Ensure a value is provided
    gare: selectedDestination?.gare || firstDestination?.gare || '', // Ensure a value is provided
  };

  const Reservation = async () => {
    try {
      const response = await axios.post('https://xnova-back-end-dgb2.onrender.com/api/user/Reservation', reservationData);
      console.log('Code de réservation:', response.data.code);
      Alert.alert('Votre code de réservation est:', `Code: ${response.data.code}\nVous êtes prié de vous rendre à la gare pour le paiement avant la date du : ${response.data.codeExpiration}`);
  
      setShowTicketButton(true);
      setIsReservationDisabled(true);
    } catch (error) {
      if (error.response) {
        console.error('Erreur de requête :', error.response.data);
        Alert.alert('Réservation non effectuée. Veuillez vérifier le numéro de téléphone.');
      } else {
        console.error('Erreur lors de la requête :', error.message);
      }
    }
  };

  const handleViewTicketPress = () => {
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
            top: height * 0.03,
            left: width * 0.03,
            padding: width * 0.03,
          }}
        >
          <Icon name="arrow-back" size={width * 0.1} color="#246EC3" />
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: width * 0.06 }}>Réservation</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Nombre de places"
          value={selectedPlaces}
          onChangeText={(text) => setSelectedPlaces(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Numéro"
          value={tel}
          onChangeText={setNumeroWithCountryCode}
        />
        <RNPickerSelect
          onValueChange={(value) => setSelectedTime(value)}
          items={companyDestinations.map((destination) => ({
            label: destination.depart,
            value: destination.depart,
          }))}
          style={styles.pickerSelect}
        />
        <View style={styles.btn}>
          <Button
            title="Réserver"
            onPress={Reservation}
            disabled={isReservationDisabled}
          />
        </View>
        {showTicketButton && (
          <View style={styles.btn1}>
            <Button title="Voir Ticket" onPress={handleViewTicketPress} />
          </View>
        )}
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
    height: height * 0.13,
    backgroundColor: '#F36210',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.05,
    marginBottom: height * 0.1,
  },
  btn: {
    width: width * 0.3,
    height: height * 0.05,
    backgroundColor: '#F36210',
    top: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  btn1: {
    width: width * 0.3,
    height: height * 0.05,
    backgroundColor: '#F36210',
    top: height * 0.13,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  textInput: {
    width: width * 0.85,
    height: height * 0.05,
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    top: height * 0.03,
    backgroundColor: '#fff',
    left: 2,
  },
  pickerSelect: {
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30,
      backgroundColor: "#fff",
      marginTop: height * 0.08,
      width: width * 0.85,
      height: height * 0.05,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
      backgroundColor: "#fff",
      marginTop: height * 0.08,
      width: width * 0.85,
      height: height * 0.05,
    },
  },
});

