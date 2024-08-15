import React from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

import {Expense} from '../../types/expense';
import ActiveFilters from '../../components/ActiveFilters';
import {useHomeScreen} from './useHomeScreen';
import CustomText from '../../components/CustomText';

const HomeScreen = () => {
  const {
    userName,
    filterCriteria,
    sortedGroupedExpenses,
    filtersButtonTitle,
    totalExpensesString,
    showFilterButton,
    handleExpensePress,
    handleFilterPress,
    handleCreateExpensePress,
  } = useHomeScreen();

  const renderExpenseItem = ({item}: {item: Expense}) => (
    <TouchableOpacity
      style={styles.expenseItem}
      onPress={() => handleExpensePress(item)}>
      <CustomText style={styles.expenseTitle}>{item.title}</CustomText>
      <CustomText style={styles.expenseAmount}>
        ${item.amount.toFixed(2)}
      </CustomText>
    </TouchableOpacity>
  );

  const renderDateGroup = ({item}: {item: [string, Expense[]]}) => (
    <View style={styles.dateGroup}>
      <CustomText style={styles.dateHeader}>{item[0]}</CustomText>
      <FlatList
        data={item[1]}
        renderItem={renderExpenseItem}
        keyExtractor={expense => expense.id}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomText style={styles.welcomeText}>Welcome, {userName}</CustomText>
      <ActiveFilters
        filterCriteria={filterCriteria}
        onPress={handleFilterPress}
      />
      <CustomText style={styles.totalExpenses}>
        Total Expenses: ${totalExpensesString}
      </CustomText>
      <FlatList
        style={styles.list}
        data={sortedGroupedExpenses}
        renderItem={renderDateGroup}
        keyExtractor={item => item[0]}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleCreateExpensePress}>
        <CustomText style={styles.addButtonText}>Add Expense</CustomText>
      </TouchableOpacity>
      {showFilterButton && (
        <TouchableOpacity
          style={styles.filterButton}
          onPress={handleFilterPress}>
          <CustomText style={styles.filterButtonText}>
            {filtersButtonTitle}
          </CustomText>
        </TouchableOpacity>
      )}
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
  list: {
    marginHorizontal: 8,
    marginTop: 10,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'lightgray',
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
