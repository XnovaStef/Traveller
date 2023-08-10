import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

export default function RegisterScreenCompany3() {
  const [fieldSets, setFieldSets] = useState([
    { destination: '', Tarif: '', gare: '' },
  ]);
  const [isLoading, setIsLoading] = useState(false); // New state for loader

  const addFieldSet = () => {
    setFieldSets([...fieldSets, { destination: '', Tarif: '', gare: '' }]);
  };

  const removeFieldSet = (indexToRemove) => {
    const updatedFieldSets = [...fieldSets];
    updatedFieldSets.splice(indexToRemove, 1);
    setFieldSets(updatedFieldSets);
  };

  const destinationOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    // Add more options as needed
  ];

  const isNextButtonDisabled = (fieldSet) => {
    return fieldSet.destination.trim() === '' || fieldSet.Tarif.trim() === '' || fieldSet.gare.trim() === '';
  };

  const navigation = useNavigation();

  const Company2 = async () => {
    setIsLoading(true); // Show loader before navigation

    // Simulate some async action (like API call) using a delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsLoading(false); // Hide loader after action is completed

    navigation.navigate("LoginCompany");
    Alert.alert("Vous recevrez un code qui sera votre mot de passe")
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
          <RNPickerSelect
            placeholder={{ label: 'Select a destination...', value: null }}
            items={destinationOptions}
            onValueChange={(value) => {
              const updatedFieldSets = [...fieldSets];
              updatedFieldSets[index].destination = value;
              setFieldSets(updatedFieldSets);
            }}
            value={fieldSet.destination}
            style={pickerSelectStyles}
          />

          <TextInput
            style={styles.input}
            value={fieldSet.Tarif}
            onChangeText={(text) => {
              const updatedFieldSets = [...fieldSets];
              updatedFieldSets[index].Tarif = text;
              setFieldSets(updatedFieldSets);
            }}
            placeholder="Tarif"
            keyboardType='decimal-pad'
          />

          <TextInput
            style={styles.input}
            value={fieldSet.gare}
            onChangeText={(text) => {
              const updatedFieldSets = [...fieldSets];
              updatedFieldSets[index].gare = text;
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
          onPress={Company2}
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
    backgroundColor: '#888', // or any other color you want for disabled state
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
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
