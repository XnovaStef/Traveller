
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';

export default function VoyagesScreen() {
  const [selectedPlaces, setSelectedPlaces] = useState(null);
  const [selectedDepartureTime, setSelectedDepartureTime] = useState(null);

  const handlePayButtonPress = () => {
    Alert.alert('Payment');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>Paiement voyage</Text>
      </View>
      <View style={styles.inputsContainer}>
        <Text style={{ color: '#246EC3', fontWeight: 'bold', fontSize: 15 }}>Nombre de places</Text>
        <RNPickerSelect
          placeholder={{ label: 'Nombre de places', value: null }}
          onValueChange={(value) => setSelectedPlaces(value)}
          style={pickerSelectStyles}
          items={[
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
          ]}
        />
        <Text style={{ color: '#246EC3', fontWeight: 'bold', fontSize: 15, top: 30 }}>Heure de départ</Text>
        <RNPickerSelect
          placeholder={{ label: 'Heure de départ', value: null }}
          onValueChange={(value) => setSelectedDepartureTime(value)}
          style={pickerSelectStyles1}
          items={[
            { label: '07h30', value: 1 },
            { label: '10h', value: 2 },
            { label: '08h30', value: 3 },
          ]}
        />
        <View style={styles.btn}>
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
    left: 15,
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
    left: 15,
  },
});
