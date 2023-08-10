import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import Navbar1 from '../components/tab1';
import { StatusBar } from 'expo-status-bar';
import Nav from '../components/nav';

export default function HomeCompanyScreen() {

  const [searchQuery, setSearchQuery] = useState('');


 // const filteredServices = services.filter(service =>
   // service.label.toLowerCase().includes(searchQuery.toLowerCase())
 // );


  

  return (
    <View style = {styles.global}>
      <StatusBar style='dark' />
      <Navbar1/>
      <Nav/>
      <TextInput
            style={styles.searchBar}
            placeholder="Recherche..."
            placeholderTextColor="#000"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
    </View>
  );
}

const styles = StyleSheet.create({
 global:{
  flex:1,
  
 },
 searchBar: {
  height: 30,
  width: '80%',
  borderRadius: 15,
  backgroundColor: '#fff',
  color: '#ffffff',
  paddingHorizontal: 10,
  marginBottom: -70,
  shadowOpacity: 0.5,
shadowColor:'#000',
shadowOffset: { width: 0, height: 3 },
elevation: 4,
top:10,
marginLeft:35
},
});
