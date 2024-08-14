import {Expense} from '../types/expense';
import {FilterCriteria} from '../types/filterCriteria';

export type RootStackParamList = {
  Welcome: undefined;
  MainTabs: undefined;
  CreateEditExpense: {expense?: Expense};
  ExpensesFilter: undefined;
};

export type MainTabParamList = {
  Home: {filterCriteria?: FilterCriteria};
  Profile: undefined;
};
