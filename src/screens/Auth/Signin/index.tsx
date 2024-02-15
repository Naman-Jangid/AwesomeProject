import React, {ReactElement} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Keyboard,
  StyleSheet,
  Alert,
} from 'react-native';
import {colors} from '../../../utils/colors';
import {useFormik} from 'formik';
import TextInput from '../../../components/TextInput';
import IconButton from '../../../components/Button';
import {SigninSchema} from './schema';
import {NavigationInterface} from '../../../utils/types';
import PasswordTextInput from '../../../components/PasswordTextInput';
import FormLabel from '../../../components/FormLabel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuthStore} from '../../../store/useAuthStore';

const SignIn = ({navigation}: NavigationInterface): ReactElement => {
  const {logInUser} = useAuthStore(state => state);
  const {values, handleChange, handleBlur, handleSubmit, errors, isSubmitting} =
    useFormik({
      validationSchema: SigninSchema,
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit: async values => {
        Keyboard.dismiss();
        logInUser(values);
        try {
        } catch (error) {
          Alert.alert('Something went wrong !');
        }
      },
    });

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
        <MaterialCommunityIcons
          name="account"
          size={150}
          style={styles.profileIcon}
        />
        <View style={styles.mainContainer}>
          <View style={{gap: 10, marginBottom: 20}}>
            <FormLabel isRequired label="Email" />
            <TextInput
              inputStyle={{borderRadius: 9}}
              keyboardType="email-address"
              value={values.email}
              placeholder="Email Address"
              defaultValue=""
              isReadOnly={false}
              handleBlur={handleBlur('email')}
              handleChange={handleChange('email')}
              errorMsg={errors.email}
            />
            <FormLabel isRequired label="Password" />
            <PasswordTextInput
              defaultValue=""
              isReadOnly={false}
              handleBlur={handleBlur('password')}
              handleChange={handleChange('password')}
              placeholder="Password"
              value={values.password}
              errorMsg={errors.password}
            />
          </View>
          <IconButton
            isLoading={isSubmitting}
            label="Sign in"
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 28,
  },
  profileIcon: {
    flex: 1,
    color: colors.defaultTheme,
    alignSelf: 'center',
    marginVertical: 75,
  },
});
export default SignIn;
