import React from 'react';
import styles from './AccountActivationModal.module.scss';
import { GraphQLError } from 'graphql';
import Modal from '../Modal';
import CodeInput from '../CodeInput';

interface IProps {
  show: boolean;
  loading: boolean;
  error?: GraphQLError;
  onClose?: () => void;
}

const AccountActivationModal: React.SFC<IProps> = ({ show, onClose }) => {
  return (
    <Modal show={show} onClose={onClose} title="ACTIVATE ACCOUNT">
      <h1 className={styles.headline}>Your account successfully created</h1>

      <p>
        We’ve sent activation code to your e-mail. Please enter 6 digit number below to activate
        your account.
      </p>

      <div className={styles['code-input']}>
        <CodeInput />
      </div>
    </Modal>
  );
};

interface IWithDataProps {
  show: boolean;
  userId: string;
  onClose?: () => void;
}

const AccountActivationModalWithData: React.FC<IWithDataProps> = ({
  show,
  onClose,
}: IWithDataProps) => {
  return (
    <AccountActivationModal
      show={show}
      loading={false}
      // error={error}
      onClose={onClose}
    />
  );
};

export default AccountActivationModal;
export { AccountActivationModalWithData };
