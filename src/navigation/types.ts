import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';

import {FilterCriteria} from '../types/filterCriteria';
import {Expense} from '../types/expense';

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

export type HomeScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;
export interface CreateEditExpenseModalProps {
  navigation: StackNavigationProp<RootStackParamList, 'CreateEditExpense'>;
  route: RouteProp<RootStackParamList, 'CreateEditExpense'>;
}

export interface ExpensesFilterModalProps {
  navigation: StackNavigationProp<RootStackParamList, 'ExpensesFilter'>;
}
