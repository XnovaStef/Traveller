import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, ScrollView, Alert, Button } from 'react-native'; // Added Button
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';


export default function ColisScreen() {
  // State to hold the values of the text inputs
  const [textInput1, setTextInput1] = useState('');
  const [textInput2, setTextInput2] = useState('');
  const [textInput3, setTextInput3] = useState('');

  // Function to calculate and update the tariff based on parcel value
  const handleParcelValueChange = (value) => {
    // Implement your tariff calculation logic here
    // For example, you can set a fixed tariff based on the entered value
    const tariff = parseFloat(value) + 500; // Assuming a tariff calculation formula
    setTextInput2(tariff.toFixed(2)); // Update textInput2 with the calculated tariff
  };

  const handlePayButtonPress = () => {
    const paymentDetails = `Input 1: ${textInput1}\nInput 2: ${textInput2}\nInput 3: ${textInput3}`;
    Alert.alert('Payment', paymentDetails);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 30 }}>Paiement colis</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          style={styles.input}
          placeholder="Valeur colis"
          value={textInput1}
          onChangeText={(value) => {
            setTextInput1(value);
            handleParcelValueChange(value); // Call the handler when parcel value changes
          }}
          placeholderTextColor="#fff"
        />
        <TextInput
          style={[styles.input]} // Change the background color to indicate disabled state
          placeholder="Tarif"
          value={textInput2}
          editable={false} // Set the field as non-editable
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          placeholder="Numéro destinataire"
          value={textInput3}
          onChangeText={setTextInput3}
          placeholderTextColor="#fff"
        />
       <View style = {styles.btn}>
       <Button title="Payer" onPress={handlePayButtonPress} />
       </View>
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
  },
  input: {
    width: '100%',
    height: 40,
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
  }
});
