import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Alert, Modal } from 'react-native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import Navbar from '../components/tab';
import { useNavigation, useRoute } from '@react-navigation/native';
import Pop_Up from '../components/pop-up';
import { Ionicons } from '@expo/vector-icons';

export default function Filter() {
  const [datePay, setDatePay] = useState('');
  const [searchCompany, setSearchCompany] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);
  const [destinationFilter, setDestinationFilter] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const navigation = useNavigation();

  const route = useRoute();
  const { companyName, companyDestinations } = route.params; // Récupération du nom de la compagnie

 /* useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://192.168.8.125:3005/api/everyTravelInfo?page=${page}`
          );
          const newData = response.data;
          if (newData.length > 0) {
            setTransactionHistory((prevData) => [...prevData, ...newData]);
            setPage(page + 1);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [page]);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://192.168.8.125:3005/api/everyColisInfo?page=${page}`
          );
          const newData = response.data;
          if (newData.length > 0) {
            setTransactionHistory((prevData) => [...prevData, ...newData]);
            setPage(page + 1);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  // }, [page])*/
/*
  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://192.168.8.197:3005/api/getDestinationTravel?page=${page}`
          );
          const newData = response.data;
          if (newData.length > 0) {
            setTransactionHistory((prevData) => [...prevData, ...newData]);
            setPage(page + 1);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [page]);

  /*const handleEndReached = () => {
    if (!isLoading) {
      flatListRef.current.scrollToEnd({ animated: true });
      setPage(page + 1);
    }
  };*/

  const handleOptionPress = (destination) => {
    setSelectedDestination(destination);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  

  const filteredTransactionHistory = companyDestinations.filter((item) => {
    const isDestinationMatched = !destinationFilter || item.toLowerCase().includes(destinationFilter.toLowerCase());
    return isDestinationMatched;
  });
  
  
  

  return (
    <View style={styles.global}>
      <StatusBar style='dark' />
      <View>
      <Text style={{ fontSize: 45, color: "#fff", fontWeight: 'bold' }}>Destination {companyName}</Text>

      </View>
      <TextInput
  style={styles.searchBar}
  placeholder="destination..."
  placeholderTextColor="#000"
  value={destinationFilter}
  onChangeText={(text) => setDestinationFilter(text)}
/>

<FlatList
  data={filteredTransactionHistory} // Utilisation de filteredTransactionHistory pour afficher les destinations filtrées
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => handleOptionPress(item)}>
      <View style={styles.transactionItem}>
      <Text style={styles.text}>{item.destinationTravel}</Text>

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
              <><Pop_Up
                destination={selectedDestination}
                onClose={() => setShowModal(false)} /><TouchableOpacity style={styles.closeIcon} onPress={closeModal}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity></>
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
    marginTop: 40, // Add margin to separate from the top
    backgroundColor: '#246EC3',
  },
  searchBar: {
    height: 40,
    width: '90%',
    borderRadius: 15,
    backgroundColor: '#fff',
    color: '#000',
    paddingHorizontal: 10,
    marginBottom: 10, // Reduce margin for the search bar
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    marginLeft:20
  },
  transactionItem: {
    backgroundColor: '#F36210',
    borderWidth: 0,
    borderRadius: 70, // Utilisez un nombre suffisamment élevé pour obtenir une forme circulaire
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    width:300,
    height:130,
    marginLeft:'8%',
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,


  },
  text: {
    color: '#246EC3',
    fontWeight: 'bold',
textAlign:'center',
padding:50,
fontSize:15
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
    height:500
  },

  closeIcon: {
    position: 'absolute',
top: 10, // Adjust the top position to your desired distance from the top edge
right: 10,
  },
});
