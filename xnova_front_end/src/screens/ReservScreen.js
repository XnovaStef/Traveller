import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, ScrollView, Alert, Button } from 'react-native'; // Added Button
import 'react-native-gesture-handler';
import Navbar from '../components/tab';
import CountryPicker from 'react-native-country-picker-modal';
import ServiceBox from '../components/ServicesBox';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

export default function ReservScreen() {

    const [selectedPlaces, setSelectedPlaces] = useState(null);

  // State to hold the values of the text inputs
 

  // Function to calculate and update the tariff based on parcel value
  const handleParcelValueChange = (value) => {
    // Implement your tariff calculation logic here
    // For example, you can set a fixed tariff based on the entered value
    const tariff = parseFloat(value) + 500; // Assuming a tariff calculation formula
    setTextInput2(tariff.toFixed(2)); // Update textInput2 with the calculated tariff
  };

  const handlePayButtonPress = () => {
    Alert.alert('Réservation');
  };

  return (
<View style = {styles.container}>
    <View style = {styles.header}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>Paiement voyage</Text>
    </View>
    <View style={styles.inputsContainer}>
        <Text style={{ color: '#246EC3', fontWeight: 'bold', fontSize: 15 }}>
            Nombre de places
        </Text>
 
            <RNPickerSelect
            placeholder={{ label: 'Nombre de places', value: null }}
            onValueChange={(value) => setSelectedPlaces(value)}
            style={pickerSelectStyles}
            items={[
                { label: '1', value: 1 },
                { label: '2', value: 2 },
                { label: '3', value: 3 },
                { label: '1', value: 1 },
                { label: '2', value: 2 },
                { label: '3', value: 3 },
                // Add more options as needed
            ]}
            />

<Text style={{ color: '#246EC3', fontWeight: 'bold', fontSize: 15, top:30 }}>
                Heure de départ
            </Text>

                <RNPickerSelect
                placeholder={{ label: 'Heure de départ', value: null }}
                onValueChange={(value) => setSelectedPlaces(value)}
                style={pickerSelectStyles1}
                items={[
                    { label: '07h30', value: 1 },
                    { label: '10h', value: 2 },
                    { label: '08h30', value: 3 },
                    { label: '07h30', value: 1 },
                    { label: '10h', value: 2 },
                    { label: '08h30', value: 3 },
                    { label: '07h30', value: 1 },
                    { label: '10h', value: 2 },
                    { label: '08h30', value: 3 },
                    // Add more options as needed
                ]}
                />

            <View style={styles.btn}>
                <Button title="Réserver" onPress={handlePayButtonPress} />
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
    marginTop:20,
    marginBottom:100
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      width: 300,
      height: 50,
      borderColor: '#fff',
      borderWidth: 1,
      paddingHorizontal: 10,
      marginBottom: 10,
      top: 30,
      backgroundColor: '#fff',
      left:15
    },
    inputAndroid: {
      // Adjust Android styles if needed
    },
  });

  const pickerSelectStyles1 = StyleSheet.create({
    inputIOS: {
      width: 300,
      height: 50,
      borderColor: '#fff',
      borderWidth: 1,
      paddingHorizontal: 10,
      marginBottom: 10,
      top: 50,
      backgroundColor: '#fff',
      left:15
    },
    inputAndroid: {
      // Adjust Android styles if needed
    },
  });
