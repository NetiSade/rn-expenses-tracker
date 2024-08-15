import {useState} from 'react';

import {useAppContext} from '../../context/AppContext';
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
  const [startDate, setStartDate] = useState<Date | undefined>(
    filterCriteria?.startDate ? new Date(filterCriteria.startDate) : undefined,
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    filterCriteria?.endDate ? new Date(filterCriteria.endDate) : undefined,
  );

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
    setStartDate(undefined);
    setEndDate(undefined);
    setFilterCriteria(null);
    navigation.goBack();
  };

  return {
    titleFilter,
    minAmountFilter,
    maxAmountFilter,
    startDate,
    endDate,
    setTitleFilter,
    setMinAmountFilter,
    setMaxAmountFilter,
    setStartDate,
    setEndDate,
    handleFilter,
    handleClear,
  };
};
