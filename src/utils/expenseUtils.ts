import {persistentService} from '../services/persistentService';
import {Expense} from '../types/expense';
import {FilterCriteria} from '../types/filterCriteria';

export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const expenses = await persistentService.getExpenses();
    return expenses;
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
    const date = new Date(expense.date).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(expense);
    return groups;
  }, {} as Record<string, Expense[]>);
};

export const getSortedGroupedExpenses = (
  groupedExpenses: Record<string, Expense[]>,
) => Object.entries(groupedExpenses).sort((a, b) => b[0].localeCompare(a[0]));

export const getFilteredExpenses = (
  expenses: Expense[],
  filterCriteria: FilterCriteria | null,
) => {
  return expenses.filter(expense => {
    if (!filterCriteria) {
      return true;
    }

    const {title, minAmount, maxAmount, startDate, endDate} = filterCriteria;

    if (title && !expense.title.toLowerCase().includes(title.toLowerCase())) {
      return false;
    }

    if (minAmount && expense.amount < parseFloat(minAmount)) {
      return false;
    }

    if (maxAmount && expense.amount > parseFloat(maxAmount)) {
      return false;
    }

    const expenseDate = new Date(expense.date);

    if (startDate && expenseDate < new Date(startDate)) {
      return false;
    }

    if (endDate && expenseDate > new Date(endDate)) {
      return false;
    }

    return true;
  });
};
