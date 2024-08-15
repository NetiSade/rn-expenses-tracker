import {useCallback, useState} from 'react';
import {useAppContext} from '../../context/AppContext';
import {persistentService} from '../../services/persistentService';

export const useWelcomeScreen = () => {
  const [fullName, setFullName] = useState('');
  const {setUserName} = useAppContext();

  const handleSubmit = useCallback(async () => {
    const trimmedFullName = fullName.trim();
    if (trimmedFullName) {
      try {
        await persistentService.setUserName(trimmedFullName);
        setUserName(trimmedFullName);
      } catch (error) {
        console.error('Error saving user name:', error);
      }
    }
  }, [fullName, setUserName]);

  return {
    fullName,
    setFullName,
    handleSubmit,
  };
};
