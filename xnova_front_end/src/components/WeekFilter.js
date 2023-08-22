import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native'; // Import ScrollView
import { BarChart } from 'react-native-chart-kit';

export default function WeekFilter() {
  // Example data for the last 24 hours
  const paymentData = [
    100, 200, 150, 300, 250, 180, 280, 220, 350, 120,
    180, 260, 170, 220, 300, 240, 190, 280, 220, 150,
    210, 270, 320, 180
  ];

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const data = {
    labels: hours.map(hour => hour.toString()), // Convert hours to strings
    datasets: [
      {
        data: paymentData,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistiques paiements</Text>
      <ScrollView horizontal> 
        <BarChart
          data={data}
          width={hours.length * 50} // Adjust the width based on the number of hours
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

      <Text style={styles.title1}>Statistiques réservations</Text>
      <ScrollView horizontal> 
        <BarChart
          data={data}
          width={hours.length * 50} // Adjust the width based on the number of hours
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
  title: {
    color: '#246EC3',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    top:20,
    right:25
  },
  title1: {
    color: '#246EC3',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 0,
    top:10,
    right:25
  },
});
