import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

export default function RegisterScreenCompany2() {


  const [fieldSets, setFieldSets] = useState([
    { destinationTravel: '', tarifTravel: '', gareTravel: '' },
  ]);

  const addFieldSet = () => {
    setFieldSets([...fieldSets, { destinationTravel: '', tarifTravel: '', gareTravel: '' }]);
  };

  const removeFieldSet = (indexToRemove) => {
    const updatedFieldSets = [...fieldSets];
    updatedFieldSets.splice(indexToRemove, 1);
    setFieldSets(updatedFieldSets);
  };

  const isNextButtonDisabled = (fieldSet) => {
    return (
      fieldSet.destinationTravel.trim() === '' ||
      fieldSet.tarifTravel.trim() === '' ||
      fieldSet.gareTravel.trim() === ''
    );
  };

  const navigation = useNavigation();

  const Company2 = () => {
    navigation.navigate("RegisterCompany2");
  }

  const Company1 = () => {
    navigation.navigate("RegisterCompany");
  }

  const goToRegistre = () => {
    if (isNextButtonDisabled(fieldSets[0])) {
      return;
    } else {
      navigation.navigate("RegisterCompany2", {
        destinationTravel: fieldSets[0].destinationTravel,
        tarifTravel: fieldSets[0].tarifTravel,
        gareTravel: fieldSets[0].gareTravel,
      });
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.Content}>
      <TouchableOpacity onPress={addFieldSet} style={styles.AddButton}>
        <Icon name="plus" size={40} color="#000" />
      </TouchableOpacity>
      <Image style={{ width: 200, height: 40, marginHorizontal: '40%', marginTop: 50 }} source={require('../assets/images/logo.png')} />
      <Text style={styles.Title}>Voyages</Text>

      {fieldSets.map((fieldSet, index) => (
        <View key={index}>
          <TextInput
            style={styles.input}
            value={fieldSet.destinationTravel}
            onChangeText={(text) => {
              const updatedFieldSets = [...fieldSets];
              updatedFieldSets[index].destinationTravel = text;
              setFieldSets(updatedFieldSets);
            }}
            placeholder="Destination"
          />

          <TextInput
            style={styles.input}
            value={fieldSet.tarifTravel}
            onChangeText={(text) => {
              const updatedFieldSets = [...fieldSets];
              updatedFieldSets[index].tarifTravel = text;
              setFieldSets(updatedFieldSets);
            }}
            placeholder="Tarif"
            keyboardType='decimal-pad'
          />

          <TextInput
            style={styles.input}
            value={fieldSet.gareTravel}
            onChangeText={(text) => {
              const updatedFieldSets = [...fieldSets];
              updatedFieldSets[index].gareTravel = text;
              setFieldSets(updatedFieldSets);
            }}
            placeholder="Gare"
          />

          <TouchableOpacity onPress={() => removeFieldSet(index)} style={styles.minus}>
            <Icon name="minus" size={40} color="#000" />
          </TouchableOpacity>
        </View>
      ))}

      {/* Button container for "Suivant" and "Précedent" buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            isNextButtonDisabled(fieldSets[0]) && styles.nextButtonDisabled,
          ]}
          onPress={goToRegistre} // Replace with your desired action or navigation
          disabled={isNextButtonDisabled(fieldSets[0])}
        >
          <Text style={styles.nextButtonText}>SUIVANT</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.prevButton,
          ]}
          onPress={Company1} // Replace with your desired action or navigation
        >
          <Text style={styles.prevButtonText}>Précedent</Text>
        </TouchableOpacity>
      </View>
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
});
