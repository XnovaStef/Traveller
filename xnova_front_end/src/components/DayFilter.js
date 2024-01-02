import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import axios from 'axios';

export default function StatsDashboard() {
  const [dayStats, setDayStats] = useState([0, 0, 0]);
  const [weekStats, setWeekStats] = useState([0, 0, 0]);
  const [monthStats, setMonthStats] = useState([0, 0, 0]);
  const [yearStats, setYearStats] = useState([0, 0, 0]);

  useEffect(() => {
    fetchStats('getStats');
  }, []);

  const fetchStats = async (endpoint) => {
    try {
      const apiUrl = 'https://xnova-back-end.onrender.com/api/user/';
      const response = await axios.get(apiUrl + endpoint);
      const stats = response.data;

      setDayStats(Object.values(stats.today));
      setWeekStats(Object.values(stats.thisWeek));
      setMonthStats(Object.values(stats.thisMonth));
      setYearStats(Object.values(stats.thisYear));
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const renderProgressChart = (data, title, legend) => {
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.title}>{title}</Text>
        <ProgressChart
          data={{ data }}
          width={300}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // Orange
            strokeWidth: 2,
          }}
          style={styles.chart}
        />
        <View style={styles.legendContainer}>
          {legend.map((item, index) => (
            <View key={index} style={styles.legendItemContainer}>
              <View style={[styles.legendItem, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {renderProgressChart(
          dayStats,
          'Statistiques du jour',
          [
            { label: 'Voyages', color: 'rgba(255, 165, 0, 1)' }, // Orange
            { label: 'Réservations', color: 'rgba(0, 128, 255, 1)' }, // Bleue
            { label: 'Colis', color: 'rgba(50, 205, 50, 1)' }, // Verte
          ]
        )}
        {renderProgressChart(
          weekStats,
          'Statistiques de la semaine',
          [
            { label: 'Voyages', color: 'rgba(255, 165, 0, 1)' },
            { label: 'Réservations', color: 'rgba(0, 128, 255, 1)' },
            { label: 'Colis', color: 'rgba(50, 205, 50, 1)' },
          ]
        )}
        {renderProgressChart(
          monthStats,
          'Statistiques du mois',
          [
            { label: 'Voyages', color: 'rgba(255, 165, 0, 1)' },
            { label: 'Réservations', color: 'rgba(0, 128, 255, 1)' },
            { label: 'Colis', color: 'rgba(50, 205, 50, 1)' },
          ]
        )}
        {renderProgressChart(
          yearStats,
          'Statistiques de l\'année',
          [
            { label: 'Voyages', color: 'rgba(255, 165, 0, 1)' },
            { label: 'Réservations', color: 'rgba(0, 128, 255, 1)' },
            { label: 'Colis', color: 'rgba(50, 205, 50, 1)' },
          ]
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  chartContainer: {
    marginBottom: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  legendItem: {
    width: 10,
    height: 10,
    marginRight: 5,
    borderRadius: 5,
  },
  legendText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
