import React from 'react';
import {
  View,
  TextInput as RNTextInput,
  StyleSheet,
  Pressable,
  KeyboardTypeOptions,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  Text,
} from 'react-native';
import {colors} from '../utils/colors';
import {ReactElement, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';

interface TextInputInterface {
  value: string;
  placeholder: string;
  handleBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  handleChange: (text: string) => void;
  errorMsg: string | undefined;
  isReadOnly: boolean;
  defaultValue?: string;
  borderRadius?: number;
  inputBoxStyle?: any;
  inputStyle?: any;
  keyboardType?: KeyboardTypeOptions;
  iconBoxStyle?: any;
}
const PasswordTextInput = (properties: TextInputInterface): ReactElement => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    value,
    placeholder,
    handleBlur,
    handleChange,
    errorMsg,
    isReadOnly,
    defaultValue,
    keyboardType,
    inputBoxStyle,
    inputStyle,
    iconBoxStyle,
  } = properties;
  const inputBoxStyles = [inputBoxStyle];
  return (
    <View>
      <View style={[styles.boxStyle, inputBoxStyles]}>
        <RNTextInput
          style={[styles.inputStyle, inputStyle]}
          secureTextEntry={!isPasswordVisible}
          placeholderTextColor={colors.placeHolderColor}
          onBlur={handleBlur}
          onChangeText={handleChange}
          selectionColor={colors.placeHolderColor}
          keyboardType={keyboardType || 'default'}
          value={value}
          editable={!isReadOnly}
          defaultValue={defaultValue}
          placeholder={placeholder}
        />
        <Pressable
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={[styles.iconBoxStyle, iconBoxStyle]}>
          <Feather
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={18}
            color={iconBoxStyle ? colors.muted[500] : 'black'}
          />
        </Pressable>
      </View>
      {errorMsg && <Text style={{color: 'red'}}>{errorMsg}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  boxStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputStyle: {
    flex: 1,
    borderBottomLeftRadius: 9,
    borderTopLeftRadius: 9,
    backgroundColor: 'white',
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 15,
    letterSpacing: 0.3,
    alignSelf: 'stretch',
    padding: 15,
    color: colors.singletons.black,
  },
  iconBoxStyle: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 58,
    width: 58,
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
  },
});

export default PasswordTextInput;
