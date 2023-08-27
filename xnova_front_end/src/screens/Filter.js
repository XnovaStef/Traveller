import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Modal, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Pop_Up from '../components/pop-up';
import { Ionicons } from '@expo/vector-icons';

export default function Filter() {
  const [filterText, setFilterText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);


  const destinations = [
    { id: 1, name: 'Bondoukou' },
    { id: 2, name: 'Man' },
    { id: 3, name: 'Daloa' },
    { id: 4, name: 'Dabou' },
    { id: 5, name: 'Bonoua' },
    { id: 6, name: 'Bouna' },
    { id: 7, name: 'Bouaké' },
    { id: 8, name: 'Abidjan' },
    { id: 9, name: 'Divo' },
  ];

  const handleFilter = (text) => {
    const filteredDestinations = destinations.filter(destination =>
      destination.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilterText(text);
    setFilteredData(filteredDestinations);
  };

  const renderDestinationItem = ({ item }) => (
    <View style={styles.destinationItem}>
      <TouchableOpacity onPress={() => handleOptionPress(item)} style={{ left: '90%' }}>
        <Icon name="ellipsis-v" size={20} color="#fff" />
      </TouchableOpacity>
      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, marginLeft: 20 }}>{item.name}</Text>
    </View>
  );

  const handleOptionPress = (destination) => {
    setSelectedDestination(destination);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={filterText}
        onChangeText={handleFilter}
      />
      <FlatList
        style={styles.flatList}
        data={filteredData.length > 0 ? filteredData : destinations}
        keyExtractor={item => item.id.toString()}
        renderItem={renderDestinationItem}
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#000', // Adjust border color
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8,
    marginBottom: 40,
    top: 20,
    color: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    elevation: 4,
    shadowOpacity: 1,
  },
  flatList: {
    flex: 1,
  },
  destinationItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    height: 60,
    weight: 10,
    backgroundColor: '#F36210',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    height:'60%',
    width:'90%'
  },
  closeIcon: {
    position: 'absolute',
top: 10, // Adjust the top position to your desired distance from the top edge
right: 10,
  },
});
