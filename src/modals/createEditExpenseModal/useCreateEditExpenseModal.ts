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
  const existingExpense = route.params?.expense;

  const [date, setDate] = useState(
    existingExpense ? new Date(existingExpense.date) : new Date(),
  );

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

  return {
    existingExpense,
    title,
    amount,
    date,
    setDate,
    setTitle,
    setAmount,
    handleDelete,
    handleSave,
  };
};
