import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import {ExpensesFilterModalProps} from '../../navigation/types';
import {useExpensesFilterModal} from './useExpensesFilterModal';
import CustomText from '../../components/CustomText';
import CustomTextInput from '../../components/CustomTextInput';
import {CustomDatePicker} from '../../components/CustomDatePicker';

const ExpensesFilterModal = (props: ExpensesFilterModalProps) => {
  const {
    titleFilter,
    minAmountFilter,
    maxAmountFilter,
    startDate,
    endDate,
    setTitleFilter,
    setMinAmountFilter,
    setMaxAmountFilter,
    setStartDate,
    setEndDate,
    handleFilter,
    handleClear,
  } = useExpensesFilterModal(props);

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Filter Expenses</CustomText>
      <CustomTextInput
        style={styles.input}
        placeholder="Filter by title"
        value={titleFilter}
        onChangeText={setTitleFilter}
      />
      <View style={styles.amountContainer}>
        <CustomTextInput
          style={[styles.input, styles.amountInput]}
          placeholder="Min amount"
          value={minAmountFilter}
          onChangeText={setMinAmountFilter}
          keyboardType="numeric"
        />
        <CustomTextInput
          style={[styles.input, styles.amountInput]}
          placeholder="Max amount"
          value={maxAmountFilter}
          onChangeText={setMaxAmountFilter}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.datesContainer}>
        <CustomDatePicker
          initialDate={startDate}
          onDateChange={setStartDate}
          title="From Date"
          maximumDate={endDate}
        />

        <CustomDatePicker
          initialDate={endDate}
          onDateChange={setEndDate}
          title="Until Date"
          minimumDate={startDate}
        />
      </View>

      <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
        <CustomText style={styles.buttonText}>Apply Filters</CustomText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
        <CustomText style={styles.buttonText}>Clear Filters</CustomText>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'black',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  datesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  amountInput: {
    width: '48%',
  },
  filterButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExpensesFilterModal;
