import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import {useWelcomeScreen} from './useWelcomeScreen';
import CustomText from '../../components/CustomText';
import CustomTextInput from '../../components/CustomTextInput';

const WelcomeScreen = () => {
  const {fullName, handleSubmit, setFullName} = useWelcomeScreen();

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Welcome to Expense Tracker</CustomText>
      <CustomTextInput
        style={styles.input}
        placeholder="Enter your name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <CustomText style={styles.buttonText}>Submit</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
