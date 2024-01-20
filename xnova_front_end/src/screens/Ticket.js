import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import Navbar from '../components/tab';
import QRCode from 'react-native-qrcode-svg';
import * as Animatable from 'react-native-animatable'; // Import Animatable
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';


export default function HistoryScreen() {
  const [datePay, setDatePay] = useState('');
  const [nature, setNature] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const ticketData = {
    qrCodeData: 'Your QR Code Data',
    paymentDate: '2023-10-07',
    transaction: 'Paiement',
    numberOfTickets: 2,
    paymentTime: '14:30',
  };

  const route = useRoute();
  const { tel, code } = route.params; // Récupération du nom de la compagnie

// Utilisation de la nouvelle route
useEffect(() => {
  if (!isLoading) {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const [travelResponse, colisResponse, reservationResponse] = await Promise.all([
          axios.get(`https://xnova-back-end-dgb2.onrender.com/api/user/everyTravelInfoTelCode/${tel}/${code}?page=${page}`),
          axios.get(`https://xnova-back-end-dgb2.onrender.com/api/user/everyColisInfoTelCode/${tel}/${code}?page=${page}`),
          axios.get(`https://xnova-back-end-dgb2.onrender.com/api/user/everyReservationInfoTelCode/${tel}/${code}?page=${page}`)
        ]);

        const travelData = travelResponse.data;
        const colisData = colisResponse.data;
        const reservationData = reservationResponse.data;

        const newData = [...travelData, ...colisData, ...reservationData];
        
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
}, [page, tel, code]);


  const filteredTransactionHistory = transactionHistory.filter((item) => {
    const isDateMatched = !datePay || item.datePay.includes(datePay);
    const isNatureMatched = !nature || item.nature.toLowerCase().includes(nature.toLowerCase());
    return isDateMatched && isNatureMatched;
  });

  // Trier les transactions par date de paiement, du plus récent au moins récent
  const sortedTransactionHistory = filteredTransactionHistory.sort((a, b) => {
    const dateA = new Date(a.datePay);
    const dateB = new Date(b.datePay);
    return dateB - dateA;
  });

  return (
    <View style={styles.global}>
    <StatusBar style='dark' />
    <TextInput
      style={styles.searchBar1}
      placeholder="Filtrer par date (YYYY-MM-DD)"
      placeholderTextColor="#000"
      value={datePay}
      onChangeText={(text) => setDatePay(text)}
    />
    <TextInput
      style={styles.searchBar}
      placeholder="Filtrer par nature"
      placeholderTextColor="#000"
      value={nature}
      onChangeText={(text) => setNature(text)}
    />
    <Animatable.View animation="bounceIn" duration={1000} style={styles.bouncingView}>
      <FlatList
        ref={flatListRef}
        data={sortedTransactionHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedItem(item);
              setModalVisible(true);
            }}
          >
            <View style={styles.transactionItem}>
              <Text style={styles.text}>Nature: ticket {item.nature}</Text>
              <Text style={styles.text}>
                Date de Paiement: {item.datePay ? new Date(item.datePay).toLocaleDateString() : 'N/A'}
              </Text>
              <Text style={styles.text}>Heure: {item.timePay}</Text>
              <Text style={styles.text}>Compagnie: {item.compagnie}</Text>
              <Text style={styles.text}>code: {item.code}</Text>
              <Text style={styles.text}>nombre de place: {item.nombre_place}</Text>
              <Text style={styles.text}>Montant: {item.montant}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </Animatable.View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
               
                <QRCode
                    value={JSON.stringify({
                      nature: selectedItem.nature,
                      Date: selectedItem.datePay,
                      Heure: selectedItem.timePay,
                      Place: selectedItem.nombre_place,
                      Destination: selectedItem.destination,
                      Compagnie: selectedItem.Compagnie,
                      Départ: selectedItem.heure_depart,
                    })}
             size={160}
/>

              </>
            )}
            <Icon
        name="close"
        size={30}
        color="#000"
        style={styles.closeIcon}
        onPress={() => setModalVisible(false)}
      />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  global: {
    flex: 1,
  },
  searchBar: {
    height: 40,
    width: '90%',
    borderRadius: 15,
    backgroundColor: '#fff',
    color: '#000',
    paddingHorizontal: 10,
    marginBottom: 40,
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    top: 30,
    marginLeft: 20,
  },
  searchBar1: {
    height: 40,
    width: '90%',
    borderRadius: 15,
    backgroundColor: '#fff',
    color: '#000',
    paddingHorizontal: 10,
    marginBottom: 40,
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    top: 50,
    marginLeft: 20,
  },
  transactionItem: {
    backgroundColor: '#F36210',
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    height: '50%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent:'center',

  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalCloseButton: {
    fontSize: 12,
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 10,
  },
  
  closeIcon: {
    position: 'absolute',
    top: 10, // Adjust the top value to position the icon vertically
    right: 10, // Adjust the right value to position the icon horizontally
  },
  bouncingView: {
    flex: 1,
  },
});
