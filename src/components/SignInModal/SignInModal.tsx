import React, { useState } from 'react';
import * as Yup from 'yup';
import Modal from '../Modal';
import styles from './SignInModal.module.scss';
import signInIllustration from '../../assets/images/auth/sign-in.svg';
import TextInput from '../TextInput';
import PasswordInput from '../PasswordInput';
import { useFormik } from 'formik';
import SecondaryButton from '../SecondaryButton';
import { useMutation } from '@apollo/react-hooks';
import { SIGN_IN } from '../../graphql/mutations';
import { useStateValue } from '../../state';
import { GraphQLError } from 'graphql';
import { GenericError } from '../../models/genericError.model';
import { ValidationSummary } from '..';

interface IProps {
  show: boolean;
  loading: boolean;
  errors?: GraphQLError[] | GenericError[];
  onClose?: () => void;
  onSignIn?: (email: string, password: string) => void;
}

const SignInModal: React.FC<IProps> = ({
  show,
  errors = undefined,
  onClose,
  onSignIn = () => null,
}: IProps) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    isInitialValid: false,
    validationSchema: Yup.object().shape({
      email: Yup.string().required('Please enter your Email.').email('Please enter a valid Email.'),
      password: Yup.string()
        .required('Please enter your password.')
        .min(8, ({ min }) => `Password is too short - length must be at least ${min} characters.`)
        .max(20, ({ max }) => `Password is too long - maximum length is ${max} characters.`)
        .matches(/[A-Z]/, 'Must contain at least one uppercase character.')
        .matches(/[a-z]/, 'Must contain at least one lowercase character.')
        .matches(/[0-9]/, 'Must contain at least one number.')
        .matches(
          /[\^$*.[\]{}()?\-\\"!@#%&/\\,><':;|_~`]/,
          'Your password must contain at least one of the following special characters: ^ $ * . [ ] { } ( ) ? - " ! @ # % & / \\ , > < \' : ; | _ ~ `'
        ),
    }),
    onSubmit: values => {
      onSignIn(values.email, values.password);
    },
  });

  return (
    <Modal show={show} onClose={onClose} title="Sign In">
      <div className="row">
        <div className="col-12 col-md-7">
          <form onSubmit={formik.handleSubmit}>
            {errors && (
              <ValidationSummary
                className={styles.validation}
                message="Your email or password is wrong."
              />
            )}
            <TextInput
              label="email"
              name="email"
              onChangeValue={v => formik.setFieldValue('email', v)}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              {...(formik.touched.email ? { validationMessage: formik.errors.email } : {})}
            />
            <PasswordInput
              label="password"
              name="password"
              onChangeValue={v => formik.setFieldValue('password', v)}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              {...(formik.touched.password ? { validationMessage: formik.errors.password } : {})}
            />
            <SecondaryButton type="submit" {...(formik.isValid ? {} : { disabled: true })}>
              Sign In
            </SecondaryButton>
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

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);
    const { data, errors } = await signIn({ variables: { email, password } });
    setLoading(false);

    if (errors || data.signIn.errors) {
      setErrors(errors ?? data.signIn.errors);
      return;
    }

    dispatch({ type: 'AUTH_SIGN_IN', payload: { ...data.signIn } });
    dispatch({ type: 'MODAL_HIDE' });
  };

  return (
    <SignInModal
      show={show}
      loading={loading}
      errors={errors}
      onClose={onClose}
      onSignIn={handleSignIn}
    />
  );
};

export default SignInModal;
export { SignInModalWithData };
