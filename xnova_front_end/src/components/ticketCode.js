import React from 'react';
import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function TicketCode() {
  return (
    <View style={styles.container}>
      <QRCode
        value="Your QR Code Data" // Replace with your QR code data
        size={200} // Adjust the size as needed
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
