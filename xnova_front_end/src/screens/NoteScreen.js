import React from 'react'
import { StatusBar } from 'expo-status-bar';
import Lottie from 'lottie-react-native';
import {Text, View} from 'react-native';


export default function NoteScreen() {
    return (
        <View style={{flex: 1, display: 'flex', alignItems:'center', justifyContent: 'center'}}>
          <StatusBar style='dark'/>
          <View style={{display: 'flex', alignItems:'center', justifyContent: 'center', width:300, height:300}}>
          <Lottie source={require('../assets/images/unvailable.json')} autoPlay loop />
          </View>
          <Text>Service bientôt disponible</Text>
        </View>  )
}
