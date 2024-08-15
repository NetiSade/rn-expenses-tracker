import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';

export const createEditExpenseModalScreenOptions: StackNavigationOptions = {
  ...TransitionPresets.ModalPresentationIOS,
  headerTitle: 'Expense Details',
  headerShown: true,
  cardOverlayEnabled: true,
  gestureEnabled: true,
  cardStyle: {backgroundColor: 'transparent'},
};

export const expensesFilterModalScreenOptions: StackNavigationOptions = {
  ...TransitionPresets.ModalPresentationIOS,
  headerTitle: 'Filter Expenses',
  headerShown: true,
  cardOverlayEnabled: true,
  gestureEnabled: true,
  cardStyle: {backgroundColor: 'transparent'},
};

export const mainTabsScreenOptions: StackNavigationOptions = {
  title: 'Expenses',
};

export const homeTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: () => null,
  tabBarLabel: 'Expenses',
  tabBarLabelPosition: 'beside-icon',
};

export const profileTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: () => null,
  tabBarLabel: 'Profile',
  tabBarLabelPosition: 'beside-icon',
};
