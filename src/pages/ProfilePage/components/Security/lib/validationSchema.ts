import * as Yup from 'yup';
import { TFunction } from 'i18next';

export const validationSchema = (t: TFunction) =>
  Yup.object().shape({
    oldPassword: Yup.string().required(t('auth:validation.password.required')),
    newPassword: Yup.string()
      .required(t('auth:validation.password.required'))
      .min(8, ({ min }) => t('auth:validation.password.min', { min }))
      .max(20, ({ max }) => t('auth:validation.password.max', { max }))
      .matches(/[A-Z]/, t('auth:validation.password.uppercase'))
      .matches(/[a-z]/, t('auth:validation.password.lowercase'))
      .matches(/[0-9]/, t('auth:validation.password.digit'))
      .matches(/[\^$*.[\]{}()?\-\\"!@#%&/\\,><':;|_~`]/, t('auth:validation.password.special'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\^$*.[\]{}()?\-\\"!@#%&/\\,><':;|_~`])[A-Za-z\d^$*.[\]{}()?\-\\"!@#%&/\\,><':;|_~`]+$/,
        t('auth:validation.password.alphanumeric')
      ),
    newPasswordConfirm: Yup.string()
      .required(t('auth:validation.password.required'))
      .oneOf([Yup.ref('newPassword')], t('auth:validation.password.match')),
  });
