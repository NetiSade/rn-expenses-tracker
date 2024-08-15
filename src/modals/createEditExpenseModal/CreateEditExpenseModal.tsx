import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import {CreateEditExpenseModalProps} from '../../navigation/types';
import {useCreateEditExpenseModal} from './useCreateEditExpenseModal';
import CustomText from '../../components/CustomText';
import CustomTextInput from '../../components/CustomTextInput';
import {CustomDatePicker} from '../../components/CustomDatePicker';

const CreateEditExpenseModal = (props: CreateEditExpenseModalProps) => {
  const {
    amount,
    title,
    existingExpense,
    date,
    setTitle,
    setAmount,
    setDate,
    handleDelete,
    handleSave,
  } = useCreateEditExpenseModal(props);

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>
        {existingExpense ? 'Edit Expense' : 'Create Expense'}
      </CustomText>
      <CustomTextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        maxLength={50}
      />
      <CustomTextInput
        style={styles.input}
        placeholder="Amount (USD)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        maxLength={10}
      />
      {existingExpense && (
        <CustomText>{`date: ${existingExpense.date}`}</CustomText>
      )}
      <View style={styles.dateContainer}>
        <CustomDatePicker
          initialDate={existingExpense ? undefined : date}
          title={existingExpense ? 'Change Date' : 'Date'}
          onDateChange={setDate}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <CustomText style={styles.buttonText}>Save</CustomText>
      </TouchableOpacity>
      {existingExpense && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <CustomText style={styles.buttonText}>Delete</CustomText>
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
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
