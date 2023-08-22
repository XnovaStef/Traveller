import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity,ImageBackground, TextInput , ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Nav from '../components/nav';
import Navbar1 from '../components/tab1';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function LogoScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [mdp, setMdp] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access the camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  // Simulating some loading time with useEffect
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
        // Perform some action after loading
        // For example, navigate to the next screen
      }, 2000); // Simulating a 2-second loading time
    }
  }, [loading]);

  const handleVerification = () => {
    // Perform your verification logic here
    setLoading(true);
  };
  return (
   
    <ImageBackground
      source={require('../assets/images/download.jpg')}
      style={styles.global}
    >
        <View style= {styles.global}>
        <Nav/>
        <View style = {styles.cadre}>
        <Text style={styles.text}>Modifier logo </Text>
        <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Icon name="photo" size={60} color="#000" />
          )}
        </TouchableOpacity>
      <TextInput
        style={styles.TextInput}
        underlineColorIos="rgba(0,0,0,0)"
        placeholder="Mot de passe"
        value={mdp}
        onChangeText={setMdp}
        secureTextEntry={false}
        placeholderTextColor="#AAA1A1"
      />
      <TouchableOpacity style={styles.btn} onPress={handleVerification}>
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Modifier</Text>
        )}
      </TouchableOpacity>
        </View>
        </View>
      </ImageBackground>
   
  );
}

styles = StyleSheet.create({
  global:{
    flex:1,
    
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    top: -50,
    color:'#fff'
  },
  cadre:{
    width:'85%',
    height:'65%',
    backgroundColor:'#246EC3',
    marginTop:'20%',
    marginLeft:'7%',
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center'
  },
  TextInput: {
    top: 0,
    left: -5,
    width: 250,
    height: 50,
    borderWidth: 1,
    backgroundColor: '#fff',
    fontSize: 15,
    paddingHorizontal: 20,
    borderColor: '#fff',
    marginTop:10
  },
  btn: {
    backgroundColor: '#F36210',
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    left: '2%',
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    top: '40%',
  },
  photoButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    top:200
  },
})


