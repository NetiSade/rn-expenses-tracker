import React, {useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from './AppContext';
import {Expense} from '../types/expense';
import {FilterCriteria} from '../types/filterCriteria';

export const AppProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria | null>(
    null,
  );
  const [userName, setUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserName();
  }, []);

  const loadExpenses = useCallback(async () => {
    try {
      const savedExpenses = await AsyncStorage.getItem('expenses');
      if (savedExpenses) {
        setExpenses(JSON.parse(savedExpenses));
      }
    } catch (error) {
      console.error('Error loading expenses:', error);
    }
  }, []);

  useEffect(() => {
    if (userName) {
      loadExpenses().then(() => setIsLoading(false));
    }
  }, [loadExpenses, filterCriteria, userName]);

  const loadUserName = async () => {
    try {
      const savedName = await AsyncStorage.getItem('userFullName');
      if (savedName) {
        setUserName(savedName);
      }
    } catch (error) {
      console.error('Error loading user name:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveExpenses = async (newExpenses: Expense[]) => {
    setExpenses(newExpenses);
    try {
      await AsyncStorage.setItem('expenses', JSON.stringify(newExpenses));
    } catch (error) {
      console.error('Error saving expenses:', error);
    }
  };

  const addExpense = async (expense: Expense) => {
    const newExpenses = [...expenses, expense];
    await saveExpenses(newExpenses);
  };

  const deleteExpense = async (id: string) => {
    const newExpenses = expenses.filter(expense => expense.id !== id);
    await saveExpenses(newExpenses);
  };

  const signOut = async () => {
    setUserName('');
    setExpenses([]);
    setFilterCriteria(null);
    try {
      await AsyncStorage.removeItem('userFullName');
      await AsyncStorage.removeItem('expenses');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        filterCriteria,
        setFilterCriteria,
        userName,
        setUserName,
        signOut,
        isLoading,
      }}>
      {children}
    </AppContext.Provider>
  );
};
