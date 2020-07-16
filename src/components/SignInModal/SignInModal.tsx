import React, { useState } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/react-hooks';

import Modal, { replaceModal, transitionTimeout } from '../Modal';
import styles from './SignInModal.module.scss';
import signInIllustration from '../../assets/images/auth/sign-in.svg';
import TextInput from '../TextInput';
import PasswordInput from '../PasswordInput';
import { SIGN_IN } from '../../graphql/mutations';
import { useStateValue } from '../../state';
import { GraphQLError } from 'graphql';
import { GenericError } from '../../models/genericError.model';
import { ErrorSummary, CheckboxInput } from '..';
import Uppercase from '../Uppercase';
import Link from '../Link';
import SpinnerButton from '../SpinnerButton';

interface IProps {
  show: boolean;
  loading: boolean;
  errors?: GraphQLError[] | GenericError[];
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
  const { t } = useTranslation(['auth']);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required(t('validation.email.required'))
        .email(t('validation.email.valid')),
      password: Yup.string().required(t('validation.password.required')),
    }),
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
            {errors && (
              <ErrorSummary
                className={styles.spacing__bottom}
                message="Your email or password is wrong."
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
              <Uppercase>
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
  const [signIn] = useMutation(SIGN_IN);
  const [, dispatch] = useStateValue();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<GraphQLError[]>();

  const handleSignIn = async (email: string, password: string, remember: boolean) => {
    setLoading(true);
    const { data, errors } = await signIn({ variables: { email, password, remember } });
    setLoading(false);

    if (errors || data.signIn.errors) {
      setErrors(errors ?? data.signIn.errors);
      return;
    }

    dispatch({ type: 'AUTH_SIGN_IN', payload: { ...data.signIn } });
    dispatch({ type: 'MODAL_HIDE' });
  };

  const handleNavigateToSignUp = () => replaceModal(dispatch, 'SIGN_UP_MODAL');

  const handleNavigateToForgotPassword = () => null;

  return (
    <SignInModal
      show={show}
      loading={loading}
      errors={errors}
      onClose={onClose}
      onSignIn={handleSignIn}
      onNavigateToSignUp={handleNavigateToSignUp}
      onNavigateToForgotPassword={handleNavigateToForgotPassword}
    />
  );
};

export default SignInModal;
export { SignInModalWithData };
