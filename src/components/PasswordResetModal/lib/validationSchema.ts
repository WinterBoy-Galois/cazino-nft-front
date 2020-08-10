import * as Yup from 'yup';
import { TFunction } from 'i18next';

export const validationSchema = (t: TFunction) =>
  Yup.object().shape({
    password: Yup.string()
      .required(t('validation.password.required'))
      .min(8, ({ min }) => t('validation.password.min', { min }))
      .max(20, ({ max }) => t('validation.password.max', { max }))
      .matches(/[A-Z]/, t('validation.password.uppercase'))
      .matches(/[a-z]/, t('validation.password.lowercase'))
      .matches(/[0-9]/, t('validation.password.digit'))
      .matches(/[\^$*.[\]{}()?\-\\"!@#%&/\\,><':;|_~`]/, t('validation.password.special')),
    confirmPassword: Yup.string()
      .required(t('validation.password.required'))
      .oneOf([Yup.ref('password')], t('validation.password.match')),
  });
