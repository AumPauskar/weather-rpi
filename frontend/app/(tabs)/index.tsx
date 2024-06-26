import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Title, Subheading } from 'react-native-paper';
import Svg, { Circle } from 'react-native-svg';

export default function App() {
  const [data, setData] = useState({
    temperature_c: '--',
    temperature_f: '--',
    humidity: '--',
  });

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.29.87:5000/readings');
      const result = await response.json();
      // Check if the result does not contain an error key
      if (!result.error) {
        setData({
          temperature_c: result.temperature_c,
          temperature_f: result.temperature_f,
          humidity: result.humidity,
        });
        console.log('Data fetched:', result);
      } else {
        // Log the error but do not update the state
        console.log('Error in fetched data:', result.error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <View style={styles.container}>
      <Title style={styles.header}>Insights</Title>
      <View style={styles.temperatureContainer}>
        <Text style={styles.temperature}>{data.temperature_c}°C</Text>
        <Subheading style={styles.label}>Temperature</Subheading>
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.dataRow}>
          <Svg height="20" width="20" style={styles.icon}>
            <Circle cx="10" cy="10" r="8" fill="#4cd964" />
          </Svg>
          <Text style={styles.dataText}>Current temp C</Text>
          <Text style={styles.dataValue}>{data.temperature_c}°C</Text>
        </View>
        <View style={styles.dataRow}>
          <Svg height="20" width="20" style={styles.icon}>
            <Circle cx="10" cy="10" r="8" fill="#4cd964" />
          </Svg>
          <Text style={styles.dataText}>Current temp F</Text>
          <Text style={styles.dataValue}>{data.temperature_f}°F</Text>
        </View>
        <View style={styles.dataRow}>
          <Svg height="20" width="20" style={styles.icon}>
            <Circle cx="10" cy="10" r="8" fill="#4cd964" />
          </Svg>
          <Text style={styles.dataText}>Humidity</Text>
          <Text style={styles.dataValue}>{data.humidity}%</Text>
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
