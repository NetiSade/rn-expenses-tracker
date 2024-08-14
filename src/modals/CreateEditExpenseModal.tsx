import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Expense} from '../types/expense';
import {RootStackParamList} from '../navigation/types';
import {useAppContext} from '../context/AppContext';

type CreateEditExpenseModalNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateEditExpense'
>;
type CreateEditExpenseModalRouteProp = RouteProp<
  RootStackParamList,
  'CreateEditExpense'
>;

interface Props {
  navigation: CreateEditExpenseModalNavigationProp;
  route: CreateEditExpenseModalRouteProp;
}

const CreateEditExpenseModal: React.FC<Props> = ({navigation, route}) => {
  const {addExpense, deleteExpense} = useAppContext();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const existingExpense = route.params?.expense;

  useEffect(() => {
    if (existingExpense) {
      setTitle(existingExpense.title);
      setAmount(existingExpense.amount.toString());
      setDate(new Date(existingExpense.date));
    }
  }, [existingExpense]);

  const handleSave = async () => {
    if (!title.trim() || !amount.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newExpense: Expense = {
      id: existingExpense?.id || Date.now().toString(),
      title: title.trim(),
      amount: parseFloat(amount),
      date: date.toISOString(),
    };

    try {
      await addExpense(newExpense);
      navigation.goBack();
    } catch (error) {
      console.error('Error saving expense:', error);
      Alert.alert('Error', 'Failed to save expense');
    }
  };

  const handleDelete = async () => {
    if (!existingExpense) {
      return;
    }

    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this expense?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteExpense(existingExpense.id);
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting expense:', error);
              Alert.alert('Error', 'Failed to delete expense');
            }
          },
        },
      ],
    );
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {existingExpense ? 'Edit Expense' : 'Create Expense'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        placeholderTextColor="#999"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}>
        <Text>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      {existingExpense && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  dateButton: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateEditExpenseModal;
