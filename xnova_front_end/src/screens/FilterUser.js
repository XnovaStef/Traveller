import React, { useState } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CompagnieBox from '../components/CompagnieBox';
import Navbar from '../components/tab';
import { StatusBar } from 'expo-status-bar';

export default function FilterScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = useNavigation(); // Using useNavigation directly in the component function

  const compagnies = [
    { label: "UTB", image: require('../assets/images/pay.jpg'), action: () => navigation.navigate("HomeUser") },
    { label: "UTRACO", image: require('../assets/images/pay.jpg'), action: () => navigation.navigate("Location")  },
    { label: "STB", image: require('../assets/images/pay.jpg'), action: () => Alert.alert('Service non disponible')  },
    { label: "CTE", image: require('../assets/images/pay.jpg'), action: () => navigation.navigate("Cocar")  },
    { label: "TTE", image: require('../assets/images/pay.jpg'), action: () => navigation.navigate("Cocar")  },
    { label: "CTT", image: require('../assets/images/pay.jpg'), action: () => navigation.navigate("Cocar")  },
    { label: "Yango", image: require('../assets/images/pay.jpg'), action: () => navigation.navigate("Cocar")  },
    { label: "HEETCH", image: require('../assets/images/pay.jpg'), action: () => navigation.navigate("Cocar")  },
    { label: "Uber", image: require('../assets/images/pay.jpg'), action: () => navigation.navigate("Cocar")  },
    { label: "Massa", image: require('../assets/images/pay.jpg'), action: () => navigation.navigate("Cocar")  },
  ];

  const filteredCompagnies = compagnies.filter(compagnie =>
    compagnie.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <View style={styles.global}>
        <StatusBar style='dark' />
        
        <TextInput
          style={styles.searchBar}
          placeholder="Destination..."
          placeholderTextColor="#000"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.serviceRow}>
          {filteredCompagnies.map(compagnie => (
            <CompagnieBox
            key={compagnie.label}
            serviceLabel={compagnie.label}
            serviceImage={compagnie.image}
            onPress={compagnie.action}
          />
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
 global:{
  flex:1,
  
 },
 searchBar: {
  height: 40,
  width: '90%',
  borderRadius: 15,
  backgroundColor: '#fff',
  color: '#000',
  paddingHorizontal: 10,
  marginBottom: -70,
  shadowOpacity: 0.5,
shadowColor:'#000',
shadowOffset: { width: 0, height: 3 },
elevation: 4,
top:30,
marginLeft:20
},

scrollView: {
  marginTop: '15%',
  marginHorizontal: 20,
  width: '90%',
  flexGrow:1,

},
serviceRow: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  width: '100%',
  color: 'black',
  
  
},
});
