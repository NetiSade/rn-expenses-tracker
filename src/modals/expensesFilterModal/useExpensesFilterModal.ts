import {useState} from 'react';
import {useAppContext} from '../../context/AppContext';
import {Platform} from 'react-native';
import {FilterCriteria} from '../../types/filterCriteria';
import {ExpensesFilterModalProps} from '../../navigation/types';

export const useExpensesFilterModal = ({
  navigation,
}: ExpensesFilterModalProps) => {
  const {filterCriteria, setFilterCriteria} = useAppContext();
  const [titleFilter, setTitleFilter] = useState(filterCriteria?.title || '');
  const [minAmountFilter, setMinAmountFilter] = useState(
    filterCriteria?.minAmount || '',
  );
  const [maxAmountFilter, setMaxAmountFilter] = useState(
    filterCriteria?.maxAmount || '',
  );
  const [startDate, setStartDate] = useState<Date | null>(
    filterCriteria?.startDate ? new Date(filterCriteria.startDate) : null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    filterCriteria?.endDate ? new Date(filterCriteria.endDate) : null,
  );
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleFilter = () => {
    const newFilterCriteria: FilterCriteria = {
      title: titleFilter,
      minAmount: minAmountFilter,
      maxAmount: maxAmountFilter,
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
    };
    setFilterCriteria(newFilterCriteria);
    navigation.goBack();
  };

  const handleClear = () => {
    setTitleFilter('');
    setMinAmountFilter('');
    setMaxAmountFilter('');
    setStartDate(null);
    setEndDate(null);
    setFilterCriteria(null);
    navigation.goBack();
  };

  const handleDateChange =
    (setDate: React.Dispatch<React.SetStateAction<Date | null>>) =>
    (event: any, selectedDate?: Date) => {
      const currentDate =
        selectedDate || (setDate === setStartDate ? startDate : endDate);
      setShowStartDatePicker(Platform.OS === 'ios');
      setShowEndDatePicker(Platform.OS === 'ios');
      if (currentDate) {
        setDate(currentDate);
      }
    };

  return {
    titleFilter,
    setTitleFilter,
    minAmountFilter,
    setMinAmountFilter,
    maxAmountFilter,
    setMaxAmountFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    showStartDatePicker,
    setShowStartDatePicker,
    showEndDatePicker,
    setShowEndDatePicker,
    handleFilter,
    handleClear,
    handleDateChange,
  };
};
