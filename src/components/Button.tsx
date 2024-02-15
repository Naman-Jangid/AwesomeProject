import React, {ReactElement} from 'react';
import {
  Pressable,
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import {colors} from './../utils/colors';

interface IconButtonInterface {
  icon?: boolean;
  valid?: boolean;
  onPress: () => void;
  label: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  wrapperStyle?: any;
}
const IconButton = ({
  icon,
  valid,
  onPress,
  label,
  isLoading,
  isDisabled,
  wrapperStyle,
}: IconButtonInterface): ReactElement => {
  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading || isDisabled}
      style={({pressed}) => [
        styles.container,
        wrapperStyle,
        styles.elevation,
        valid ? styles.containerValid : styles.containerInvalid,
        isLoading ? {opacity: 0.5} : pressed ? {opacity: 0.7} : null,
        isDisabled ? {opacity: 0.5} : null,
      ]}>
      {isLoading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="small" color={colors.defaultTheme} />
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: icon ? 'space-between' : 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginVertical: 30,
    borderRadius: 7,
  },
  containerValid: {
    backgroundColor: colors.defaultTheme,
  },
  containerInvalid: {
    backgroundColor: colors.defaultTheme,
  },
  textValid: {
    color: 'white',
  },
  textInvalid: {
    color: 'white',
  },
  icon: {
    marginLeft: '40%',
  },
  elevation: {
    elevation: 10,
    shadowColor: colors.singletons.black,
  },
});

export default IconButton;
