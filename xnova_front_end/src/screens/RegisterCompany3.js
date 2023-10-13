import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function RegisterScreenCompany3() {

  const route = useRoute();
  const { compagnie, email, logo, destinationTravel, tarifTravel, gareTravel } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [fieldSets, setFieldSets] = useState([
    { destinationColis: '', tarifColis: '', gareColis: '' },
  ]);

  const addFieldSet = () => {
    setFieldSets([...fieldSets, { destinationColis: '', tarifColis: '', gareColis: '' }]);
  };

  const removeFieldSet = (indexToRemove) => {
    const updatedFieldSets = [...fieldSets];
    updatedFieldSets.splice(indexToRemove, 1);
    setFieldSets(updatedFieldSets);
  };

  const isNextButtonDisabled = (fieldSet) => {
    return (
      fieldSet.destinationColis.trim() === '' ||
      fieldSet.tarifColis.trim() === '' ||
      fieldSet.gareColis.trim() === ''
    );
  };

  const navigation = useNavigation();

  const Company2 = () => {
    navigation.navigate("RegisterCompany2");
  }

  const Company1 = () => {
    navigation.navigate("RegisterCompany");
  }

  const login = () => {
    navigation.navigate("Login");
  }

  const goToRegistre = () => {
    const data = {
      compagnie: compagnie,
      email: email,
      destinationTravel: destinationTravel,
      tarifTravel: tarifTravel,
      gareTravel: gareTravel,
      fieldSets: fieldSets, // Pass the fieldSets array to the data object
      logo: logo
    };
    if (isNextButtonDisabled(fieldSets[0])) {
      return;
    } else {
      axios
      .post('http://192.168.1.15:3005/api/register1', data)
      .then((response) => {
        console.log(data);
        console.log(response.data);
        Alert.alert('Compte créé avec succès !');
        navigation.navigate('LoginUser');
      })
      .catch((error) => {
        console.error('AxiosError:', error);
        // You can also display an error message to the user
        Alert.alert('Une erreur s\'est produite lors de la requête.');
      });
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.Content}>
      <TouchableOpacity onPress={addFieldSet} style={styles.AddButton}>
        <Icon name="plus" size={40} color="#000" />
      </TouchableOpacity>
      <Image style={{ width: 200, height: 40, marginHorizontal: '40%', marginTop: 50 }} source={require('../assets/images/logo.png')} />
      <Text style={styles.Title}>Colis</Text>

      {fieldSets.map((fieldSet, index) => (
        <View key={index}>
          <TextInput
            style={styles.input}
            value={fieldSet.destinationColis}
            onChangeText={(text) => {
              const updatedFieldSets = [...fieldSets];
              updatedFieldSets[index].destinationColis = text;
              setFieldSets(updatedFieldSets);
            }}
            placeholder="Destination"
          />

          <TextInput
            style={styles.input}
            value={fieldSet.tarifColis}
            onChangeText={(text) => {
              const updatedFieldSets = [...fieldSets];
              updatedFieldSets[index].tarifColis = text;
              setFieldSets(updatedFieldSets);
            }}
            placeholder="Tarif"
            keyboardType='decimal-pad'
          />

          <TextInput
            style={styles.input}
            value={fieldSet.gareColis}
            onChangeText={(text) => {
              const updatedFieldSets = [...fieldSets];
              updatedFieldSets[index].gareColis = text;
              setFieldSets(updatedFieldSets);
            }}
            placeholder="Gare"
          />

          <TouchableOpacity onPress={() => removeFieldSet(index)} style={styles.minus}>
            <Icon name="minus" size={40} color="#000" />
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            isNextButtonDisabled(fieldSets[0]) && styles.nextButtonDisabled,
          ]}
          onPress={goToRegistre}
          disabled={isNextButtonDisabled(fieldSets[0])}
        >
          <Text style={styles.nextButtonText}>S'enregistrer</Text>
        </TouchableOpacity>
      </View>

      {/* Loader */}
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#F58909" />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Content: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#246EC3',
  },
  AddButton: {
    position: 'absolute',
    top: 125,
    right: '20%',
    padding: 10,
    borderRadius: 20,
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    elevation: 4,
  },
  Title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 35,
    right: 30,
  },
  input: {
    width: 300,
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    top: 30,
    backgroundColor: '#fff'
  },
  minus: {
    top: 20,
    left: '70%',
  },
  nextButton: {
    backgroundColor: '#F58909',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    right:10
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  nextButtonDisabled: {
    backgroundColor: '#888',
  },
  prevButton:{
    backgroundColor: '#F58909',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  prevButtonText:{
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: 300,
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    top: 30,
    backgroundColor: '#fff'
  },
  inputAndroid: {
    // Adjust Android styles if needed
  },
});
