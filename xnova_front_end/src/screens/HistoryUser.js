import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, SafeAreaView , TouchableOpacity} from 'react-native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import Navbar from '../components/tab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons'; // Import de l'icône


export default function HistoryScreen() {
  const [datePay, setDatePay] = useState('');
  const [searchCompany, setSearchCompany] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false); 
  const [selectedDate, setSelectedDate] = useState(new Date());
  const flatListRef = useRef(null);

  const navigation = useNavigation();

  const Home = () =>{
    navigation.navigate("Reservation")
  }

  const route = useRoute();
  const { tel} = route.params; // Récupération du tel de l'utilisateur




  console.log(tel)


  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const [travelInfo, colisInfo, reservationInfo] = await Promise.all([
            axios.get(`https://xnova-back-end.onrender.com/api/user/everyTravelInfoTel/${tel}?page=${page}`),
            axios.get(`https://xnova-back-end.onrender.com/api/user/everyColisInfoTel/${tel}?page=${page}`),
            axios.get(`https://xnova-back-end.onrender.com/api/user/everyReservationInfoTel/${tel}?page=${page}`)
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
  }, [page, tel]);
  

  /*const handleEndReached = () => {
    if (!isLoading) {
      flatListRef.current.scrollToEnd({ animated: true });
      setPage(page + 1);
    }
  };*/
/*
  useEffect(() => {
    AsyncStorage.getItem('accessToken')
      .then(token => {
        AsyncStorage.getItem('userId')
          .then(userId => {
            axios.get(`https://xnova-back-end.onrender.com/api/user/users/${userId}`, {
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
  }, []);*/



  

  const filteredTransactionHistory = transactionHistory.filter((item) => {
    const isDateMatched = !datePay || item.datePay.includes(datePay);
    const isCompanyMatched =
      !searchCompany || item.compagnie.toLowerCase().includes(searchCompany.toLowerCase());
    return isDateMatched && isCompanyMatched;
  });

  const sortedTransactionHistory = [...filteredTransactionHistory].sort((a, b) => {
    const dateA = new Date(a.datePay).getTime();
    const dateB = new Date(b.datePay).getTime();
    return dateB - dateA; // Sort in descending order (most recent first)
  });

  const handleDateChange = (event, selected) => {
    const currentDate = selected || datePay;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
    setDatePay(currentDate.toISOString().split('T')[0]);
  };

  return (

    <View style={styles.global}>
      <StatusBar style='dark' />
      <TouchableOpacity
        onPress={Home}
        style={{
          position: 'absolute',
          top: 45,
          left: 20,
          padding: 10,
        }}
      >
        {/* Utilisation de l'icône de flèche */}
        <Icon name="home" size={30} color="#246EC3" />
      </TouchableOpacity>
      <TextInput
        style={styles.searchBar1}
        placeholder="Filtrer par date (YYYY-MM-DD)"
        placeholderTextColor="#000"
        value={datePay}
        onChangeText={(text) => setDatePay(text)}
      />
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        {/* Utilisation d'une icône de calendrier */}
        <FontAwesome name="calendar" size={24} color="#246EC3" style={styles.calendarIcon} />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          display="calendar"
          onChange={handleDateChange}
        />
      )}
      <TextInput
        style={styles.searchBar}
        placeholder="Filtrer par compagnie"
        placeholderTextColor="#000"
        value={searchCompany}
        onChangeText={(text) => setSearchCompany(text)} />
      <FlatList
        ref={flatListRef}
        data={sortedTransactionHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.text}>Nature: {item.nature}</Text>
            <Text style={styles.text}>
              Date de Paiement: {item.datePay ? new Date(item.datePay).toLocaleDateString('fr-FR') : 'N/A'}
            </Text>
            <Text style={styles.text}>Gare: {item.gare}</Text>
            <Text style={styles.text}>Compagnie: {item.compagnie}</Text>
            <Text style={styles.text}>Montant: {item.montant}</Text>
            <Text style={styles.text}>Code: {item.code}</Text>
            <Text style={styles.text}>Nombre de place: {item.nombre_place}</Text>
          </View>
        )} />

    </View>
  );
}

const styles = StyleSheet.create({
  global: {
    flex: 1,
  },
  searchBar: {
    height: 40,
    width: '60%',
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
    marginLeft: '20%',
  },
  searchBar1: {
    height: 40,
    width: '60%',
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
    marginLeft: '20%',
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
  calendarIcon: {
    marginTop: -17,
left: '85%',
  },
});
