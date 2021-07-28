import React, { useState, useEffect } from 'react';
import styles from './PasswordResetModal.module.scss';
import Modal, { transitionTimeout } from '../Modal';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '../../graphql/mutations';
import { success } from '../Toast';
import ApplicationError from '../../models/applicationError.model';
import { useTranslation } from 'react-i18next';
import { getFromGraphQLErrors, getFromGenericErrors } from '../../common/util/error.util';
import ErrorSummary from '../ErrorSummary';
import PasswordInput from '../PasswordInput';
import { useFormik } from 'formik';
import { validationSchema } from './lib/validationSchema';
import SpinnerButton from '../SpinnerButton';
import { useQueryParams } from '../../hooks/useQueryParams.hook';
import { useLocation, useNavigate } from '@reach/router';
import { useIsAuthorized } from '../../hooks/useIsAuthorized';
import { loginAction, resetPasswordAction } from '../../user/user.actions';
import { useUserState } from '../../user/UserProvider';

interface IProps {
  show: boolean;
  loading: boolean;
  errors?: ApplicationError[];
  onClose?: () => void;
  onPasswordReset?: (newPassword: string) => void;
}

const PasswordResetModal: React.FC<IProps> = ({
  show,
  loading,
  errors,
  onClose,
  onPasswordReset = () => null,
}) => {
  const { t } = useTranslation(['auth']);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validateOnMount: true,
    validationSchema: validationSchema(t),
    onSubmit: async values => {
      onPasswordReset(values.password);
    },
  });

  const handleClose = () => {
    setTimeout(() => {
      formik.resetForm({});
      formik.validateForm();
    }, transitionTimeout);

    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal show={show} onClose={handleClose} title={t('passwordReset.headline')}>
      <div className="row">
        <div className={`col-12 col-md-8 ${styles.container}`}>
          {errors && (
            <ErrorSummary errors={errors} showGeneralErrorsOnly={false} className={styles.error} />
          )}

          <form onSubmit={formik.handleSubmit}>
            <PasswordInput
              label={t('labels.password')}
              name="password"
              onChangeValue={v => formik.setFieldValue('password', v)}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              {...(formik.touched.password ? { validationMessage: formik.errors.password } : {})}
            />

            <PasswordInput
              label={t('labels.confirmPassword')}
              name="confirmPassword"
              onChangeValue={v => formik.setFieldValue('confirmPassword', v)}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              {...(formik.touched.confirmPassword
                ? { validationMessage: formik.errors.confirmPassword }
                : {})}
            />

            <SpinnerButton
              type="submit"
              color="SECONDARY"
              loading={loading}
              className={styles.button}
            >
              {t('passwordReset.button')}
            </SpinnerButton>
          </form>
        </div>
      </div>
    </Modal>
  );
};

interface IWithDataProps {
  show: boolean;
  onClose?: () => void;
}

const PasswordResetModalWithData: React.FC<IWithDataProps> = ({
  show,
  onClose,
}: IWithDataProps) => {
  const { t } = useTranslation(['auth', 'common']);
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);
  const params = useQueryParams();
  const [errors, setErrors] = useState<ApplicationError[]>();
  const isAuthorized = useIsAuthorized();
  const [{ passwordResetToken }, userDispatch] = useUserState();

  const location = useLocation();
  const navigate = useNavigate();

  const closeModal = () => {
    navigate(location.pathname, { replace: true }).then();
  };

  const onPasswordReset = async (newPassword: string) => {
    const { data, errors: resetPasswordErrors } = await resetPassword({
      variables: { token: passwordResetToken, newPassword },
    });

    if (resetPasswordErrors) {
      return setErrors(getFromGraphQLErrors(resetPasswordErrors, t));
    } else if (data?.resetPassword?.errors) {
      return setErrors(getFromGenericErrors(data.resetPassword.errors, t));
    }

    userDispatch(loginAction(data.resetPassword));

    closeModal();
    success(t('passwordReset.success'));
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }

    setErrors([]);
  };

  useEffect(() => {
    if (params?.token) {
      userDispatch(resetPasswordAction(params.token));
    }
  }, [params, userDispatch]);

  if (show && (isAuthorized || !params?.token)) {
    closeModal();
    return null;
  }

  return (
    <PasswordResetModal
      show={show}
      loading={loading}
      errors={errors}
      onClose={handleClose}
      onPasswordReset={onPasswordReset}
    />
  );
};

export default PasswordResetModal;
export { PasswordResetModalWithData };
