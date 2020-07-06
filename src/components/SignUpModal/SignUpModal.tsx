import React, { useState } from 'react';
import Modal from '../Modal';
import styles from './SignUpModal.module.scss';
import { GenericError } from '../../models/genericError.model';
import { GraphQLError } from 'graphql';
import { useMutation } from '@apollo/react-hooks';
import { useStateValue } from '../../state';
import { SIGN_UP } from '../../graphql/mutations';

interface IProps {
  show: boolean;
  loading: boolean;
  errors?: GraphQLError[] | GenericError[];
  onClose?: () => void;
  onSignUp?: (email: string, password: string, username: string, token: string) => void;
}

const SignUpModal: React.FC<IProps> = ({ show, onClose, onSignUp = () => null }: IProps) => {
  return (
    <Modal show={show} onClose={onClose} title="Sign Up">
      <div className="row">
        <div className="col-12 col-md-7">Hi</div>
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

    if (errors || data.signIn.errors) {
      setErrors(errors ?? data.signIn.errors);
      return;
    }

    dispatch({ type: 'AUTH_SIGN_UP', payload: { ...data.signIn } });
    dispatch({ type: 'MODAL_HIDE' });
  };

  return (
    <SignUpModal
      show={show}
      loading={loading}
      errors={errors}
      onClose={onClose}
      onSignUp={handleSignUp}
    />
  );
};

export default SignUpModal;
export { SignUpModalWithData };
