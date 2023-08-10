import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreenCompany1() {

  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const Company1 = () => {
    navigation.navigate("RegisterCompany1");
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

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

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const isNextButtonDisabled = () => {
    return companyName.trim() === '' || companyEmail.trim() === '' || (image && image.trim() === '');
  };
  

  const handleNext = () => {
    if (isNextButtonDisabled()) {
      return;
    }
    setLoading(true);

    // Simulate an asynchronous action (e.g., saving to a database)
    setTimeout(() => {
      // Perform any actions you want when the "Next" button is pressed
      // For example, you can navigate to the next screen or perform validation
      console.log('Company Name:', companyName);
      console.log('Company Email:', companyEmail);
      console.log('Image:', image);

      setLoading(false);
    }, 2000);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
      <Image style={{ width: 200, height: 40, marginHorizontal: '40%', marginTop: 50 }} source={require('../assets/images/logo.png')} />
        <TextInput
          style={styles.input}
          value={companyName}
          placeholder="Nom compagnie"
          onChangeText={(text) => setCompanyName(text)}
        />

        <TextInput
          style={styles.input}
          value={companyEmail}
          onChangeText={(text) => setCompanyEmail(text)}
          placeholder="E-mail compagnie"
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Icon name="photo" size={60} color="#000" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.nextButton, isNextButtonDisabled() && styles.nextButtonDisabled]}
          onPress={Company1}
          disabled={isNextButtonDisabled()}
        >
          <Text style={styles.nextButtonText}>SUIVANT</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#246EC3'
  },

  input: {
    width: '80%',
    height: 60,
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    top:180,
    backgroundColor:'#fff'
  },
  photoButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    top:200
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  nextButton: {
    backgroundColor: '#F58909',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    shadowOpacity: 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    elevation: 20,
    top:250,
    left:80
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
