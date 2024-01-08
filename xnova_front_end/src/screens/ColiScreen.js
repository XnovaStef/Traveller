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
import { useNavigation } from '@react-navigation/native';
import Contacts from 'react-native-contacts';

const windowWidth = Dimensions.get('window').width;

export default function ColisScreen() {
  const [textInput1, setTextInput1] = useState('');
  const [textInput2, setTextInput2] = useState('');
  const [textInput3, setTextInput3] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showTicket, setShowTicket] = useState(false);

  const navigation = useNavigation();

  const handlePayButtonPress = () => {
    setPaymentCompleted(true);
    setShowTicket(true);
    Alert.alert('Payment');
  };

  const handleShowTicketPress = () => {
    navigation.navigate('Pass');
  };

  const handleTextInput1Change = (value) => {
    setTextInput1(value);
    const newValue = parseFloat(value) + 500;
    setTextInput2(newValue.toFixed(2));
  };

  const handleTextInput2Change = (value) => {
    setTextInput2(value);
    const newValue = parseFloat(value) - 500;
    setTextInput1(newValue.toFixed(2));
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
            value={textInput3}
            onChangeText={setTextInput3}
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
