// src/components/ActiveFilters.tsx
import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FilterCriteria} from '../types/filterCriteria';

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
      <Text style={styles.title}>Active Filters:</Text>
      {title && <Text style={styles.filter}>Title: {title}</Text>}
      {minAmount && <Text style={styles.filter}>Min Amount: ${minAmount}</Text>}
      {maxAmount && <Text style={styles.filter}>Max Amount: ${maxAmount}</Text>}
      {startDate && (
        <Text style={styles.filter}>
          Start Date: {new Date(startDate).toLocaleDateString()}
        </Text>
      )}
      {endDate && (
        <Text style={styles.filter}>
          End Date: {new Date(endDate).toLocaleDateString()}
        </Text>
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
