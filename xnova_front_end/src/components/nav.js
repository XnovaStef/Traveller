import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Avatar, IconButton } from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Nav = () => {
  const navigation = useNavigation();

  const [compagnie, setCompagnie] = useState('');
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('accessToken')
      .then(token => {
        AsyncStorage.getItem('companyId')
          .then(companyId => {
            axios.get(`http://192.168.1.15:3005/api/companies/${companyId}`, {
              headers: { Authorization: `Bearer ${token}` }
            })
              .then(response => {
                console.log(response.data);
                setCompagnie(response.data.compagnie);
              })
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }, []);

 
  
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarContainer}>
      <Avatar image={logo ? { uri: logo } : null} />

        <Text style={styles.userName}>{compagnie}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('ProfilCompany')}>
        <Feather name="menu" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#246EC3',
    height: '12%',
    width: '100%',
    top: '3%',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    top:'3%',
    left:'15%',
    shadowOpacity: 0.8,
    shadowColor:'#000',
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  userName: {
    color: '#fff',
    marginLeft: 10,
    fontWeight:'bold',
    fontSize:25
  },
  settingsButton: {
    marginLeft: '85%',
    top:-25,
    
  },
});

export default Nav;
