import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Title, Subheading } from 'react-native-paper';
import Svg, { Circle } from 'react-native-svg';

export default function App() {
  return (
    <View style={styles.container}>
      <Title style={styles.header}>Insights</Title>
      <View style={styles.temperatureContainer}>
        <Text style={styles.temperature}>33°C</Text>
        <Subheading style={styles.label}>Temperature</Subheading>
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.dataRow}>
          <Svg height="20" width="20" style={styles.icon}>
            <Circle cx="10" cy="10" r="8" fill="#4cd964" />
          </Svg>
          <Text style={styles.dataText}>Current temp C</Text>
          <Text style={styles.dataValue}>33°C</Text>
        </View>
        <View style={styles.dataRow}>
          <Svg height="20" width="20" style={styles.icon}>
            <Circle cx="10" cy="10" r="8" fill="#4cd964" />
          </Svg>
          <Text style={styles.dataText}>Current temp F</Text>
          <Text style={styles.dataValue}>91°F</Text>
        </View>
        <View style={styles.dataRow}>
          <Svg height="20" width="20" style={styles.icon}>
            <Circle cx="10" cy="10" r="8" fill="#4cd964" />
          </Svg>
          <Text style={styles.dataText}>Humidity</Text>
          <Text style={styles.dataValue}>61%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  temperatureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 10,
  },
  dataContainer: {
    width: '80%',
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  dataText: {
    flex: 1,
    fontSize: 16,
  },
  dataValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});