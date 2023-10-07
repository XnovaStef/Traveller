import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Avatar, IconButton } from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const NavUser = () => {
  const navigation = useNavigation();

  const [pseudo, setPseudo] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('accessToken')
      .then(token => {
        AsyncStorage.getItem('userId')
          .then(userId => {
            axios.get(`http://192.168.1.12:3005/api/users/${userId}`, {
              headers: { Authorization: `Bearer ${token}` }
            })
              .then(response => {
                console.log(response.data);
                setPseudo(response.data.pseudo);
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
        <Avatar image={{ uri: "https://mui.com/static/images/avatar/2.jpg" }} />
        <Text style={styles.userName}>{pseudo}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Profil')}>
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

export default NavUser;
