import * as Yup from 'yup';
import { TFunction } from 'i18next';

export const validationSchema = (t: TFunction) =>
  Yup.object().shape({
    email: Yup.string().required(t('validation.email.required')).email(t('validation.email.valid')),
    username: Yup.string()
      .required(t('validation.username.required'))
      .min(4, ({ min }) => t('validation.username.min', { min }))
      .max(14, ({ max }) => t('validation.username.max', { max }))
      .matches(/^[a-z0-9]+$/i, t('validation.username.alphanumeric')),
    password: Yup.string()
      .required(t('validation.password.required'))
      .min(8, ({ min }) => t('validation.password.min', { min }))
      .max(20, ({ max }) => t('validation.password.max', { max }))
      .matches(/[A-Z]/, t('validation.password.uppercase'))
      .matches(/[a-z]/, t('validation.password.lowercase'))
      .matches(/[0-9]/, t('validation.password.digit'))
      .matches(/[\^$*.[\]{}()?\-\\"!@#%&/\\,><':;|_~`]/, t('validation.password.special'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\^$*.[\]{}()?\-\\"!@#%&/\\,><':;|_~`])[A-Za-z\d^$*.[\]{}()?\-\\"!@#%&/\\,><':;|_~`]+$/,
        t('validation.password.alphanumeric')
      ),
    confirmPassword: Yup.string()
      .required(t('validation.password.required'))
      .oneOf([Yup.ref('password')], t('validation.password.match')),
    terms: Yup.bool().oneOf([true], t('validation.terms.required')),
  });
