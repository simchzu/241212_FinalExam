import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function MoodDetails() {
  const moodData = [50, 72, 80, 65, 77, 85, 90]; // 일별 감정 변화 데이터
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Weekly Mood Analysis</Text>
      <Text style={styles.subtitle}>Here's how your mood has been this week:</Text>

      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: moodData,
                strokeWidth: 3,
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(72, 123, 247, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#4D96FF',
            },
          }}
          bezier
          style={{ borderRadius: 10 }}
        />
      </View>

      <View style={styles.statContainer}>
        <Text style={styles.statTitle}>Mood Summary</Text>
        <Text style={styles.statText}>• Most Positive Day: Saturday</Text>
        <Text style={styles.statText}>• Most Challenging Day: Monday</Text>
        <Text style={styles.statText}>• Average Mood: 74%</Text>
      </View>

      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Get Mood Improvement Tips</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 20 },
  chartContainer: { marginBottom: 30, backgroundColor: '#fff', borderRadius: 10, padding: 15, elevation: 3 },
  statContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
  },
  statTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  statText: { fontSize: 14, color: '#777', marginBottom: 5 },
  actionButton: {
    backgroundColor: '#4D96FF',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  actionButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
});
