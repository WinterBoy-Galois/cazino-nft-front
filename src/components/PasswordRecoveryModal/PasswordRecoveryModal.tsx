import React, { useState } from 'react';
import styles from './PasswordRecoveryModal.module.scss';
import Modal, { transitionTimeout } from '../Modal';
import { useMutation } from '@apollo/client';
import { RECOVER_PASSWORD } from '../../graphql/mutations';
import { info } from '../Toast';
import ApplicationError from '../../models/applicationError.model';
import { useTranslation } from 'react-i18next';
import { getFromGraphQLErrors, getFromGenericErrors } from '../../common/util/error.util';
import ErrorSummary from '../ErrorSummary';
import { useFormik } from 'formik';
import SpinnerButton from '../SpinnerButton';
import TextInput from '../TextInput';
import { validationSchema } from './lib/validationSchema';
import passwordRecoveryIllustration from '../../assets/images/auth/password-recovery.svg';
import Uppercase from '../Uppercase';
import Link from '../Link';
import { useLocation, useNavigate } from '@reach/router';
import { useIsAuthorized } from '../../hooks/useIsAuthorized';

interface IProps {
  show: boolean;
  loading: boolean;
  errors?: ApplicationError[];
  onClose?: () => void;
  onPasswordRecovery?: (email: string) => void;
  onNavigateToSignIn?: () => void;
  onNavigateToSignUp?: () => void;
}

const PasswordRecoveryModal: React.FC<IProps> = ({
  show,
  loading,
  errors,
  onClose,
  onPasswordRecovery = () => null,
  onNavigateToSignIn,
  onNavigateToSignUp,
}) => {
  const { t } = useTranslation(['auth']);

  const formik = useFormik({
    initialValues: { email: '' },
    validateOnMount: true,
    validationSchema: validationSchema(t),
    onSubmit: async values => {
      onPasswordRecovery(values.email);
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
    <Modal show={show} onClose={handleClose} title={t('passwordRecovery.headline')}>
      <div className="row">
        <div className={`col-12 col-md-7 ${styles.container}`}>
          <div>
            {errors && (
              <ErrorSummary
                errors={errors}
                showGeneralErrorsOnly={false}
                className={styles.error}
              />
            )}

            <form onSubmit={formik.handleSubmit}>
              <TextInput
                label={t('labels.email')}
                name="email"
                onChangeValue={v => formik.setFieldValue('email', v)}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                {...(formik.touched.email ? { validationMessage: formik.errors.email } : {})}
              />

              <SpinnerButton
                type="submit"
                color="SECONDARY"
                loading={loading}
                className={styles.button}
              >
                {t('passwordRecovery.button')}
              </SpinnerButton>
            </form>
          </div>

          <div>
            <Uppercase className={styles.spacing}>
              {t('passwordRecovery.goToSignInText')}&nbsp;
              <Link onClick={onNavigateToSignIn}>{t('passwordRecovery.goToSignIn')}</Link>
            </Uppercase>
            <Uppercase>
              {t('passwordRecovery.goToSignUpText')}&nbsp;
              <Link onClick={onNavigateToSignUp}>{t('passwordRecovery.goToSignUp')}</Link>
            </Uppercase>
          </div>
        </div>
        <div className={`col-12 col-md-5 ${styles.illustration}`}>
          <img src={passwordRecoveryIllustration} alt={t('accountActivation.signInCharacter')} />
        </div>
      </div>
    </Modal>
  );
};

interface IWithDataProps {
  show: boolean;
  onClose?: () => void;
}

const PasswordRecoveryModalWithData: React.FC<IWithDataProps> = ({
  show,
  onClose,
}: IWithDataProps) => {
  const isAuthorized = useIsAuthorized();
  const { t } = useTranslation(['auth', 'common']);
  const [recoverPassword, { loading }] = useMutation(RECOVER_PASSWORD);
  const [errors, setErrors] = useState<ApplicationError[]>();
  const location = useLocation();
  const navigate = useNavigate();

  const handlePasswordRecovery = async (email: string) => {
    const { data, errors: recoveryPasswordErrors } = await recoverPassword({
      variables: { email },
    });

    if (recoveryPasswordErrors) {
      return setErrors(getFromGraphQLErrors(recoveryPasswordErrors, t));
    } else if (data?.forgotPassword?.errors) {
      return setErrors(getFromGenericErrors(data.forgotPassword.errors, t));
    }

    navigate(location.pathname);
    info(t('passwordRecovery.success'));
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }

    setErrors([]);
  };

  const handleNavigateToSignIn = () => navigate(`${location.pathname}?dialog=sign-in`);
  const handleNavigateToSignUp = () => navigate(`${location.pathname}?dialog=sign-up`);

  if (show && isAuthorized) {
    navigate(location.pathname);
    return null;
  }

  return (
    <PasswordRecoveryModal
      show={show}
      loading={loading}
      errors={errors}
      onClose={handleClose}
      onPasswordRecovery={handlePasswordRecovery}
      onNavigateToSignIn={handleNavigateToSignIn}
      onNavigateToSignUp={handleNavigateToSignUp}
    />
  );
};

export default PasswordRecoveryModal;
export { PasswordRecoveryModalWithData };
