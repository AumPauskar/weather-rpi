import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput } from 'react-native';

const ProfileScreen = () => {
  // State to hold the URL value
  const [url, setUrl] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
        <Text style={[styles.headerText, styles.centerText]}>Profile</Text>
        <Text style={styles.headerText}>Logout</Text>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar} />
        </View>
        <Text style={styles.username}>Username</Text>
        <Text style={styles.mantra}>A mantra goes here</Text>
      </View>
      <View style={styles.devicesContainer}>
        <Text style={styles.deviceName}>Device name</Text>
        {/* TextInput for URL using existing deviceUrl style for consistency */}
        <TextInput
          style={styles.deviceUrl}
          onChangeText={setUrl}
          value={url}
          placeholder="Url"
          placeholderTextColor="#A1A1A2"
        />
      </View>
    </View>
  );
};

// Existing styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  centerText: {
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#000000',
  },
  username: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  mantra: {
    color: '#A1A1A2',
    fontSize: 14,
    marginTop: 8,
  },
  devicesContainer: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  deviceName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deviceUrl: {
    color: '#A1A1A2',
    fontSize: 14,
    marginTop: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#A1A1A2',
  },
});

export default ProfileScreen;