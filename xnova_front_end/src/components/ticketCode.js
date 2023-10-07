import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function TicketCode() {
  // Les données de votre ticket
  const ticketData = {
    qrCodeData: 'Your QR Code Data',
    paymentDate: '2023-10-07',
    transaction: 'Paiement',
    numberOfTickets: 2,
    paymentTime: '14:30',
  };

  return (
    <View style={styles.container}>
      <Text style = {styles.contain}>Date de paiement: {ticketData.paymentDate}</Text>
      <Text style = {styles.contain}>transaction: {ticketData.transaction}</Text>
      <Text style = {styles.contain}>Nombre de places: {ticketData.numberOfTickets}</Text>
      <Text style = {styles.contain}>Heure de paiement: {ticketData.paymentTime}</Text>
     <View style ={{top:50}}>
     <QRCode
        value={ticketData.qrCodeData}
        size={120}
      />
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contain:{
    marginTop:20,
    fontWeight:"bold"
  }
});
