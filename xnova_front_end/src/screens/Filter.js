import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Pop_Up from '../components/pop-up';

export default function Filter() {
  const [destinationFilter, setDestinationFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const [companyName, setCompanyName] = useState('');
  const [companyDestinations, setCompanyDestinations] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const fetchData = async () => {
      if (route && route.params) {
        const { companyName, companyDestinations,  } = route.params;
  
        // Update states with routed information
        setCompanyName(companyName);
        setCompanyDestinations(companyDestinations);
  
        // Wait for the data to be loaded
        await new Promise(resolve => setTimeout(resolve, 0));
  
        // Extract and display tarifTravel
        companyDestinations.forEach((destination) => {
          destination.destinationTravel.forEach((dest) => {
            const tarif = dest.Travel !== undefined ? dest.Travel : 'N/A';
            const tarifColis = dest.Colis !== undefined ? dest.Colisww : 'N/A';
            console.log(`Tarif for ${dest.destination}: ${tarif}`);
            console.log(`TarifColis for ${dest.destination}: ${tarifColis}`);
          });
        });
      }
    };
  
    fetchData();
  }, [route]);
  

  // Add these logs to help debug
console.log('companyDestinations:', companyDestinations);
console.log('filteredDestinations:', filteredDestinations);



const handleOptionPress = (destination) => {
  console.log('Selected destination:', destination);
  setSelectedDestination(destination);
  setShowModal(true);
};



  const closeModal = () => {
    setShowModal(false);
  };

  const filteredDestinations = companyDestinations.flatMap((item) =>
  item.destinationTravel.filter((destination) => {
    const destinationText = destination?.destination || '';
    const isDestinationMatched = !destinationFilter || destinationText.toLowerCase().includes(destinationFilter.toLowerCase());
    return isDestinationMatched;
  })
);

  
  
  

  return (
    <View style={styles.global}>
      <StatusBar style='dark' />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          top: 0,
          left: 5,
          padding: 10,
        }}
      >
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <View>
        <Text style={styles.companyName}>{companyName}</Text>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="destination..."
        placeholderTextColor="#000"
        value={destinationFilter}
        onChangeText={(text) => setDestinationFilter(text)}
      />
      <FlatList
        data={filteredDestinations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleOptionPress(item)}>
            <View style={styles.transactionItem}>
              <Text style={styles.text}>{item.destination}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          {selectedDestination && (
              <>
                <Pop_Up
                  selectedDestination={selectedDestination}
                  onClose={() => setShowModal(false)}
                />
                <TouchableOpacity style={styles.closeIcon} onPress={closeModal}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  global: {
    flex: 1,
    padding: 10,
    marginTop: 40,
    backgroundColor: '#246EC3',
  },
  companyName: {
    fontSize: 45,
    color: "#fff",
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchBar: {
    height: 40,
    width: '90%',
    borderRadius: 15,
    backgroundColor: '#fff',
    color: '#000',
    paddingHorizontal: 10,
    marginBottom: 10,
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    marginLeft: '5%',
  },
  transactionItem: {
    backgroundColor: '#F36210',
    borderWidth: 0,
    borderRadius: 70,
    padding: 10,
    marginVertical: 5,
    width: '80%',
    height: 130,
    marginLeft: 'auto',
    marginRight: 'auto',
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  text: {
    color: '#246EC3',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    fontSize: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    height: 500,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
