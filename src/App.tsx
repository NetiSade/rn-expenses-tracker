import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import {AppProvider} from './context/AppProvider';

const App = () => {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
};

export default App;
