// src/components/ActiveFilters.tsx
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {FilterCriteria} from '../types/filterCriteria';
import CustomText from './CustomText';

interface ActiveFiltersProps {
  filterCriteria: FilterCriteria | null;
  onPress: () => void;
}

const ActiveFilters = ({filterCriteria, onPress}: ActiveFiltersProps) => {
  if (!filterCriteria) {
    return null;
  }

  const {title, minAmount, maxAmount, startDate, endDate} = filterCriteria;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <CustomText style={styles.title}>Active Filters:</CustomText>
      {title && <CustomText style={styles.filter}>Title: {title}</CustomText>}
      {minAmount && (
        <CustomText style={styles.filter}>Min Amount: ${minAmount}</CustomText>
      )}
      {maxAmount && (
        <CustomText style={styles.filter}>Max Amount: ${maxAmount}</CustomText>
      )}
      {startDate && (
        <CustomText style={styles.filter}>
          Start Date: {new Date(startDate).toLocaleDateString()}
        </CustomText>
      )}
      {endDate && (
        <CustomText style={styles.filter}>
          End Date: {new Date(endDate).toLocaleDateString()}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  filter: {
    fontSize: 12,
  },
});

export default ActiveFilters;
