import React from 'react';
import {
  View,
  TextInput as RNTextInput,
  StyleSheet,
  KeyboardTypeOptions,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  Text,
} from 'react-native';
import {colors} from '../utils/colors';
import {ReactElement} from 'react';

interface TextInputInterface {
  value: any;
  placeholder: string;
  handleBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  handleChange: (text: string) => void;
  errorMsg: string | undefined;
  isReadOnly: boolean;
  defaultValue?: string;
  inputStyle?: any;
  ref?: any;
  keyboardType?: KeyboardTypeOptions;
  onFocus?: any;
  isSecureTextEntry?: boolean;
}
const TextInput = (properties: TextInputInterface): ReactElement => {
  const {
    value,
    placeholder,
    handleBlur,
    handleChange,
    errorMsg,
    isReadOnly,
    defaultValue,
    keyboardType,
    inputStyle,
    ref,
    onFocus,
    isSecureTextEntry,
  } = properties;
  return (
    <View>
      <RNTextInput
        keyboardType={keyboardType || 'default'}
        style={[styles.inputStyle, inputStyle]}
        onBlur={handleBlur}
        ref={ref}
        onFocus={onFocus}
        placeholderTextColor={colors.fadedGrey}
        editable={!isReadOnly}
        onChangeText={handleChange}
        selectionColor={colors.placeHolderColor}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        secureTextEntry={isSecureTextEntry}
      />
      {errorMsg && <Text style={{color: colors.error[500]}}>{errorMsg}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    lineHeight: 15,
    letterSpacing: 0.3,
    padding: 15,
    backgroundColor: 'white',
    maxWidth: '100%',
    alignSelf: 'stretch',
    opacity: 1,
    pointerEvents: 'none',
    color: colors.singletons.black,
  },
});

export default TextInput;
