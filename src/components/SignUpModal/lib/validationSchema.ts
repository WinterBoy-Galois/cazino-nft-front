import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string().required('Please enter your Email.').email('Please enter a valid Email.'),
  username: Yup.string().required('Please enter your Username.'),
  password: Yup.string()
    .required('Please enter your password.')
    .min(8, ({ min }) => `Password is too short - length must be at least ${min} characters.`)
    .max(20, ({ max }) => `Password is too long - maximum length is ${max} characters.`)
    .matches(/[A-Z]/, 'Must contain at least one uppercase character.')
    .matches(/[a-z]/, 'Must contain at least one lowercase character.')
    .matches(/[0-9]/, 'Must contain at least one number.')
    .matches(
      /[\^$*.[\]{}()?\-\\"!@#%&/\\,><':;|_~`]/,
      'Your password must contain at least one of the following special characters: ^ $ * . [ ] { } ( ) ? - " ! @ # % & / \\ , > < \' : ; | _ ~ `'
    ),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
  terms: Yup.bool().oneOf([true], 'Please accept the terms of use.'),
});
