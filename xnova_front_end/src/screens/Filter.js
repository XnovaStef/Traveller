import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Pop_Up from '../components/pop-up';

export default function Filter() {
  const [destinationFilter, setDestinationFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();
  const { companyName, companyDestinations } = route.params;

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
        data={filteredTransactionHistory}
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
