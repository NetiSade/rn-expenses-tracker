import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

import {Expense} from '../../types/expense';
import ActiveFilters from '../../components/ActiveFilters';
import {useHomeScreen} from './useHomeScreen';

const HomeScreen = () => {
  const {
    userName,
    filterCriteria,
    sortedGroupedExpenses,
    filtersButtonTitle,
    totalExpensesString,
    handleExpensePress,
    handleFilterPress,
    handleCreateExpensePress,
  } = useHomeScreen();

  const renderExpenseItem = ({item}: {item: Expense}) => (
    <TouchableOpacity
      style={styles.expenseItem}
      onPress={() => handleExpensePress(item)}>
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
        Total Expenses: ${totalExpensesString}
      </Text>
      <FlatList
        data={sortedGroupedExpenses}
        renderItem={renderDateGroup}
        keyExtractor={item => item[0]}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleCreateExpensePress}>
        <Text style={styles.addButtonText}>Add Expense</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
        <Text style={styles.filterButtonText}>{filtersButtonTitle}</Text>
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
