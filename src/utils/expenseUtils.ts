import AsyncStorage from '@react-native-async-storage/async-storage';
import {Expense} from '../types/expense';

const EXPENSES_STORAGE_KEY = 'expenses';

export const saveExpense = async (expense: Expense): Promise<void> => {
  try {
    const expenses = await getExpenses();
    expenses.push(expense);
    await AsyncStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expense:', error);
  }
};

export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const expensesJson = await AsyncStorage.getItem(EXPENSES_STORAGE_KEY);
    return expensesJson ? JSON.parse(expensesJson) : [];
  } catch (error) {
    console.error('Error getting expenses:', error);
    return [];
  }
};

export const getTotalExpenses = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const groupExpensesByDate = (
  expenses: Expense[],
): Record<string, Expense[]> => {
  return expenses.reduce((groups, expense) => {
    const date = expense.date.split('T')[0]; // Get date part only
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(expense);
    return groups;
  }, {} as Record<string, Expense[]>);
};
