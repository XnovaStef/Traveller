import { StatusBar, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Contacts from 'react-native-contacts';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;

export default function ColisScreen() {
  const [textInput1, setTextInput1] = useState('');
  const [textInput2, setTextInput2] = useState('');
  const [textInput3, setTextInput3] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [tel, setTel] = useState('')
  const [destinataire, setDestinataire] = useState('')


  const navigation = useNavigation();

  const route = useRoute();
  const { companyName, companyDestinations, selectedDestination } = route.params || {};
  const firstDestination = selectedDestination || (companyDestinations && companyDestinations.length > 0 ? companyDestinations[0] : null);

  useEffect(() => {
    // Logique pour récupérer le tarif de la destination sélectionnée
    const tarifColisValue = selectedDestination?.tarifColis || (firstDestination ? firstDestination.tarifColis : '');
  
    // Mettez à jour l'état tarifColis avec la valeur récupérée
    setTarifColis(tarifColisValue);
  }, [selectedDestination, firstDestination]);
  

  const [tarifColis, setTarifColis] = useState('');

  const reservationData = {
    tel: tel,
    compagnie: companyName,
    destination: selectedDestination?.destination || firstDestination?.destination || '',
    gare: selectedDestination?.gare || firstDestination?.gare || '',
    montant: textInput2,
    valeur_colis: textInput1,
    tel_destinataire: destinataire
  };

  console.log("reservation:", reservationData)
  console.log("colis:", tarifColis)


  const handlePayButtonPress = async () => {
    try {
      const response = await axios.post('https://xnova-back-end-dgb2.onrender.com/api/user/Colis', reservationData);
      console.log('Code de réservation:', response.data.code);
      Alert.alert('Votre code de paiement est:', `Code: ${response.data.code}`);
      setShowTicket(true);
    } catch (error) {
      console.error('Error:', error.message); // Log the detailed error message
      if (error.response) {
        console.error('Erreur de requête :', error.response.data);
        Alert.alert('Paiement non effectuée. Veuillez vérifier le numéro de téléphone.');
      } else {
        console.error('Erreur lors de la requête :', error.message);
        Alert.alert('Réservation non effectuée. Veuillez réessayer plus tard.');
      }
    }
  };
  

  const handleShowTicketPress = () => {
    navigation.navigate('Pass');
  };

  const handleTextInput1Change = (value) => {
    const intValue = parseInt(value, 10);
    setTextInput1(intValue.toString()); // Set the input as a string to display in the TextInput
    const newValue = intValue * tarifColis; // Ensure both values are integers
    setTextInput2(newValue.toString());
  };
  
  const handleTextInput2Change = (value) => {
    const intValue = parseInt(value, 10);
    setTextInput2(intValue.toString()); // Set the input as a string to display in the TextInput
    const newValue = intValue * tarifColis; // Ensure both values are integers
    setTextInput1(newValue.toString());
  };
  

  const setNumeroWithCountryCode = (text) => {
    if (text.startsWith('+225')) {
      setTel(text);
    } else {
      setTel('+225' + text);
    }
  };

  const setNumeroWithCountryDesti = (text) => {
    if (text.startsWith('+225')) {
      setDestinataire(text);
    } else {
      setDestinataire('+225' + text);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
            <Icon name="arrow-back" size={35} color="#246EC3" />
          </TouchableOpacity>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 30 }}>Paiement colis</Text>
        </View>
        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.input}
            placeholder="Valeur colis"
            value={textInput1}
            onChangeText={handleTextInput1Change}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Tarif"
            value={textInput2}
            onChangeText={handleTextInput2Change}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Numéro destinataire"
            value={destinataire}
            onChangeText={setNumeroWithCountryDesti}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Numéro"
            value={tel}
            onChangeText={setNumeroWithCountryCode}
            keyboardType="phone-pad"
          />

          <TouchableOpacity
            onPress={handlePayButtonPress}
            disabled={paymentCompleted}
            style={[
              styles.btn,
              {
                backgroundColor: paymentCompleted ? '#CCC' : '#F36210',
                width: windowWidth * 0.4,
              },
            ]}
          >
            <Text style={{ color: '#fff' }}>Payer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleShowTicketPress}
            disabled={!showTicket}
            style={[
              styles.btn,
              {
                backgroundColor: !showTicket ? '#CCC' : '#F36210',
                marginTop: 20,
                width: windowWidth * 0.4,
              },
            ]}
          >
            <Text style={{ color: '#fff' }}>Voir ticket</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  },
  input: {
    width: '100%',
    height: 60,
    borderColor: '#F36210',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F36210',
    fontSize: 15,
  },
  btn: {
    height: 40,
    backgroundColor: '#F36210',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    marginBottom: 20,
  },
});
