import { StyleSheet, Text, View, Alert, Button, TextInput } from 'react-native';
import React, { useState } from 'react';

export default function ReservScreen() {
  const [selectedPlaces, setSelectedPlaces] = useState('');
  const [selectedDepartureTime, setSelectedDepartureTime] = useState('');

  const handlePayButtonPress = () => {
    Alert.alert('Réservation effectuée');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>Réservation</Text>
      </View>
      <View style={styles.inputsContainer}>
        <Text style={{ color: '#246EC3', fontWeight: 'bold', fontSize: 15 }}>Nombre de places</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nombre de places"
          value={selectedPlaces}
          onChangeText={(text) => setSelectedPlaces(text)}
        />

        <Text style={{ color: '#246EC3', fontWeight: 'bold', fontSize: 15, top: 30 }}>Heure de départ</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Heure de départ"
          value={selectedDepartureTime}
          onChangeText={(text) => setSelectedDepartureTime(text)}
        />

<Text style={{ color: '#246EC3', fontWeight: 'bold', fontSize: 15, top: 30 }}>Compagnie</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Compagnie"
          value={selectedDepartureTime}
          onChangeText={(text) => setSelectedDepartureTime(text)}
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
