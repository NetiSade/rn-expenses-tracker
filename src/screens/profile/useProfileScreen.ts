import {Alert} from 'react-native';
import {useAppContext} from '../../context/AppContext';
import {showSignOutAlert} from './utils';

export const useProfileScreen = () => {
  const {userName, expenses, signOut} = useAppContext();

  const performSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  const handleSignOut = () => showSignOutAlert(performSignOut);

  return {
    userName,
    expenses,
    handleSignOut,
  };
};
