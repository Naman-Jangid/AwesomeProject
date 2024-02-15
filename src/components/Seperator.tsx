import React from 'react';
import {View} from 'react-native';
import {colors} from '../utils/colors';

interface SeparatorProps {
  width?: number;
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  separatorStyle?: any;
}

const Separator: React.FC<SeparatorProps> = ({
  width = 1,
  orientation = 'horizontal',
  color = colors.blueGray[100],
  separatorStyle,
}) => {
  const separatorStyles = [
    {width: orientation === 'horizontal' ? '100%' : width},
    {height: orientation === 'vertical' ? '100%' : width},
    {backgroundColor: color},
    separatorStyle,
  ];
  return <View style={[separatorStyles]} />;
};

export default Separator;
