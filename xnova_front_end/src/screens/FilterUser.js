import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import Navbar from '../components/tab';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import de l'icône


export default function FilterScreen() {
  const [datePay, setDatePay] = useState('');
  const [searchCompany, setSearchCompany] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);
  const [destinationFilter, setDestinationFilter] = useState('');


  const navigation = useNavigation();

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

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://xnova-back-end-dgb2.onrender.com/api/user/getDestinationTravel?page=${page}`
          );
          const newData = response.data;
  
          // Ensure that newData is an array and has the expected structure
          if (Array.isArray(newData)) {
            setTransactionHistory((prevData) => [...prevData, ...newData]);
            setPage(page + 1);
          } else {
            console.error('Invalid data structure:', newData);
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

  const handleItemPress = (item) => {
    const selectedCompany = item.compagnie;
    
    // Filter transactions for the selected company
    const transactionsOfSelectedCompany = transactionHistory
      .filter((transaction) => transaction.compagnie === selectedCompany)
      .map((transaction) => {
        return {
          destinationTravel: transaction.destinationTravel.map((dest) => ({
            destination: dest.destination,
            tarif: dest.Travel,
            tarifColis:dest.Colis,
            gare: dest.gare,
          })),
          depart: transaction.depart,
        };
      });
    
    // Now, transactionsOfSelectedCompany contains an array of transactions for the selected company
    console.log(transactionsOfSelectedCompany);
  
    navigation.navigate("Filter", {
      companyName: selectedCompany,
      companyDestinations: transactionsOfSelectedCompany,
    });
  };
  
  

  const filteredTransactionHistory = transactionHistory.filter((item) => {
    const isDateMatched = !datePay || item.datePay.includes(datePay);
    const isCompanyMatched = !searchCompany || item.compagnie.toLowerCase().includes(searchCompany.toLowerCase());
    
    // Check if any destination in the destinationTravel array matches the destinationFilter
    const isDestinationMatched = !destinationFilter || item.destinationTravel.some(dest => dest.destination.toLowerCase().includes(destinationFilter.toLowerCase()));
  
    return isDateMatched && isCompanyMatched && isDestinationMatched;
  });
  
  
  

  return (
  
    <View style={styles.global}>
      <StatusBar style='dark' />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          top: 10,
          left: 0,
          padding: 10,
        }}
      >
        {/* Utilisation de l'icône de flèche */}
        <Icon name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <TextInput
  style={styles.searchBar}
  placeholder="destination..."
  placeholderTextColor="#000"
  value={destinationFilter}
  onChangeText={(text) => setDestinationFilter(text)}
/>

<FlatList
  ref={flatListRef}
  data={filteredTransactionHistory}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View style={styles.transactionItem}>
        <Text style={styles.text}>{item.compagnie}</Text>
        
        {/* Map over destinationsTravel array and render each item */}
        {item.destinationTravel.map((dest, index) => (
          <View key={index}>
            <Text style={styles.text}>Destination: {dest.destination}</Text>
           
          </View>
        ))}
        
        
      </View>
    </TouchableOpacity>
  )}
/>

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
    marginLeft:40
  },
  transactionItem: {
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 100, // Utilisez un nombre suffisamment élevé pour obtenir une forme circulaire
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    width:180,
    height:170,
    marginLeft:'25%',
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 6 },
    elevation: 4,


  },
  text: {
    color: '#246EC3',
    fontWeight: 'bold',
textAlign:'center',
padding:50,
fontSize:15
  },
});
