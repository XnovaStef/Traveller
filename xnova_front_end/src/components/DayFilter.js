import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the FontAwesome icon
import { BarChart } from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DayFilter() {
  const [showDatePicker, setShowDatePicker] = useState(false); // Moved useState inside the component

  const paymentData = [
    100, 200, 150, 300, 250, 180, 280, 220, 350, 120,
    180, 260, 170, 220, 300, 240, 190, 280, 220, 150,
    210, 270, 320, 180
  ];

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const data = {
    labels: hours.map(hour => hour.toString()),
    datasets: [
      {
        data: paymentData,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Icon name="calendar" size={30} color="#246EC3" style={styles.calendarIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Statistiques paiements</Text>
      </View>
      <ScrollView horizontal>
        <BarChart
          data={data}
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

      <View style={styles.header}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Icon name="calendar" size={30} color="#246EC3" style={styles.calendarIcon} />
        </TouchableOpacity>
        <Text style={styles.title1}>Statistiques réservations</Text>
      </View>
      <ScrollView horizontal>
        <BarChart
          data={data}
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
      {showDatePicker && (
        <DateTimePicker
          value={new Date()} // Initial value for the picker
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              // Handle selected date here
            }
            setShowDatePicker(false);
          }}
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
    top:10
  },
  title: {
    color: '#246EC3',
    fontSize: 15,
    fontWeight: 'bold',
    top:10
  },
  title1: {
    color: '#246EC3',
    fontSize: 15,
    fontWeight: 'bold',
    top:10
  },
});
