import {useNavigation} from '@react-navigation/native';

import {useAppContext} from '../../context/AppContext';
import {HomeScreenNavigationProps} from '../../navigation/types';
import {
  getFilteredExpenses,
  getSortedGroupedExpenses,
  getTotalExpenses,
  groupExpensesByDate,
} from '../../utils/expenseUtils';
import {Expense} from '../../types/expense';
import {useCallback, useMemo} from 'react';

export const useHomeScreen = () => {
  const {expenses, userName, filterCriteria} = useAppContext();

  const filteredExpenses = useMemo(
    () => getFilteredExpenses(expenses, filterCriteria),
    [expenses, filterCriteria],
  );

  const groupedExpenses = useMemo(
    () => groupExpensesByDate(filteredExpenses),
    [filteredExpenses],
  );

  const sortedGroupedExpenses = useMemo(
    () => getSortedGroupedExpenses(groupedExpenses),
    [groupedExpenses],
  );

  const totalExpenses = useMemo(
    () => getTotalExpenses(filteredExpenses),
    [filteredExpenses],
  );

  const filtersButtonTitle = filterCriteria
    ? 'Edit Filters'
    : 'Filter Expenses';

  const totalExpensesString = totalExpenses.toFixed(2);

  const navigation = useNavigation<HomeScreenNavigationProps>();

  const handleFilterPress = useCallback(() => {
    navigation.navigate('ExpensesFilter');
  }, [navigation]);

  const handleExpensePress = useCallback(
    (item: Expense) => {
      navigation.navigate('CreateEditExpense', {expense: item});
    },
    [navigation],
  );

  const handleCreateExpensePress = useCallback(() => {
    navigation.navigate('CreateEditExpense', {});
  }, [navigation]);

  return {
    userName,
    filterCriteria,
    sortedGroupedExpenses,
    filtersButtonTitle,
    totalExpensesString,
    handleFilterPress,
    handleExpensePress,
    handleCreateExpensePress,
  };
};
