import { StatusBar } from 'expo-status-bar';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback, Keyboard ,
  Alert
} from 'react-native';
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'; // Import de l'icône
import { useNavigation, useRoute } from '@react-navigation/native';
import Contacts from 'react-native-contacts';




export default function ColisScreen() {
  // State to hold the values of the text inputs
  const [textInput1, setTextInput1] = useState('');
  const [textInput2, setTextInput2] = useState('');
  const [textInput3, setTextInput3] = useState('');
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


  const handleTextInput1Change = (value) => {
    setTextInput1(value);
    // Mettre à jour textInput2 en fonction de la valeur de textInput1
    const newValue = parseFloat(value) + 500; // Exemple de calcul
    setTextInput2(newValue.toFixed(2));
  };

  const handleTextInput2Change = (value) => {
    setTextInput2(value);
    // Mettre à jour textInput1 en fonction de la valeur de textInput2
    const newValue = parseFloat(value) - 500; // Exemple de calcul inverse
    setTextInput1(newValue.toFixed(2));
  };


  const handleRecipientNumberChange = (value) => {
    setRecipientNumber(value); // Met à jour le numéro du destinataire
  };


  const handleRecipientNumberPress = async () => {
    try {
      const { status } = await Contacts.requestPermission();
      if (status === 'authorized') {
        const selectedContact = await Contacts.pickContact();
        if (selectedContact && selectedContact.phoneNumbers.length > 0) {
          const selectedNumber = selectedContact.phoneNumbers[0].number;
          setRecipientNumber(selectedNumber);
        }
      } else {
        console.log('Permission denied for accessing contacts');
      }
    } catch (error) {
      console.log('Error picking a contact', error);
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
        {/* Utilisation de l'icône de flèche */}
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
        value={textInput3}
        onChangeText={setTextInput3}
        keyboardType="phone-pad"
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
    backgroundColor:'#F36210',
    fontSize:15
  },
  btn:{
    width: 100,
    height: 40,
    backgroundColor: '#F36210',
    top: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  modeContainer: {
    width: '80%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  picker: {
    height: 40,
    width: '100%',
  },
});
