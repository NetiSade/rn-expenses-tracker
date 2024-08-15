import React, {useState} from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import DatePicker from 'react-native-date-picker';

import CustomText from './CustomText';

type CustomDatePickerProps = {
  onDateChange: (date: Date) => void;
  title?: string;
  initialDate?: Date | null;
  style?: StyleProp<ViewStyle>;
  minimumDate?: Date;
  maximumDate?: Date;
};

export const CustomDatePicker = (props: CustomDatePickerProps) => {
  const [date, setDate] = useState(props.initialDate);
  const [open, setOpen] = useState(false);

  const handleConfirm = (newDate: Date) => {
    setOpen(false);
    setDate(newDate);
    props.onDateChange(newDate);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <TouchableOpacity
        onPress={handleOpen}
        style={[styles.container, props.style]}>
        <CustomText style={styles.text}>{props.title ?? 'Date:'}</CustomText>
        <CustomText style={styles.text}>
          {date?.toLocaleDateString()}
        </CustomText>
      </TouchableOpacity>
      <DatePicker
        modal
        mode="date"
        open={open}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        date={date ?? new Date()}
        minimumDate={props.minimumDate}
        maximumDate={props.maximumDate}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'blue',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'blue',
  },
});
