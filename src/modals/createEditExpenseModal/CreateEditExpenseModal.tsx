import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {CreateEditExpenseModalProps} from '../../navigation/types';
import {useCreateEditExpenseModal} from './useCreateEditExpenseModal';

const CreateEditExpenseModal = (props: CreateEditExpenseModalProps) => {
  const {
    amount,
    title,
    existingExpense,
    isDatePickerShown,
    date,
    setTitle,
    setAmount,
    handleDateChange,
    handleDelete,
    handleSave,
    toggleDatePicker,
  } = useCreateEditExpenseModal(props);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {existingExpense ? 'Edit Expense' : 'Create Expense'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        placeholderTextColor="#999"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.dateButton} onPress={toggleDatePicker}>
        <Text>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {isDatePickerShown && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      {existingExpense && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      )}
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
  },
  dateButton: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
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

export default CreateEditExpenseModal;
