import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, View, TouchableOpacity, Image, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { ListItem } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable'; // Import Animatable

export default function ProfilScreen() {
  const navigation = useNavigation();

  const Delete = () => {
    navigation.navigate("Delete");
  }
  const Email = () => {
    navigation.navigate("Email");
  }

  const Name = () => {
    navigation.navigate("Name");
  }

  const Password = () => {
    navigation.navigate("Password");
  }

  const Reservation = () => {
    navigation.navigate("Reservation");
  }

  return (
    <ImageBackground
      source={require('../assets/images/download.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.Global}>
        <StatusBar style="dark" />
        <View style={styles.Profil}>
          <Text style={{ color: '#fff', fontSize: 30, fontWeight: 'bold' }}>Profil</Text>
          <View style={{
            width: '80%',
            marginBottom: 20,
            marginTop: 20,
            shadowOpacity: 0.7,
            shadowColor: '#000',
            shadowOffset: { width: 2, height: 2 },
            elevation: 4,
          }}>
            <Animatable.View animation="lightSpeedIn" duration={1000}>
              <ListItem
                title="Nom"
                leading={<Icon name="face-man-profile" size={24} />}
                trailing={props => <Icon name="chevron-right" {...props} />}
                onPress={Name}
                style={{ backgroundColor: '#2C333A', color: 'white' }}
              />
            </Animatable.View>
            <Animatable.View animation="lightSpeedIn" duration={1500}>
              <ListItem
                title="Mot de passe"
                leading={<Icon name="account" size={24} />}
                trailing={props => <Icon name="chevron-right" {...props} />}
                onPress={Password}
              />
            </Animatable.View>
            <Animatable.View animation="lightSpeedIn" duration={1500}>
              <ListItem
                title="Déconnexion"
                leading={<Icon name="power" size={24} />}
                trailing={props => <Icon name="chevron-right" {...props} />}
                onPress={ ()=> navigation.navigate('welcome')}
              />
            </Animatable.View>
           
            <TouchableOpacity style={styles.Button} onPress={Reservation}>
              <Animatable.View animation="lightSpeedIn" duration={2500}>
                <Text style={{ fontWeight: 'bold', alignSelf: 'center', textAlign: 'center', padding: 6 }}>Retour</Text>
              </Animatable.View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  Global: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  Profil: {
    backgroundColor: '#246EC3',
    top: '10%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '70%',
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  Button: {
    marginTop: 70,
    marginLeft: 85,
    backgroundColor: '#fff',
    width: 90,
    height: 35,
  },
});
