import {useCallback, useEffect, useState} from 'react';

import {useAppContext} from '../../context/AppContext';
import {CreateEditExpenseModalProps} from '../../navigation/types';
import {Alert} from 'react-native';
import {Expense} from '../../types/expense';

export const useCreateEditExpenseModal = ({
  navigation,
  route,
}: CreateEditExpenseModalProps) => {
  const {addOrEditExpense, deleteExpense} = useAppContext();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerShown, setIsDatePickerShown] = useState(false);

  const existingExpense = route.params?.expense;

  useEffect(() => {
    if (existingExpense) {
      setTitle(existingExpense.title);
      setAmount(existingExpense.amount.toString());
      setDate(new Date(existingExpense.date));
    }
  }, [existingExpense]);

  const handleSave = useCallback(async () => {
    if (!title.trim() || !amount.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newExpense: Expense = {
      id: existingExpense?.id || Date.now().toString(),
      title: title.trim(),
      amount: parseFloat(amount),
      date: date.toISOString(),
    };

    try {
      await addOrEditExpense(newExpense, !!existingExpense);
      navigation.goBack();
    } catch (error) {
      console.error('Error saving expense:', error);
      Alert.alert('Error', 'Failed to save expense');
    }
  }, [addOrEditExpense, amount, date, existingExpense, navigation, title]);

  const handleDelete = useCallback(async () => {
    if (!existingExpense) {
      return;
    }

    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this expense?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteExpense(existingExpense.id);
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting expense:', error);
              Alert.alert('Error', 'Failed to delete expense');
            }
          },
        },
      ],
    );
  }, [deleteExpense, existingExpense, navigation]);

  const handleDateChange = useCallback(
    (event: any, selectedDate: Date | undefined) => {
      setIsDatePickerShown(false);
      if (selectedDate) {
        setDate(selectedDate);
      }
    },
    [],
  );

  const toggleDatePicker = useCallback(() => {
    setIsDatePickerShown(prevState => !prevState);
  }, []);

  return {
    existingExpense,
    title,
    amount,
    isDatePickerShown,
    date,
    setTitle,
    setAmount,
    handleDateChange,
    handleDelete,
    handleSave,
    toggleDatePicker,
  };
};
