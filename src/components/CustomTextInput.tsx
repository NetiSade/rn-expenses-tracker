import React from 'react';

import {TextInput, TextInputProps} from 'react-native';
import {globalStyles} from '../styles/globalStyles';

const CustomTextInput = ({
  style,
  placeholderTextColor,
  ...rest
}: TextInputProps) => {
  return (
    <TextInput
      style={[globalStyles.text, style]}
      placeholderTextColor={placeholderTextColor ?? 'gray'}
      {...rest}
    />
  );
};

export default CustomTextInput;
