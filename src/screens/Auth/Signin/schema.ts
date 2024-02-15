import {object, string} from 'yup';

export const SigninSchema = object().shape({
  email: string().email('Email not valid').required('• Email is required'),
  password: string()
    .min(6, 'Password must be at least 6 characters')
    .required('• Password is required'),
});
