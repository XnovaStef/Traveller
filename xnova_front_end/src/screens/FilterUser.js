import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, ScrollView,Alert } from 'react-native';
import 'react-native-gesture-handler';
import Navbar from '../components/tab';
import CountryPicker from 'react-native-country-picker-modal';
import ServiceBox1 from '../components/CompagnieBox';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState, useEffect } from 'react';
import {  useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';



export default function FilterScreen() {

const [searchQuery, setSearchQuery] = useState('');



const services = [
    { label: "Bonoua", action: () => navigation.navigate("Filter") },
    { label: "Bouaké", action: () => navigation.navigate("Filter")  },
    { label: "Bondoukou", action: () =>Alert.alert('Filter')  },
    { label: "Bouna", action: () => navigation.navigate("Filter")  },
    { label: "Man", action: () =>Alert.alert('Filter')  },
    { label: "Abidjan", action: () => navigation.navigate("Filter")  },
   

    
  ];

  const navigation = useNavigation();


  

  const filteredServices = services.filter(service =>
    service.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    
    
    <View>
    <StatusBar style='dark' />

   
    <TextInput
            style={styles.searchBar}
            placeholder="Destination..."
            placeholderTextColor="#000"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

        <ScrollView style={styles.scrollView}>

          <View style={styles.serviceRow}>
            {filteredServices.map(service => (
              <ServiceBox1
              
                key={service.label}
                serviceLabel={service.label}
                serviceImage={service.image}
                onPress={service.action}
                
                
              />
            ))}
          </View>
        </ScrollView>
    </View>
    
    
  );
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,

    },
    search : {
      height: '20%',
      width: '100%',
      display: "flex",
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#246EC3'
    },
    scrollView: {
        marginTop: '15%',
        marginHorizontal: 20,
        width: '90%',
        height:'80%'
      
    },
    serviceRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '100%',
        color: 'black',
        
        
      },

    searchBar: {
        height: 40,
        width: '90%',
        borderRadius: 15,
        backgroundColor: '#fff',
        color: '#000',
        paddingHorizontal: 10,
        shadowOpacity: 0.5,
        top:30,
    shadowColor:'#000',
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    alignSelf:'center'
      },
   
     
  });




