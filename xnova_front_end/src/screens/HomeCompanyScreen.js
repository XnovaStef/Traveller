import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Navbar1 from '../components/tab1';
import { StatusBar } from 'expo-status-bar';
import Nav from '../components/nav';

export default function HomeCompanyScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [searchDate, setSearchDate] = useState('');
  const [searchStation, setSearchStation] = useState(''); // Add searchStation state

  // Simulated transaction history data
  const simulatedTransactionData = [
    { id: '1', nature: 'Paiement', date: '2023-08-01', gare: 'Marcory' },
    { id: '2', nature: 'Paiement', date: '2023-08-02', gare: 'Koumassi' },
    {id:'3', nature: 'Réservation',date: '2023-08-02', gare: 'Cocody'},
    {id:'4', nature: 'Réservation',date: '2023-08-02', gare: 'Adjamé'},
    {id:'5', nature: 'Réservation',date: '2023-08-02', gare: 'Port-Bouet'},
    {id:'6', nature: 'Paiement',date: '2023-08-02', gare: 'Anyama'},
    {id:'7', nature: 'Paiement',date: '2023-08-02', gare: 'Treichville'},
    // Add more simulated transaction items here
  ];

  useEffect(() => {
    // Simulate fetching new data for infinite scroll
    // In a real application, you would fetch new data from an API
    const fetchData = () => {
      const startIndex = (page - 1) * 10; // Adjust as needed
      const newData = simulatedTransactionData.slice(startIndex, startIndex + 10);
      setTransactionHistory(prevData => [...prevData, ...newData]);
    };

    fetchData();
  }, [page]);

  // Function to handle reaching the end of the scroll
  const handleEndReached = () => {
    setPage(page + 1);
  };

  // Update the transaction filter logic to include date and station
  const filteredTransactionHistory = transactionHistory.filter(item => {
    const isDateMatched = !searchDate || item.date === searchDate;
    const isStationMatched = !searchStation || item.gare.toLowerCase().includes(searchStation.toLowerCase());
    return isDateMatched && isStationMatched;
  });

  return (
    <View style={styles.global}>
      <StatusBar style='dark' />
      <Navbar1 />
      <Nav />
      <TextInput
        style={styles.searchBar}
        placeholder="Filtrer par date (YYYY-MM-DD)"
        placeholderTextColor="#000"
        value={searchDate}
        onChangeText={text => setSearchDate(text)}
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Filtrer par gare"
        placeholderTextColor="#000"
        value={searchStation}
        onChangeText={text => setSearchStation(text)}
      />
      <ScrollView
        style={styles.scrollView}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
      >
        {filteredTransactionHistory.map(item => (
          <View style={styles.transactionItem} key={item.id}>
            <Text style={styles.text}>Nature: {item.nature}</Text>
            <Text style={styles.text}>Date: {item.date}</Text>
            <Text style={styles.text}>Gare: {item.gare}</Text>
          </View>
        ))}
      </ScrollView>
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
    marginBottom: 10,
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    top: 30,
    marginLeft: 20,
  },
  scrollView: {
    flex: 1,
    marginTop: '15%',
    marginHorizontal: 20,
    width: '90%',
    marginBottom: 100,
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
