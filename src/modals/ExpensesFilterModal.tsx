import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';

import {useAppContext} from '../context/AppContext';
import {RootStackParamList} from '../navigation/types';
import {FilterCriteria} from '../types/filterCriteria';

type ExpensesFilterModalNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ExpensesFilter'
>;

interface Props {
  navigation: ExpensesFilterModalNavigationProp;
}

const ExpensesFilterModal: React.FC<Props> = ({navigation}) => {
  const {filterCriteria, setFilterCriteria} = useAppContext();
  const [titleFilter, setTitleFilter] = useState(filterCriteria?.title || '');
  const [minAmountFilter, setMinAmountFilter] = useState(
    filterCriteria?.minAmount || '',
  );
  const [maxAmountFilter, setMaxAmountFilter] = useState(
    filterCriteria?.maxAmount || '',
  );
  const [startDate, setStartDate] = useState<Date | null>(
    filterCriteria?.startDate ? new Date(filterCriteria.startDate) : null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    filterCriteria?.endDate ? new Date(filterCriteria.endDate) : null,
  );
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleFilter = () => {
    const newFilterCriteria: FilterCriteria = {
      title: titleFilter,
      minAmount: minAmountFilter,
      maxAmount: maxAmountFilter,
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
    };
    setFilterCriteria(newFilterCriteria);
    navigation.goBack();
  };

  const handleClear = () => {
    setTitleFilter('');
    setMinAmountFilter('');
    setMaxAmountFilter('');
    setStartDate(null);
    setEndDate(null);
    setFilterCriteria(null);
    navigation.goBack();
  };

  const handleDateChange =
    (setDate: React.Dispatch<React.SetStateAction<Date | null>>) =>
    (event: any, selectedDate?: Date) => {
      const currentDate =
        selectedDate || (setDate === setStartDate ? startDate : endDate);
      setShowStartDatePicker(Platform.OS === 'ios');
      setShowEndDatePicker(Platform.OS === 'ios');
      if (currentDate) {
        setDate(currentDate);
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Expenses</Text>
      <TextInput
        style={styles.input}
        placeholder="Filter by title"
        placeholderTextColor="#999"
        value={titleFilter}
        onChangeText={setTitleFilter}
      />
      <View style={styles.amountContainer}>
        <TextInput
          style={[styles.input, styles.amountInput]}
          placeholder="Min amount"
          placeholderTextColor="#999"
          value={minAmountFilter}
          onChangeText={setMinAmountFilter}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.amountInput]}
          placeholder="Max amount"
          placeholderTextColor="#999"
          value={maxAmountFilter}
          onChangeText={setMaxAmountFilter}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowStartDatePicker(true)}>
        <Text style={styles.dateButtonText}>
          {startDate ? startDate.toLocaleDateString() : 'Select Start Date'}
        </Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange(setStartDate)}
        />
      )}
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowEndDatePicker(true)}>
        <Text style={styles.dateButtonText}>
          {endDate ? endDate.toLocaleDateString() : 'Select End Date'}
        </Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange(setEndDate)}
        />
      )}
      <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
        <Text style={styles.buttonText}>Apply Filters</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
        <Text style={styles.buttonText}>Clear Filters</Text>
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
  amountInput: {
    width: '48%',
  },
  dateButton: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  dateButtonText: {
    fontSize: 16,
    color: 'black',
  },
  filterButton: {
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
