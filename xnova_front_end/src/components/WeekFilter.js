import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import axios from 'axios';

export default function WeekFilter() {
  const [progressData, setProgressData] = useState([0, 0, 0]);

  useEffect(() => {
    console.log('Fetching statistics...');
    // Appelle l'API pour récupérer les statistiques en utilisant Axios
    axios.get('http://192.168.8.180:3005/api/statistics')
      .then(response => {
        console.log('API response:', response.data);
        const { travelCount, reservationCount, colisCount } = response.data;
        setProgressData([parseFloat(travelCount), parseFloat(reservationCount), parseFloat(colisCount)]);
      })
      .catch(error => console.error('Error fetching statistics:', error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistiques du jour</Text>
      <ProgressChart
        data={{ data: progressData }}
        width={300}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#1E2923',
          backgroundGradientTo: '#08130D',
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          strokeWidth: 2,
        }}
        style={styles.chart}
      />
      <View style={styles.legendContainer}>
        <View style={[styles.legendItem, { backgroundColor: 'rgba(26, 255, 146, 1)' }]} />
        <Text style={styles.legendText}>Voyages</Text>

        <View style={[styles.legendItem, { backgroundColor: 'rgba(26, 255, 146, 0.7)' }]} />
        <Text style={styles.legendText}>Réservations</Text>

        <View style={[styles.legendItem, { backgroundColor: 'rgba(26, 255, 146, 0.4)' }]} />
        <Text style={styles.legendText}>Colis</Text>
      </View>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 16,
    borderRadius: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  legendItem: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 5,
  },
  legendText: {
    color: '#000', // Change the color as needed
    fontWeight: 'bold',
  },
});
