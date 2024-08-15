import AsyncStorage from '@react-native-async-storage/async-storage';
import {Expense} from '../types/expense';

const USER_NAME_KEY = 'userFullName';
const EXPENSES_KEY = 'expenses';

export const persistentService = {
  getUserName: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(USER_NAME_KEY);
    } catch (error) {
      console.error('Error getting user name:', error);
      return null;
    }
  },

  setUserName: async (name: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(USER_NAME_KEY, name);
    } catch (error) {
      console.error('Error setting user name:', error);
      throw error;
    }
  },

  getExpenses: async (): Promise<Expense[]> => {
    try {
      const expensesJson = await AsyncStorage.getItem(EXPENSES_KEY);
      return expensesJson ? JSON.parse(expensesJson) : [];
    } catch (error) {
      console.error('Error getting expenses:', error);
      return [];
    }
  },

  setExpenses: async (expenses: Expense[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
    } catch (error) {
      console.error('Error setting expenses:', error);
      throw error;
    }
  },

  clearUserData: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(USER_NAME_KEY);
      await AsyncStorage.removeItem(EXPENSES_KEY);
    } catch (error) {
      console.error('Error clearing user data:', error);
      throw error;
    }
  },
};
