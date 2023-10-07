import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable'; // Import react-native-animatable
import TicketCode from '../components/ticketCode';

export default function PaymentScreen() {
  const [filterText, setFilterText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const paymentDates = [
    { id: 1, date: '2023-09-25', time: '10:00 AM' },
    { id: 2, date: '2023-09-26', time: '2:30 PM' },
    { id: 3, date: '2023-09-28', time: '9:15 AM' },
    { id: 4, date: '2023-09-25', time: '10:00 AM' },
    { id: 5, date: '2023-09-26', time: '2:30 PM' },
    { id: 6, date: '2023-09-28', time: '9:15 AM' },
    // Add more payment dates and times as needed
  ];

  const handleFilter = (text) => {
    const filteredPayments = paymentDates.filter((payment) =>
      payment.date.toLowerCase().includes(text.toLowerCase()) ||
      payment.time.toLowerCase().includes(text.toLowerCase())
    );
    setFilterText(text);
    setFilteredData(filteredPayments);
  };

  const renderPaymentItem = ({ item }) => (
    <Animatable.View animation="bounceIn" duration={3000}>
      <TouchableOpacity
        style={styles.paymentItem}
        onPress={() => handleOptionPress(item)}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, marginLeft: 20 }}>
          Date: {item.date}
        </Text>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, marginLeft: 20 }}>
          Heure: {item.time}
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  const handleOptionPress = (payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPayment(null);
    setShowModal(false);
  };

  const bounceEffect = {
    0: {
      opacity: 0,
      translateY: -100, // Move the element up by 100 units
    },
    1: {
      opacity: 1,
      translateY: 0, // Return to its original position
    },
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by date or time"
        value={filterText}
        onChangeText={handleFilter}
      />
      <FlatList
        style={styles.flatList}
        data={filteredData.length > 0 ? filteredData : paymentDates}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPaymentItem}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        {/* Apply the Bouncing Entrance effect to the modal container */}
        <Animatable.View animation={bounceEffect} duration={1000} style={styles.modalContainer}>
          {/* Apply the Bouncing Entrance effect to the modal content */}
          <Animatable.View animation="bounceIn" style={styles.modalContent}>
            {selectedPayment && (
              <>
                <TicketCode />
                <TouchableOpacity style={styles.closeIcon} onPress={closeModal}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              </>
            )}
          </Animatable.View>
        </Animatable.View>
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
    borderColor: '#000',
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
  paymentItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    height: 80,
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
    height: '60%',
    width: '90%',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
