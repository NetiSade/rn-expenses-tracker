import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {useProfileScreen} from './useProfileScreen';

const ProfileScreen = () => {
  const {expenses, userName, handleSignOut} = useProfileScreen();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.info}>Name: {userName}</Text>
      <Text style={styles.info}>Total Expenses: {expenses.length}</Text>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  signOutButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
