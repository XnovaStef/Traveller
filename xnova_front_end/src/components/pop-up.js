import 'react-native-gesture-handler';
import { Text, View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { Linking } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

export default function Pop_Up({ selectedDestination, onClose }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true); // State for controlling the popup
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const route = useRoute();
  const { companyName, companyDestinations } = route.params; // Récupération du nom de la compagnie

  console.log("travel:",selectedDestination.tarif)



  /*
  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://192.168.1.11:3005/api/getDestinationTravel?page=${page}`
          );
         
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [page]);
  */

  

  const openGoogleMaps = () => {
    const latitude = 123.400; // Replace with the actual latitude of the destination
    const longitude = 456.700; // Replace with the actual longitude of the destination

    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const travel = () => {
    setIsPopupOpen(false); // Ferme le pop-up
    navigation.goBack(); // Retourne à la page précédente
    navigation.navigate("Voyages", { companyName, companyDestinations, selectedDestination }); // Navigue vers la page "Voyages" avec les données
    console.log("Navigated to Voyages with:", { companyName, companyDestinations, selectedDestination });
  };
  
  const colis = () => {
    setIsPopupOpen(false); // Ferme le pop-up
    navigation.goBack(); // Retourne à la page précédente
    navigation.navigate("Colis", { companyName, companyDestinations, selectedDestination }); // Navigue vers la page "Colis" avec les données
    console.log("Navigated to Colis with:", { companyName, companyDestinations, selectedDestination });
   
  };
  
  const Book = () => {
    setIsPopupOpen(false); // Ferme le pop-up
    navigation.goBack(); // Retourne à la page précédente
    navigation.navigate("Reserv", { companyName, companyDestinations, selectedDestination }); // Navigue vers la page "Reserv" avec les données
    console.log("Navigated to Reserv with:", { companyName, companyDestinations, selectedDestination });
  };
  const renderSelectedDestination = () => {
    if (selectedDestination) {
      const { destination, tarif, gare } = selectedDestination;
      return (
        <View style={styles.infoContainer}>
          <Text>{`Destination: ${destination || 'N/A'}`}</Text>
          <Text>{`Tarif Travel: ${tarif !== undefined ? tarif : 'N/A'}`}</Text>
          <Text>{`Gare: ${gare || 'N/A'}`}</Text>
        </View>
      );
    } else {
      return null;
    }
  };
  
  
  
  
  
  
  


  return (
    <View style={styles.global}>
      {isPopupOpen && ( // Render the popup only if isPopupOpen is true
        <View style={styles.popupContainer}>
          <View style={styles.infoContainer}>
          {renderSelectedDestination()}
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
              <TouchableOpacity style={styles.button} onPress={travel}>
                <Text style={styles.buttonText}>Voyages</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={colis}>
                <Text style={styles.buttonText}>Colis</Text>
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
