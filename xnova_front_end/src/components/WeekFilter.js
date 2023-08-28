import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BarChart } from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function WeekFilter() {
  const [showPaymentDatePicker, setShowPaymentDatePicker] = useState(false);
  const [showBookingDatePicker, setShowBookingDatePicker] = useState(false);
  const [selectedPaymentDate, setSelectedPaymentDate] = useState(new Date());
  const [selectedBookingDate, setSelectedBookingDate] = useState(new Date());
  const [paymentData, setPaymentData] = useState(Array.from({ length: 24 }, () => 0)); // Default payment data
  const [reservationData, setReservationData] = useState(Array.from({ length: 24 }, () => 0)); // Default reservation data

  const message = () => {
    Alert.alert('Veuillez contacter la direction pour plus de détail');
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const simulateData = (count) => {
    return Array.from({ length: 24 }, () => Math.floor(Math.random() * count));
  };

  const fetchPaymentData = (date) => {
    // Simulate fetching payment data based on the selected date
    return simulateData(500);
  };

  const fetchReservationData = (date) => {
    // Simulate fetching reservation data based on the selected date
    return simulateData(300);
  };

  const handlePaymentDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setSelectedPaymentDate(selectedDate);
      const newPaymentData = fetchPaymentData(selectedDate);
      setPaymentData(newPaymentData);
    }
    setShowPaymentDatePicker(false);
  };

  const handleBookingDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setSelectedBookingDate(selectedDate);
      const newReservationData = fetchReservationData(selectedDate);
      setReservationData(newReservationData);
    }
    setShowBookingDatePicker(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowPaymentDatePicker(true)}>
          <Icon name="calendar" size={30} color="#246EC3" style={styles.calendarIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={message}>
          <Icon name="plus" size={30} color="#246EC3" style={styles.plusIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Statistiques paiements</Text>
      </View>
      <ScrollView horizontal>
        <BarChart
          data={{
            labels: hours.map(hour => hour.toString()),
            datasets: [
              {
                data: paymentData,
              },
            ],
          }}
          width={hours.length * 50}
          height={200}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#000',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(38, 110, 195, ${opacity})`,
          }}
          style={styles.chart}
        />
      </ScrollView>
      {showPaymentDatePicker && (
        <DateTimePicker
          value={selectedPaymentDate}
          mode="date"
          display="default"
          onChange={handlePaymentDateChange}
        />
      )}

      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowBookingDatePicker(true)}>
          <Icon name="calendar" size={30} color="#246EC3" style={styles.calendarIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={message}>
          <Icon name="plus" size={30} color="#246EC3" style={styles.plusIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Statistiques réservations</Text>
      </View>
      <ScrollView horizontal>
        <BarChart
          data={{
            labels: hours.map(hour => hour.toString()),
            datasets: [
              {
                data: reservationData,
              },
            ],
          }}
          width={hours.length * 50}
          height={200}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#000',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(38, 110, 195, ${opacity})`,
          }}
          style={styles.chart}
        />
      </ScrollView>
      {showBookingDatePicker && (
        <DateTimePicker
          value={selectedBookingDate}
          mode="date"
          display="default"
          onChange={handleBookingDateChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  chart: {
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    marginRight: 10,
    top: 10,
  },
  title: {
    color: '#246EC3',
    fontSize: 15,
    fontWeight: 'bold',
    top: 10,
  },
  plusIcon: {
    marginRight: 10,
    top: 10,
  },
});
