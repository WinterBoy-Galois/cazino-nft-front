import React, { useState } from 'react';
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
import { setAccessToken } from '../../common/util/storage.util';

interface IProps {
  show: boolean;
  loading: boolean;
  errors?: GraphQLError[];
  onClose?: () => void;
  onSignIn?: (email: string, password: string) => void;
}

const SignInModal: React.FC<IProps> = ({ show, onClose, onSignIn = () => null }: IProps) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      onSignIn(values.email, values.password);
    },
  });

  return (
    <Modal show={show} onClose={onClose} title="Sign In">
      <div className="row">
        <div className="col-12 col-md-7">
          <form onSubmit={formik.handleSubmit}>
            <TextInput
              label="email"
              name="email"
              onChangeValue={v => formik.setFieldValue('email', v)}
              value={formik.values.email}
            />
            <PasswordInput
              label="password"
              name="password"
              onChangeValue={v => formik.setFieldValue('password', v)}
              value={formik.values.password}
            />
            <SecondaryButton type="submit">Sign In</SecondaryButton>
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

    if (errors) {
      setErrors(errors);
      return;
    }

    dispatch({ type: 'SIGN_IN', payload: { data: data.signIn } });
    setAccessToken(data.signIn.accessToken);
    dispatch({ type: 'HIDE_MODAL' });
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
