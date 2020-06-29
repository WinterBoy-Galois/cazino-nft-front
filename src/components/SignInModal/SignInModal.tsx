import React from 'react';
import Modal from '../Modal';
// import styles from './SignInModal.module.scss';
import { ApolloError } from 'apollo-client';

interface IProps {
  show: boolean;
  loading: boolean;
  error?: ApolloError;
  onClose?: () => void;
}

const SignInModal: React.FC<IProps> = ({ show, onClose }: IProps) => {
  return (
    <Modal show={show} onClose={onClose} title="Sign In">
      SignIn
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
  return <SignInModal show={show} loading={false} error={undefined} onClose={onClose} />;
};

export default SignInModal;
export { SignInModalWithData };
