import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Navbar1 from '../components/tab1';
import { StatusBar } from 'expo-status-bar';
import Nav from '../components/nav';
import axios from 'axios';

export default function HomeCompanyScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [datePay, setDatePay] = useState('');
  const [searchStation, setSearchStation] = useState(''); // Add searchStation state
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);





  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const [travelInfo, colisInfo, reservationInfo] = await Promise.all([
            axios.get(`https://xnova-back-end-dgb2.onrender.com/api/user/everyTravelInfo?page=${page}`),
            axios.get(`https://xnova-back-end-dgb2.onrender.com/api/user/everyColisInfo?page=${page}`),
            axios.get(`https://xnova-back-end-dgb2.onrender.com/api/user/everyReservationInfo?page=${page}`)
          ]);
          
          const newData = [
            ...travelInfo.data,
            ...colisInfo.data,
            ...reservationInfo.data
          ];
  
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
  

/*
  const convertDateFormat = (inputDate) => {
    if (!inputDate) return '';
  
    const [day, month, year] = inputDate.split('-');
    const formattedDate = year + '-' + month + '-' + day;
    return formattedDate;
  };

  const formattedDate = datePay ? convertDateFormat(datePay) : '';*/

  const filteredTransactionHistory = transactionHistory.filter((item) => {
    const isDateMatched = !datePay || item.datePay.includes(datePay);
  
    return isDateMatched;
  });
  
  
  


// Sort the filtered transactions by date in descending order
const sortedTransactionHistory = [...filteredTransactionHistory].sort((a, b) => {
  const dateA = new Date(a.datePay).getTime();
  const dateB = new Date(b.datePay).getTime();
  return dateB - dateA; // Sort in descending order (most recent first)
});

return (
  <View style={styles.global}>
    <StatusBar style='dark' />
    <Nav />

    <TextInput
  style={styles.searchBar}
  placeholder="Filtrer par date (MM-DD-YYYY)"
  placeholderTextColor="#000"
  value={datePay} // Assure-toi que cette valeur est correcte
  onChangeText={(text) => {
    console.log('New value entered:', text);
    setDatePay(text);
  }}

/>


    <FlatList
      data={sortedTransactionHistory}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.transactionItem}>
          <Text style={styles.text}>Nature: {item.nature}</Text>
          <Text style={styles.text}>
            Date de Paiement: {item.datePay ? new Date(item.datePay).toLocaleDateString('fr-FR') : 'N/A'}
          </Text>
          <Text style={styles.text}>Gare: {item.gare}</Text>
        </View>
      )}
      style={styles.scrolview}
      ref={flatListRef}
      // Add any other FlatList props here
    />

    <Navbar1 />
  </View>
);
}

const styles = StyleSheet.create({
  global: {
    flexGrow: 1,
    
  },
  searchBar: {
    height: 40,
    width: '90%',
    borderRadius: 15,
    backgroundColor: '#fff',
    color: '#000',
    paddingHorizontal: 10,
    marginBottom: 20,
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    top: 20,
    marginLeft: 20,
  },
  scrolview:{
    width: '100%',
    height:'50%'
  },
  searchBar1: {
    height: 40,
    width: '90%',
    borderRadius: 15,
    backgroundColor: '#fff',
    color: '#000',
    paddingHorizontal: 10,
    marginBottom: 20,
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    top: 20,
    marginLeft: 20,
  },
  transactionItem: {
    backgroundColor: '#246EC3',
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
