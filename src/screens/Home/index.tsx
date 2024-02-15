import React, {useState, memo} from 'react';
import {
  View,
  ScrollView,
  Alert,
  Keyboard,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {colors} from '../../utils/colors';
import IconButton from '../../components/Button';
import {useAuthStore} from '../../store/useAuthStore';
import Separator from '../../components/Seperator';
import FormLabel from '../../components/FormLabel';
import SelectDropDown from '../../components/SelectDropDown';
import TextInput from '../../components/TextInput';
import {cities, states} from '../../utils/constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export const OnBoardingSchema = Yup.object().shape({
  type: Yup.string().required('This field is required'),
  firstName: Yup.string().required('please enter your first name'),
  lastName: Yup.string().required('please enter your last name'),
  name: Yup.string().required(),
  addressLine1: Yup.string().required('please enter a valid address'),
  addressLine2: Yup.string(),
  pinCode: Yup.string()
    .required('please enter a valid pincode')
    .max(6, 'Please enter a valid pincode')
    .min(6, 'Please enter a valid pincode'),
  state: Yup.string().required('please enter a valid state'),
  city: Yup.string().required('please enter a valid city'),
  country: Yup.string(),
});

const Home = () => {
  const [isChecked, setIsChecked] = useState(true);
  const {userDetails, setUserDetails} = useAuthStore(state => state);
  const {
    values,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    isSubmitting,
    touched,
  } = useFormik({
    validationSchema: OnBoardingSchema,
    initialValues: {
      firstName: userDetails?.firstName ?? '',
      lastName: userDetails?.lastName ?? '',
      addressLine1: '',
      addressLine2: '',
      pinCode: '',
      city: 'Jaipur',
      state: 'Rajasthan',
      countryCode: '+91',
      country: 'India',
    },
    onSubmit: async values => {
      console.log('🚀 ~ file: index.tsx:56 ~ Home ~ values', values);
      Keyboard.dismiss();
      setUserDetails(values);
      try {
        console.log('values ', values);
      } catch (error) {
        Alert.alert('Something went wrong !');
      }
    },
  });

  const isFormReadyOnly = false;

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <MaterialCommunityIcons
        name="account"
        size={150}
        style={styles.profileIcon}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{backgroundColor: 'white'}}>
        <View
          style={{
            marginHorizontal: 28,
          }}>
          <FormLabel label="First name" isRequired />
          <TextInput
            inputStyle={{borderRadius: 9}}
            isReadOnly={isFormReadyOnly}
            placeholder={'Enter your first name'}
            defaultValue={userDetails?.firstName}
            handleChange={handleChange('firstName')}
            handleBlur={handleBlur('firstName')}
          />
          <FormLabel label="Last name" isRequired />
          <TextInput
            isReadOnly={isFormReadyOnly}
            label="Last name"
            placeholder={'Enter your last name'}
            defaultValue={userDetails?.lastName}
            handleChange={handleChange('lastName')}
            handleBlur={handleBlur('lastName')}
            errorMsg={errors.lastName}
          />
          <FormLabel label="Address Line 1" isRequired />
          <TextInput
            placeholder={'Address Line 1'}
            handleChange={handleChange('addressLine1')}
            handleBlur={handleBlur('addressLine1')}
            errorMsg={
              errors.addressLine1 && touched.addressLine1
                ? errors.addressLine1
                : ''
            }
            isReadOnly={isFormReadyOnly}
          />
          <TextInput
            isReadOnly={false}
            value={''}
            defaultValue=""
            placeholder={'Address Line 2'}
            handleChange={handleChange('addressLine2')}
            handleBlur={handleBlur('addressLine2')}
            errorMsg={errors.addressLine2}
          />
          <FormLabel label="Pin code" isRequired />
          <TextInput
            isReadOnly={isFormReadyOnly}
            keyboardType="number-pad"
            placeholder={'110024'}
            handleChange={handleChange('pinCode')}
            handleBlur={handleBlur('pinCode')}
            errorMsg={errors.pinCode && touched.pinCode ? errors.pinCode : ''}
          />
          <View style={{}}>
            <FormLabel label={'State'} isRequired={true} />
            <SelectDropDown
              key={1}
              dataSet={states}
              selectItemPlaceHolder="state"
              searchInputPlaceHolder="state"
              hanldeSelectItem={selectedItem => {
                setFieldValue('state', selectedItem);
                setFieldValue('city', '');
              }}
              defaultValue={values.state}
              isSearchable={true}
            />
            {errors.state && (
              <Text style={colors.red[500]}>{errors.state}</Text>
            )}
          </View>
          <View>
            <FormLabel label={'City'} isRequired={true} />
            <SelectDropDown
              key={2}
              dataSet={cities}
              selectItemPlaceHolder="city"
              searchInputPlaceHolder="city"
              hanldeSelectItem={handleChange('city')}
              defaultValue={values.city}
              isSearchable={true}
            />
            {errors.city && <Text style={colors.red[500]}>{errors.city}</Text>}
          </View>
          <FormLabel isRequired label="Country" />
          <TextInput
            errorMsg={errors.country}
            handleChange={() => {}}
            placeholder={'India'}
            value={values.country}
            isReadOnly={true}
            defaultValue={values.country}
          />
          <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
            <BouncyCheckbox
              size={25}
              fillColor="red"
              unfillColor="white"
              text={'Accept terms & conditions'}
              iconStyle={{borderColor: 'red'}}
              innerIconStyle={{borderWidth: 2}}
              onPress={(isChecked: boolean) => {
                setIsChecked(isChecked);
              }}
            />
          </View>
          <IconButton
            isDisabled={
              !values.firstName ||
              !values.addressLine1 ||
              !values.city ||
              !values.pinCode ||
              !values.state ||
              !values.lastName ||
              !values.firstName ||
              !values.lastName
            }
            isLoading={isSubmitting}
            label="Save"
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  profileIcon: {
    flex: 1,
    color: colors.defaultTheme,
    alignSelf: 'center',
    marginVertical: 75,
  },
});

export default memo(Home);
