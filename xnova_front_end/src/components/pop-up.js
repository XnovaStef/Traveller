import 'react-native-gesture-handler';
import { Text, View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Pop_Up() {
  const [isChecked, setIsChecked] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true); // State for controlling the popup
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const openGoogleMaps = () => {
    const latitude = 123.400; // Replace with the actual latitude of the destination
    const longitude = 456.700; // Replace with the actual longitude of the destination

    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const Pay = () => {
    navigation.navigate("Pay");
    setIsPopupOpen(false); // Close the popup after navigating
  };

  const Book = () => {
    navigation.navigate("Reserv");
    setIsPopupOpen(false); // Close the popup after navigating
  };

  return (
    <View style={styles.global}>
      {isPopupOpen && ( // Render the popup only if isPopupOpen is true
        <View style={styles.popupContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.text}>Voyages: 7000fcfa</Text>
            <Text style={styles.text}>Gares: Koumassi</Text>
            <Text style={styles.text}>Horaires: 7h - 20h</Text>
          </View>

          {/* Button to open Google Maps */}
          <TouchableOpacity style={styles.mapbutton} onPress={openGoogleMaps}>
            <Ionicons name="add" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkbox} onPress={toggleCheckbox}>
            <Text style={styles.checkboxText}>continuer</Text>
            {isChecked ? (
              <Ionicons name="checkbox-outline" size={24} color="#F36210" />
            ) : (
              <Ionicons name="square-outline" size={24} color="black" />
            )}
          </TouchableOpacity>

          {/* Buttons */}
          {isChecked && (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button} onPress={Pay}>
                <Text style={styles.buttonText}>Paiements</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={Book}>
                <Text style={styles.buttonText}>Réservation</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  global: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Add elevation for a shadow effect
  },
  infoContainer: {
    marginTop: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    fontSize: 14,
    marginRight: 5,
  },
  buttonsContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#F36210',
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  mapbutton: {
    alignSelf: 'flex-end',
    top:-80,
    left:15
  },
});
