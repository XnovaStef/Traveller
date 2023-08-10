import 'react-native-gesture-handler';
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import HelpScreen from '../components/OnbordingScreen';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const logoWidth = windowWidth * 0.6;
const logoHeight = logoWidth * 0.25;
const logoMarginTop = windowHeight * 0.1;
const buttonWidth = windowWidth * 0.75;
const buttonHeight = windowHeight * 0.07;
const buttonMarginTop = windowHeight * 0.05;
const screenHeight = Dimensions.get('window').height;

export default function WelcomeScreen() {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    
const navigation = useNavigation();

    const choix = () => {
        navigation.navigate("Choose");
      }

      const choix1 = () => {
        navigation.navigate("Choose1");
      }

      

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <Image
                source={require('../assets/images/logo.png')}
                style={{ width: logoWidth, height: logoHeight, alignSelf: 'center', marginTop: logoMarginTop }}
            />

            <TouchableOpacity style={styles.help} onPress={openModal}>
                <Text style={styles.buttonText}>Comment ça marche</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="fade" onRequestClose={closeModal} transparent={true}>
                {/* Your content for the pop-up page goes here */}
                <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <HelpScreen />
              <TouchableOpacity style={styles.closeIcon} onPress={closeModal}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
            </Modal>

            <TouchableOpacity style={styles.registerButton} onPress={choix}>
                <Text style={styles.buttonText}>Inscription</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={choix1}>
                <Text style={styles.buttonText}>Connexion</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#246EC3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: windowWidth * 0.05,
        fontWeight: 'bold',
        color: 'white',
        marginTop: buttonHeight * 0.30,
    },
    help: {
        backgroundColor: '#F36210',
        width: buttonWidth * 1.2,
        height: buttonHeight * 1.5, // Make the first button larger
        marginTop: buttonMarginTop * 1.2,
        shadowOpacity: 0.5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    registerButton: {
        backgroundColor: '#F36210',
        width: buttonWidth,
        height: buttonHeight * 1.3,
        borderRadius: 10,
        marginTop: buttonMarginTop * 6,
        shadowOpacity: 0.8,
        shadowColor: '#FFF',
        shadowOffset: { width: 0, height: 2 },
        elevation: 6,
    },
    loginButton: {
        backgroundColor: '#F36210',
        width: buttonWidth,
        height: buttonHeight * 1.3,
        borderRadius: 10,
        marginTop: buttonMarginTop,
        shadowOpacity: 0.8,
        shadowColor: '#FFF',
        shadowOffset: { width: 0, height: 2 },
        elevation: 6,
    },
    modalContainer: {
        flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
    height: screenHeight * 0.8,
    width: '90%',
    borderRadius: 10,
    padding: 20,
    position: 'relative',
      },
      
      closeIcon: {
        position: 'absolute',
    top: 10, // Adjust the top position to your desired distance from the top edge
    right: 10,
      },
});
