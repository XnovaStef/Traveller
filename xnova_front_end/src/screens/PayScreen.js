import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native'; // Import the necessary navigation hook

export default function PayScreen() {
  const navigation = useNavigation(); // Initialize the navigation object

  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);

  const toggleCheckbox1 = () => {
    setCheckbox1(!checkbox1);
    if (checkbox2) {
      setCheckbox2(false);
    }
  };

  const toggleCheckbox2 = () => {
    setCheckbox2(!checkbox2);
    if (checkbox1) {
      setCheckbox1(false);
    }
  };

  const onNextButtonPress = () => {
    if (checkbox1) {
      navigation.navigate('Voyages'); // Navigate to the Voyages screen
    } else if (checkbox2) {
      navigation.navigate('Colis'); // Navigate to the Colis screen
    }
  };

  return (
    <View style={styles.global}>
      <StatusBar style='dark' />
      <View style={styles.header}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 30 }}>Paiement</Text>
      </View>
      <View style={styles.check}>
        <View style={styles.checkboxesContainer}>
          <TouchableOpacity
            style={[styles.checkbox, checkbox1 && styles.checkedCheckbox]}
            onPress={toggleCheckbox1}
          >
            <Icon name={checkbox1 ? 'check-square-o' : 'square-o'} size={39} />
            <Text style={{ fontWeight: 'bold', fontSize: 20, left: 20 }}>Voyages</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkbox, checkbox2 && styles.checkedCheckbox]}
            onPress={toggleCheckbox2}
          >
            <Icon name={checkbox2 ? 'check-square-o' : 'square-o'} size={39} />
            <Text style={{ fontWeight: 'bold', fontSize: 20, left: 20 }}>Colis</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.next} onPress={onNextButtonPress}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  global: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: '13%',
    backgroundColor: '#F36210',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxesContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 60,
    marginBottom:20
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom:50
  },
  checkedCheckbox: {
    color: 'green',
  },
  check: {
    justifyContent: 'center',
  },
  next: {
    width: 100,
    height: 40,
    backgroundColor: '#F36210',
    top: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
