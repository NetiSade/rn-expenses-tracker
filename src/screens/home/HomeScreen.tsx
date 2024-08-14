import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainTabParamList, RootStackParamList} from '../../navigation/types';
import {useAppContext} from '../../context/AppContext';
import {getTotalExpenses, groupExpensesByDate} from '../../utils/expenseUtils';
import {Expense} from '../../types/expense';
import ActiveFilters from '../../components/ActiveFilters';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;

const HomeScreen: React.FC = () => {
  const {expenses, userName, filterCriteria} = useAppContext();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleFilterPress = () => {
    navigation.navigate('ExpensesFilter');
  };

  const filteredExpenses = expenses.filter(expense => {
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

  const groupedExpenses = groupExpensesByDate(filteredExpenses);
  const totalExpenses = getTotalExpenses(filteredExpenses);

  const renderExpenseItem = ({item}: {item: Expense}) => (
    <TouchableOpacity
      style={styles.expenseItem}
      onPress={() => navigation.navigate('CreateEditExpense', {expense: item})}>
      <Text style={styles.expenseTitle}>{item.title}</Text>
      <Text style={styles.expenseAmount}>${item.amount.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  const renderDateGroup = ({item}: {item: [string, Expense[]]}) => (
    <View style={styles.dateGroup}>
      <Text style={styles.dateHeader}>{item[0]}</Text>
      <FlatList
        data={item[1]}
        renderItem={renderExpenseItem}
        keyExtractor={expense => expense.id}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {userName}</Text>
      <ActiveFilters
        filterCriteria={filterCriteria}
        onPress={handleFilterPress}
      />
      <Text style={styles.totalExpenses}>
        Total Expenses: ${totalExpenses.toFixed(2)}
      </Text>
      <FlatList
        data={Object.entries(groupedExpenses).sort((a, b) =>
          b[0].localeCompare(a[0]),
        )}
        renderItem={renderDateGroup}
        keyExtractor={item => item[0]}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateEditExpense', {})}>
        <Text style={styles.addButtonText}>Add Expense</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => navigation.navigate('ExpensesFilter')}>
        <Text style={styles.filterButtonText}>
          {filterCriteria ? 'Edit Filters' : 'Filter Expenses'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  totalExpenses: {
    fontSize: 18,
    marginBottom: 20,
  },
  dateGroup: {
    marginBottom: 20,
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 5,
  },
  expenseTitle: {
    fontSize: 16,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  filterButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
