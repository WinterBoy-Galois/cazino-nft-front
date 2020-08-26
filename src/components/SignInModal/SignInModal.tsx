import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';

import Modal, { transitionTimeout } from '../Modal';
import styles from './SignInModal.module.scss';
import signInIllustration from '../../assets/images/auth/sign-in.svg';
import TextInput from '../TextInput';
import PasswordInput from '../PasswordInput';
import { SIGN_IN } from '../../graphql/mutations';
import { useStateValue } from '../../state';
import { ErrorSummary, CheckboxInput } from '..';
import Uppercase from '../Uppercase';
import Link from '../Link';
import SpinnerButton from '../SpinnerButton';
import ApplicationError from '../../models/applicationError.model';
import { getFromGraphQLErrors, getFromGenericErrors } from '../../common/util/error.util';
import { validationSchema } from './lib/validationSchema';
import { useLocation, useNavigate } from '@reach/router';

interface IProps {
  show: boolean;
  loading: boolean;
  errors?: ApplicationError[];
  onClose?: () => void;
  onSignIn?: (email: string, password: string, remember: boolean) => void;
  onNavigateToSignUp?: () => void;
  onNavigateToForgotPassword?: () => void;
}

const SignInModal: React.FC<IProps> = ({
  show,
  errors = undefined,
  onClose,
  onSignIn = () => null,
  onNavigateToSignUp,
  onNavigateToForgotPassword,
  loading,
}: IProps) => {
  const { t } = useTranslation(['auth', 'common']);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validateOnMount: true,
    validationSchema: validationSchema(t),
    onSubmit: values => {
      onSignIn(values.email, values.password, values.remember);
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

  const handleNavigateToSignUp = () => {
    handleClose();

    if (onNavigateToSignUp) {
      onNavigateToSignUp();
    }
  };

  return (
    <Modal show={show} onClose={handleClose} title={t('signIn.headline')}>
      <div className="row">
        <div className="col-12 col-md-7">
          <form onSubmit={formik.handleSubmit}>
            {errors && errors.length > 0 && (
              <ErrorSummary
                className={styles.spacing__bottom}
                errors={errors}
                showGeneralErrorsOnly={false}
              />
            )}
            <TextInput
              label={t('labels.email')}
              name="email"
              onChangeValue={v => formik.setFieldValue('email', v)}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              {...(formik.touched.email ? { validationMessage: formik.errors.email } : {})}
            />
            <PasswordInput
              label={t('labels.password')}
              name="password"
              onChangeValue={v => formik.setFieldValue('password', v)}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              {...(formik.touched.password ? { validationMessage: formik.errors.password } : {})}
            />

            <div className={`${styles['remember-me']} ${styles.spacing__bottom}`}>
              <CheckboxInput
                label={t('signIn.buttons.rememberMe')}
                onChangeValue={v => formik.setFieldValue('remember', v)}
              />
              <Uppercase className={styles['forgot-password']}>
                <Link onClick={onNavigateToForgotPassword}>
                  {t('signIn.buttons.goToForgotPassword')}
                </Link>
              </Uppercase>
            </div>

            <SpinnerButton
              color="SECONDARY"
              type="submit"
              {...(formik.isValid ? {} : { disabled: true })}
              className={styles.spacing__bottom}
              loading={loading}
              loadingText={t('signIn.buttons.loading')}
            >
              {t('signIn.buttons.signIn')}
            </SpinnerButton>

            <Uppercase>
              <span>{t('signIn.buttons.goToSignUpText')}</span>
              &nbsp;
              <Link onClick={handleNavigateToSignUp}>{t('signIn.buttons.goToSignUp')}</Link>
            </Uppercase>
          </form>
        </div>
        <div className={`col-12 col-md-5 ${styles.illustration}`}>
          <img src={signInIllustration} alt="Sign In Character" />
        </div>
      </div>
    </Modal>
  );
};

interface IWithDataProps {
  show: boolean;
  userId: string;
  onClose?: () => void;
  onBack?: () => void;
}

const SignInModalWithData: React.FC<IWithDataProps> = ({ show, onClose }: IWithDataProps) => {
  const { t } = useTranslation(['auth', 'common']);
  const [signIn, { loading }] = useMutation(SIGN_IN);
  const [{ auth }, dispatch] = useStateValue();
  const [errors, setErrors] = useState<ApplicationError[]>();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignIn = async (email: string, password: string, remember: boolean) => {
    setErrors([]);
    const { data, errors } = await signIn({ variables: { email, password, remember } });

    if (errors) {
      setErrors(getFromGraphQLErrors(errors, t));
      return;
    } else if (data?.signIn?.errors) {
      setErrors(getFromGenericErrors(data.signIn.errors, t));
      return;
    }

    dispatch({ type: 'AUTH_SIGN_IN', payload: { ...data.signIn, remember } });

    navigate(location.pathname);
  };

  const handleNavigateToSignUp = () => navigate(`${location.pathname}?dialog=sign-up`);

  const handleNavigateToForgotPassword = () =>
    navigate(`${location.pathname}?dialog=password-recovery`);

  const handleClose = () => {
    setTimeout(() => setErrors([]), transitionTimeout);
    onClose && onClose();
  };

  if (show && auth.state === 'SIGNED_IN') {
    navigate(location.pathname);
    return null;
  }

  return (
    <SignInModal
      show={show}
      loading={loading}
      errors={errors}
      onClose={handleClose}
      onSignIn={handleSignIn}
      onNavigateToSignUp={handleNavigateToSignUp}
      onNavigateToForgotPassword={handleNavigateToForgotPassword}
    />
  );
};

export default SignInModal;
export { SignInModalWithData };
