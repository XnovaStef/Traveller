import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Avatar, IconButton } from '@react-native-material/core';

const Nav = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarContainer}>
        <Avatar image={{ uri: "https://mui.com/static/images/avatar/2.jpg" }} />
        <Text style={styles.userName}>SBTA</Text>
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
