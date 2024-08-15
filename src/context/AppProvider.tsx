import React, {useState, useEffect, useCallback} from 'react';

import {AppContext} from './AppContext';
import {Expense} from '../types/expense';
import {FilterCriteria} from '../types/filterCriteria';
import {persistentService} from '../services/persistentService';

export const AppProvider = ({children}: {children: React.ReactNode}) => {
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
      const savedExpenses = await persistentService.getExpenses();
      if (savedExpenses) {
        setExpenses(savedExpenses);
      }
    } catch (error) {
      console.error('Error loading expenses:', error);
      setExpenses([]);
    }
  }, []);

  useEffect(() => {
    if (userName) {
      loadExpenses().then(() => setIsLoading(false));
    }
  }, [loadExpenses, userName]);

  const loadUserName = async () => {
    try {
      const savedName = await persistentService.getUserName();

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
      await persistentService.setExpenses(newExpenses);
    } catch (error) {
      console.error('Error saving expenses:', error);
    }
  };

  const addOrEditExpense = async (expense: Expense, exist: boolean) => {
    if (exist) {
      await overrideExpense(expense);
      return;
    }
    const newExpenses = [...expenses, expense];
    await saveExpenses(newExpenses);
  };

  const overrideExpense = async (expense: Expense) => {
    const newExpenses = expenses.filter(e => e.id !== expense.id);
    newExpenses.push(expense);
    await saveExpenses(newExpenses);
  };

  const deleteExpense = async (id: string) => {
    const newExpenses = expenses.filter(expense => expense.id !== id);
    await saveExpenses(newExpenses);
  };

  const clearState = () => {
    setUserName('');
    setExpenses([]);
    setFilterCriteria(null);
  };

  const signOut = async () => {
    clearState();
    try {
      persistentService.clearUserData();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AppContext.Provider
      value={{
        expenses,
        addOrEditExpense,
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
