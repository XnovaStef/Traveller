import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      height= '100%'
      width= '100%'
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
