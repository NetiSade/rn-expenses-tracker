import {Alert} from 'react-native';

export const showSignOutAlert = async (handleSignOut: () => void) => {
  Alert.alert(
    'Confirm Sign Out',
    'Are you sure you want to sign out? This will remove all your data from this device.',
    [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: handleSignOut,
      },
    ],
  );
};
