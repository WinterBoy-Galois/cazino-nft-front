import React, { useState } from 'react';
import CardHeadline from '../../../../components/CardHeadline';
import DetailsContainer from '../../../../components/DetailsContainer';
import PasswordInput from '../../../../components/PasswordInput';
import { useFormik } from 'formik';
import { validationSchema } from './lib/validationSchema';
import { useTranslation } from 'react-i18next';
import ApplicationError from '../../../../models/applicationError.model';
import SpinnerButton from '../../../../components/SpinnerButton';
import { ErrorSummary } from '../../../../components';
import styles from './Security.module.scss';

interface IProps {
  loading: boolean;
  errors?: ApplicationError[];
  className?: string;
  onPasswordChange?: (oldPassword: string, newPassword: string) => Promise<boolean>;
}

const Security: React.FC<IProps> = ({
  errors,
  className = '',
  onPasswordChange = () => Promise.resolve(false),
  loading,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { t } = useTranslation(['profile', 'auth']);
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
    validateOnMount: true,
    validationSchema: validationSchema(t),
    onSubmit: async ({ oldPassword, newPassword }) => {
      const success = await onPasswordChange(oldPassword, newPassword);

      if (success) {
        formik.resetForm();
        await formik.validateForm();
      }
    },
  });

  return (
    <DetailsContainer background={'DARK'} className={`${styles.container} ${className}`}>
      <CardHeadline className={styles.headline}>{t('security.headline')}</CardHeadline>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        {errors && errors.length > 0 && (
          <ErrorSummary errors={errors} showGeneralErrorsOnly={false} className={styles.errors} />
        )}

        <PasswordInput
          label={t('security.oldPassword')}
          name="oldPassword"
          onChangeValue={v => formik.setFieldValue('oldPassword', v)}
          onBlur={formik.handleBlur}
          value={formik.values.oldPassword}
          {...(formik.touched.oldPassword ? { validationMessage: formik.errors.oldPassword } : {})}
        />

        <PasswordInput
          label={t('security.newPassword')}
          name="newPassword"
          onChangeValue={v => formik.setFieldValue('newPassword', v)}
          onBlur={formik.handleBlur}
          value={formik.values.newPassword}
          isForcePasswordVisible={isPasswordVisible}
          onChangePasswordVisible={visible => setIsPasswordVisible(visible)}
          {...(formik.touched.newPassword ? { validationMessage: formik.errors.newPassword } : {})}
        />

        <PasswordInput
          label={t('security.newPasswordConfirm')}
          name="newPasswordConfirm"
          onChangeValue={v => formik.setFieldValue('newPasswordConfirm', v)}
          onBlur={formik.handleBlur}
          isForcePasswordVisible={isPasswordVisible}
          onChangePasswordVisible={visible => setIsPasswordVisible(visible)}
          value={formik.values.newPasswordConfirm}
          {...(formik.touched.newPasswordConfirm
            ? { validationMessage: formik.errors.newPasswordConfirm }
            : {})}
        />

        <SpinnerButton
          color="SECONDARY"
          loading={loading}
          disabled={!formik.isValid}
          type="submit"
          className={styles.button}
        >
          {t('security.button')}
        </SpinnerButton>
      </form>
    </DetailsContainer>
  );
};

export default Security;
