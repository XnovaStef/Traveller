import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Pop_Up from '../components/pop-up';

const { height, width } = Dimensions.get('window');

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
        const { companyName, companyDestinations } = route.params;

        setCompanyName(companyName);
        setCompanyDestinations(companyDestinations);

        await new Promise((resolve) => setTimeout(resolve, 0));

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

  const handleOptionPress = (destination) => {
    setSelectedDestination(destination);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const filteredDestinations = companyDestinations.flatMap((item) =>
    item.destinationTravel.filter((destination) => {
      const destinationText = destination?.destination || '';
      const isDestinationMatched =
        !destinationFilter ||
        destinationText.toLowerCase().includes(destinationFilter.toLowerCase());
      return isDestinationMatched;
    })
  );

  return (
    <View style={styles.global}>
      <StatusBar style="dark" />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          top: height * 0.02,
          left: width * 0.02,
          padding: width * 0.03,
        }}
      >
        <Ionicons name="arrow-back" size={width * 0.08} color="white" />
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
                  <Ionicons name="close" size={width * 0.05} color="black" />
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
    padding: width * 0.02,
    marginTop: height * 0.02,
    backgroundColor: '#246EC3',
  },
  companyName: {
    fontSize: width * 0.12,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchBar: {
    height: height * 0.05,
    width: '90%',
    borderRadius: width * 0.05,
    backgroundColor: '#fff',
    color: '#000',
    paddingHorizontal: width * 0.02,
    marginBottom: height * 0.01,
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    marginLeft: '5%',
  },
  transactionItem: {
    backgroundColor: '#F36210',
    borderWidth: 0,
    borderRadius: width * 0.35,
    padding: width * 0.03,
    marginVertical: height * 0.005,
    width: '80%',
    height: height * 0.2,
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
    padding: height * 0.04,
    fontSize: width * 0.04,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: width * 0.04,
    borderRadius: width * 0.04,
    alignItems: 'center',
    height: height * 0.6,
  },
  closeIcon: {
    position: 'absolute',
    top: height * 0.01,
    right: width * 0.02,
  },
});
