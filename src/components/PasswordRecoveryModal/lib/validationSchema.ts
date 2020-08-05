import * as Yup from 'yup';
import { TFunction } from 'i18next';

export const validationSchema = (t: TFunction) =>
  Yup.object().shape({
    email: Yup.string().required(t('validation.email.required')).email(t('validation.email.valid')),
  });
