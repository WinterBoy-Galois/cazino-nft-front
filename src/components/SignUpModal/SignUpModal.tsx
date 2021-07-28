import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useTranslation } from 'react-i18next';
import Modal, { transitionTimeout } from '../Modal';
import { useStateValue } from '../../state';
import { SIGN_UP } from '../../graphql/mutations';
import TextInput from '../TextInput';
import PasswordInput from '../PasswordInput';
import signUpIllustration from '../../assets/images/auth/sign-up.svg';
import Uppercase from '../Uppercase';
import Link from '../Link';
import SpinnerButton from '../SpinnerButton';
import CheckboxInput from '../CheckboxInput';
import ErrorSummary from '../ErrorSummary';
import { validationSchema } from './lib/validationSchema';
import ApplicationError from '../../models/applicationError.model';
import styles from './SignUpModal.module.scss';
import { getFromGraphQLErrors, getFromGenericErrors } from '../../common/util/error.util';
import { useLocation, useNavigate } from '@reach/router';
import { registerAction } from '../../user/user.actions';
import { useUserState } from '../../user/UserProvider';

interface IProps {
  show: boolean;
  loading: boolean;
  errors?: ApplicationError[];
  onClose?: () => void;
  onSignUp?: (email: string, password: string, username: string, token: string) => void;
  onNavigateToSignIn?: () => void;
}

const SignUpModal: React.FC<IProps> = ({
  show,
  onClose,
  onSignUp = () => null,
  onNavigateToSignIn,
  loading,
  errors,
}: IProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { t } = useTranslation(['auth', 'common']);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      terms: false,
    },
    validateOnMount: true,
    validationSchema: validationSchema(t),
    onSubmit: async values => {
      let token = '';

      if (executeRecaptcha) {
        token = await executeRecaptcha();
      }

      onSignUp(values.email, values.password, values.username, token);
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

  const handleNavigateToSignIn = () => {
    handleClose();

    if (onNavigateToSignIn) {
      onNavigateToSignIn();
    }
  };

  return (
    <Modal show={show} onClose={handleClose} title={t('signUp.headline')}>
      {show && (
        <Helmet>
          <body data-recaptcha="true" />
        </Helmet>
      )}
      <div className="row">
        <div className="col-12 col-md-7">
          {errors && (
            <ErrorSummary
              className={styles.spacing__bottom}
              errors={errors}
              showGeneralErrorsOnly={false}
            />
          )}

          <form onSubmit={formik.handleSubmit}>
            <TextInput
              label={t('labels.username')}
              name="username"
              onChangeValue={v => formik.setFieldValue('username', v)}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              {...(formik.touched.username ? { validationMessage: formik.errors.username } : {})}
            />

            <PasswordInput
              label={t('labels.password')}
              name="password"
              isForcePasswordVisible={isPasswordVisible}
              onChangeValue={v => formik.setFieldValue('password', v)}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              onChangePasswordVisible={visible => setIsPasswordVisible(visible)}
              {...(formik.touched.password ? { validationMessage: formik.errors.password } : {})}
            />

            <PasswordInput
              label={t('labels.confirmPassword')}
              name="confirmPassword"
              isForcePasswordVisible={isPasswordVisible}
              onChangeValue={v => formik.setFieldValue('confirmPassword', v)}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              onChangePasswordVisible={visible => setIsPasswordVisible(visible)}
              {...(formik.touched.confirmPassword
                ? { validationMessage: formik.errors.confirmPassword }
                : {})}
            />

            <TextInput
              label={t('labels.email')}
              name="email"
              onChangeValue={v => formik.setFieldValue('email', v)}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              {...(formik.touched.email ? { validationMessage: formik.errors.email } : {})}
            />

            <div className={styles.spacing__bottom}>
              <CheckboxInput
                name="terms"
                className={styles.terms__cbx}
                value={formik.values.terms}
                onChangeValue={v => formik.setFieldValue('terms', v)}
                onBlur={formik.handleBlur}
                {...(formik.touched.terms ? { validationMessage: formik.errors.terms } : {})}
                label={t('signUp.buttons.termsText')}
              />
            </div>

            <SpinnerButton
              color={'SECONDARY'}
              type="submit"
              {...(formik.isValid ? {} : { disabled: true })}
              className={styles.button}
              loading={loading}
              loadingText={t('signUp.buttons.loading')}
            >
              {t('signUp.buttons.signUp')}
            </SpinnerButton>

            <Uppercase>
              <span>{t('signUp.buttons.goToSignInText')}</span>
              &nbsp;
              <Link onClick={handleNavigateToSignIn}>{t('signUp.buttons.goToSignIn')}</Link>
            </Uppercase>
          </form>
        </div>
        <div className={`col-12 col-md-5 ${styles.illustration}`}>
          <img
            src={signUpIllustration}
            alt={t('signUpCharacter')}
            className={styles.illustration__image}
          />
        </div>
      </div>
    </Modal>
  );
};

interface IWithDataProps {
  show: boolean;
  onClose?: () => void;
}

const SignUpModalWithData: React.FC<IWithDataProps> = ({ show, onClose }: IWithDataProps) => {
  const { t } = useTranslation(['auth', 'common']);
  const [signUp, { loading }] = useMutation(SIGN_UP);
  const [{ referral }] = useStateValue();
  const [, userDispatch] = useUserState();
  const [errors, setErrors] = useState<ApplicationError[]>();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignUp = async (email: string, password: string, username: string, token: string) => {
    setErrors([]);
    const { data, errors } = await signUp({
      variables: { email, password, username, token, ref: referral.id },
    });

    if (errors) {
      setErrors(getFromGraphQLErrors(errors, t));
      return;
    } else if (data?.registerUser?.errors) {
      setErrors(getFromGenericErrors(data.registerUser.errors, t));
      return;
    }

    userDispatch(registerAction(data.registerUser));

    navigate(`${location.pathname}?dialog=activation`);
  };

  const handleNavigateToSignIn = () => navigate(`${location.pathname}?dialog=sign-in`);

  const handleClose = () => {
    setTimeout(() => setErrors([]), transitionTimeout);

    if (onClose) {
      onClose();
    }
  };

  return (
    <SignUpModal
      show={show}
      loading={loading}
      errors={errors}
      onClose={handleClose}
      onSignUp={handleSignUp}
      onNavigateToSignIn={handleNavigateToSignIn}
    />
  );
};

export default SignUpModal;
export { SignUpModalWithData };
