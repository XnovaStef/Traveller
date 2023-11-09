import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import Navbar from '../components/tab';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen() {
  const [datePay, setDatePay] = useState('');
  const [tel, setTel] = useState('');
  const [searchCompany, setSearchCompany] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);



  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://192.168.8.166:3005/api/everyTravelInfo?page=${page}`
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
            `http://192.168.8.166:3005/api/everyColisInfo?page=${page}`
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
            `http://192.168.8.166:3005/api/everyReservationInfo?page=${page}`
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

  useEffect(() => {
    AsyncStorage.getItem('accessToken')
      .then(token => {
        AsyncStorage.getItem('userId')
          .then(userId => {
            axios.get(`http://192.168.8.166:3005/api/users/${userId}`, {
              headers: { Authorization: `Bearer ${token}` }
            })
              .then(response => {
                console.log(response.data);
                setTel(response.data.tel);
              })
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }, []);



  

  const filteredTransactionHistory = transactionHistory.filter((item) => {
    const isDateMatched = !datePay || item.datePay.includes(datePay);
    const isCompanyMatched =
      !searchCompany || item.compagnie.toLowerCase().includes(searchCompany.toLowerCase());
    return isDateMatched && isCompanyMatched;
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
        placeholder="Filtrer par compagnie"
        placeholderTextColor="#000"
        value={searchCompany}
        onChangeText={(text) => setSearchCompany(text)}
      />
      <FlatList
        ref={flatListRef}
        data={filteredTransactionHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.text}>Nature: {item.nature}</Text>
            <Text style={styles.text}>
              Date de Paiement: {item.datePay ? new Date(item.datePay).toLocaleDateString() : 'N/A'}
            </Text>
            <Text style={styles.text}>Gare: {item.gare}</Text>
            <Text style={styles.text}>Compagnie: {item.compagnie}</Text>
          </View>
        )}
        //onEndReached={handleEndReached}
        //onEndReachedThreshold={0.1}
      />
           
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
    backgroundColor: '#246EC3',
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
});
