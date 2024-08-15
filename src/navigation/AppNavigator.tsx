import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import {MainTabParamList, RootStackParamList} from './types';
import CreateEditExpenseModal from '../modals/createEditExpenseModal/CreateEditExpenseModal';
import ExpensesFilterModal from '../modals/expensesFilterModal/ExpensesFilterModal';
import {useAppContext} from '../context/AppContext';
import LoadingState from '../components/LoadingState';
import {
  createEditExpenseModalScreenOptions,
  expensesFilterModalScreenOptions,
  homeTabOptions,
  mainTabsScreenOptions,
  profileTabOptions,
} from './screenOptions';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: 'black',
  },
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} options={homeTabOptions} />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={profileTabOptions}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const {isLoading, userName} = useAppContext();

  if (isLoading) {
    return <LoadingState />;
  }
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!userName ? (
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        ) : (
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={mainTabsScreenOptions}
          />
        )}
        <Stack.Screen
          name="CreateEditExpense"
          component={CreateEditExpenseModal}
          options={createEditExpenseModalScreenOptions}
        />
        <Stack.Screen
          name="ExpensesFilter"
          component={ExpensesFilterModal}
          options={expensesFilterModalScreenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
