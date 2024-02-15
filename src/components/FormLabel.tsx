import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors} from '../utils/colors';

const FormLabel = ({
  label,
  isRequired,
}: {
  label: string;
  isRequired: boolean;
}) => {
  return (
    <Text style={{color: 'black'}}>
      {label}
      <Text style={styles.errorStyle}>{isRequired && '*'}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  errorStyle: {
    color: colors.red[500],
  },
});

export default FormLabel;
