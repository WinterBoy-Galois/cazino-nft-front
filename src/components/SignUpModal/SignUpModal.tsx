import React, { useState } from 'react';
import Modal, { replaceModal } from '../Modal';
import styles from './SignUpModal.module.scss';
import { GenericError } from '../../models/genericError.model';
import { GraphQLError } from 'graphql';
import { useMutation } from '@apollo/react-hooks';
import { useStateValue } from '../../state';
import { SIGN_UP } from '../../graphql/mutations';
import TextInput from '../TextInput';
import PasswordInput from '../PasswordInput';
import { useFormik } from 'formik';
import signUpIllustration from '../../assets/images/auth/sign-up.svg';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Uppercase from '../Uppercase';
import Link from '../Link';
import SpinnerButton from '../SpinnerButton';
import CheckboxInput from '../CheckboxInput';
import ErrorSummary from '../ErrorSummary';
import { validationSchema } from './lib/validationSchema';

interface IProps {
  show: boolean;
  loading: boolean;
  errors?: GraphQLError[] | GenericError[];
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
    validationSchema,
    onSubmit: async values => {
      let token = '';

      if (executeRecaptcha) {
        token = await executeRecaptcha();
      }

      onSignUp(values.email, values.password, values.username, token);
    },
  });

  return (
    <Modal show={show} onClose={onClose} title="Sign Up">
      <div className="row">
        <div className="col-12 col-md-7">
          {errors && (
            <ErrorSummary
              className={styles.spacing__bottom}
              message="Could not sign you up, please try again."
            />
          )}

          <form onSubmit={formik.handleSubmit}>
            <TextInput
              label="username"
              name="username"
              onChangeValue={v => formik.setFieldValue('username', v)}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              {...(formik.touched.username ? { validationMessage: formik.errors.username } : {})}
            />

            <PasswordInput
              label="password"
              name="password"
              onChangeValue={v => formik.setFieldValue('password', v)}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              {...(formik.touched.password ? { validationMessage: formik.errors.password } : {})}
            />

            <PasswordInput
              label="confirm password"
              name="confirmPassword"
              onChangeValue={v => formik.setFieldValue('confirmPassword', v)}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              {...(formik.touched.confirmPassword
                ? { validationMessage: formik.errors.confirmPassword }
                : {})}
            />

            <TextInput
              label="email"
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
                {...(formik.touched.terms ? { validationMessage: formik.errors.terms } : {})}
                label={
                  'I agree to the collection of information in cookies, I agree with Privacy Policy and with Terms of Use, Gambling isn’t forbidden by my local authorities and I’m at least 18 years old.'
                }
              />
            </div>

            <SpinnerButton
              color={'SECONDARY'}
              type="submit"
              {...(formik.isValid ? {} : { disabled: true })}
              className={styles.button}
              loading={loading}
            >
              Create account
            </SpinnerButton>

            <Uppercase>
              <span>already have an account?</span>
              &nbsp;
              <Link onClick={onNavigateToSignIn}>sign in now!</Link>
            </Uppercase>
          </form>
        </div>
        <div className={`col-12 col-md-5 ${styles.illustration}`}>
          <img
            src={signUpIllustration}
            alt="Sign Up Character"
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
  const [signUp] = useMutation(SIGN_UP);
  const [, dispatch] = useStateValue();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<GraphQLError[]>();

  const handleSignUp = async (email: string, password: string, username: string, token: string) => {
    setLoading(true);
    const { data, errors } = await signUp({ variables: { email, password, username, token } });
    setLoading(false);

    if (errors || data.registerUser.errors) {
      setErrors(errors ?? data.registerUser.errors);
      return;
    }

    dispatch({ type: 'AUTH_SIGN_UP', payload: { ...data.registerUser } });
    dispatch({ type: 'MODAL_HIDE' });
  };

  const handleNavigateToSignIn = () => replaceModal(dispatch, 'SIGN_IN_MODAL');

  return (
    <SignUpModal
      show={show}
      loading={loading}
      errors={errors}
      onClose={onClose}
      onSignUp={handleSignUp}
      onNavigateToSignIn={handleNavigateToSignIn}
    />
  );
};

export default SignUpModal;
export { SignUpModalWithData };
