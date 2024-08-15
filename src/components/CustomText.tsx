import React from 'react';
import {Text, TextProps} from 'react-native';
import {globalStyles} from '../styles/globalStyles';

const CustomText: React.FC<TextProps> = props => {
  return <Text {...props} style={[globalStyles.text, props.style]} />;
};

export default CustomText;
