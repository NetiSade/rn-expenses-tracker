import React from 'react';
import {Expense} from '../types/expense';
import {FilterCriteria} from '../types/filterCriteria';

interface AppContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  filterCriteria: FilterCriteria | null;
  setFilterCriteria: React.Dispatch<
    React.SetStateAction<FilterCriteria | null>
  >;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

export const AppContext = React.createContext<AppContextType | undefined>(
  undefined,
);

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
