import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import {useProfileScreen} from './useProfileScreen';
import CustomText from '../../components/CustomText';

const ProfileScreen = () => {
  const {expenses, userName, handleSignOut} = useProfileScreen();
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <CustomText style={styles.info}>Name: {userName}</CustomText>
        <CustomText style={styles.info}>
          Total Expenses: {expenses.length}
        </CustomText>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <CustomText style={styles.signOutButtonText}>Sign Out</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'space-around',
  },
  infoContainer: {
    marginBottom: 10,
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
