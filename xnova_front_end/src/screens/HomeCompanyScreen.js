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
          const response = await axios.get(
            `http://192.168.8.197:3005/api/user/everyTravelInfo?page=${page}`
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
            `http://192.168.8.197:3005/api/user/everyColisInfo?page=${page}`
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
            `http://192.168.8.197:3005/api/user/everyReservationInfo?page=${page}`
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

  

  // Update the transaction filter logic to include date and station
const filteredTransactionHistory = transactionHistory.filter(item => {
  const isDateMatched = !datePay || item.datePay.includes(datePay);
  const isStationMatched = !searchStation || item.gare.toLowerCase().includes(searchStation.toLowerCase());
  return isDateMatched && isStationMatched;
});


return (
  <View style={styles.global}>
    <StatusBar style='dark' />
    <Nav />

    <TextInput
      style={styles.searchBar}
      placeholder="Filtrer par date (YYYY-MM-DD)"
      placeholderTextColor="#000"
      value={datePay}
      onChangeText={(text) => setDatePay(text)}
    />
    <TextInput
      style={styles.searchBar1}
      placeholder="Filtrer par gare"
      placeholderTextColor="#000"
      value={searchStation}
      onChangeText={(text) => setSearchStation(text)}
    />

    <FlatList
      data={filteredTransactionHistory}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.transactionItem}>
          <Text style={styles.text}>Nature: {item.nature}</Text>
          <Text style={styles.text}>
            Date de Paiement: {item.datePay ? new Date(item.datePay).toLocaleDateString() : 'N/A'}
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
    marginBottom: 10,
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
